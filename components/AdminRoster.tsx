"use client";

import { useState, useMemo, useCallback } from "react";
import { Download, Search, X, CheckCircle2, Users, Filter, RefreshCw } from "lucide-react";
import type { AdminStudent } from "@/app/admin/actions";

const BELT_LABELS: Record<string, string> = {
  WHITE: "White", YELLOW: "Yellow", ORANGE: "Orange",
  GREEN: "Green", BLUE: "Blue", PURPLE: "Purple", BROWN: "Brown", BLACK: "Black",
};

const BELT_COLORS: Record<string, string> = {
  WHITE:  "bg-white/10 text-white border-white/20",
  YELLOW: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
  ORANGE: "bg-orange-500/15 text-orange-300 border-orange-500/25",
  GREEN:  "bg-green-500/15 text-green-300 border-green-500/25",
  BLUE:   "bg-blue-500/15 text-blue-300 border-blue-500/25",
  PURPLE: "bg-purple-500/15 text-purple-300 border-purple-500/25",
  BROWN:  "bg-amber-700/20 text-amber-400 border-amber-600/30",
  BLACK:  "bg-gray-800 text-gray-200 border-gray-600/40",
};

const AGE_FILTERS = [
  { label: "All Ages", min: 0, max: 999 },
  { label: "U-8",  min: 0,  max: 7 },
  { label: "U-10", min: 8,  max: 9 },
  { label: "U-12", min: 10, max: 11 },
  { label: "U-14", min: 12, max: 13 },
  { label: "U-16", min: 14, max: 15 },
  { label: "U-18", min: 16, max: 17 },
  { label: "18+",  min: 18, max: 999 },
];

const WEIGHT_FILTERS = [
  { label: "All Weights", min: 0,  max: 9999 },
  { label: "-50kg",      min: 0,  max: 49.99 },
  { label: "-55kg",      min: 50, max: 54.99 },
  { label: "-60kg",      min: 55, max: 59.99 },
  { label: "-65kg",      min: 60, max: 64.99 },
  { label: "-70kg",      min: 65, max: 69.99 },
  { label: "-75kg",      min: 70, max: 74.99 },
  { label: "+75kg",      min: 75, max: 9999  },
];

function exportToCSV(data: AdminStudent[]) {
  const headers = [
    "No.", "Name", "DOB", "Age", "Weight (kg)", "Belt",
    "Gender", "Kata", "Kumite", "Instructor", "Style", "State", "Phone", "Email", "Registered At",
  ];
  const rows = data.map((s, i) => [
    i + 1, s.name, s.dob, s.age, s.weight,
    BELT_LABELS[s.belt] ?? s.belt, s.gender,
    s.kata ? "Yes" : "No", s.kumite ? "Yes" : "No",
    s.instructorName, s.style, s.state, s.phone, s.email,
    new Date(s.createdAt).toLocaleString("en-IN"),
  ]);
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `omakka-cup-2026-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

interface Props {
  students: AdminStudent[];
  onRefresh: () => void;
}

export default function AdminRoster({ students, onRefresh }: Props) {
  const [search,        setSearch]        = useState("");
  const [genderFilter,  setGenderFilter]  = useState<"ALL" | "MALE" | "FEMALE">("ALL");
  const [beltFilter,    setBeltFilter]    = useState<string>("ALL");
  const [ageFilter,     setAgeFilter]     = useState<(typeof AGE_FILTERS)[0]>(AGE_FILTERS[0]);
  const [weightFilter,  setWeightFilter]  = useState<(typeof WEIGHT_FILTERS)[0]>(WEIGHT_FILTERS[0]);

  const filtered = useMemo(() => {
    let data = students;
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.instructorName.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.style.toLowerCase().includes(q)
      );
    }
    if (genderFilter !== "ALL") data = data.filter((s) => s.gender === genderFilter);
    if (beltFilter   !== "ALL") data = data.filter((s) => s.belt   === beltFilter);
    if (ageFilter.label !== "All Ages") {
      data = data.filter((s) => s.age >= ageFilter.min && s.age <= ageFilter.max);
    }
    if (weightFilter.label !== "All Weights") {
      data = data.filter((s) => s.weight >= weightFilter.min && s.weight <= weightFilter.max);
    }
    return data;
  }, [students, search, genderFilter, beltFilter, ageFilter, weightFilter]);

  const clearFilters = useCallback(() => {
    setSearch(""); setGenderFilter("ALL"); setBeltFilter("ALL"); setAgeFilter(AGE_FILTERS[0]); setWeightFilter(WEIGHT_FILTERS[0]);
  }, []);

  const hasFilters = search || genderFilter !== "ALL" || beltFilter !== "ALL" || ageFilter.label !== "All Ages" || weightFilter.label !== "All Weights";

  return (
    <div className="space-y-5">

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Registered", value: students.length, color: "text-brand-gold" },
          { label: "Showing",          value: filtered.length, color: "text-white" },
          { label: "Male",             value: students.filter((s) => s.gender === "MALE").length,   color: "text-blue-400" },
          { label: "Female",           value: students.filter((s) => s.gender === "FEMALE").length, color: "text-pink-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card px-4 py-3">
            <div className={`text-2xl font-black ${color}`}>{value}</div>
            <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div className="card p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/40">
          <Filter className="w-3.5 h-3.5" />
          Filters
          {hasFilters && (
            <button onClick={clearFilters} className="ml-auto flex items-center gap-1 text-brand-crimson-light hover:text-brand-crimson transition-colors">
              <X className="w-3 h-3" /> Clear All
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search name, instructor, state, style…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-9"
          />
        </div>

        {/* Filter Chips — Row 1: Gender */}
        <div className="flex flex-wrap gap-2">
          {(["ALL", "MALE", "FEMALE"] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                genderFilter === g
                  ? "bg-brand-crimson border-brand-crimson text-white"
                  : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
              }`}
            >
              {g === "ALL" ? "All Genders" : g === "MALE" ? "♂ Male" : "♀ Female"}
            </button>
          ))}
        </div>

        {/* Filter Chips — Row 2: Age */}
        <div className="flex flex-wrap gap-2">
          {AGE_FILTERS.map((af) => (
            <button
              key={af.label}
              onClick={() => setAgeFilter(af)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                ageFilter.label === af.label
                  ? "bg-brand-gold border-brand-gold text-surface-950"
                  : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
              }`}
            >
              {af.label}
            </button>
          ))}
        </div>

        {/* Filter Chips — Row 3: Belt */}
        <div className="flex flex-wrap gap-2">
          {[{ value: "ALL", label: "All Belts" }, ...Object.entries(BELT_LABELS).map(([v, l]) => ({ value: v, label: l }))].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setBeltFilter(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                beltFilter === value
                  ? value === "ALL"
                    ? "bg-white/20 border-white/40 text-white"
                    : `${BELT_COLORS[value] ?? ""} border-opacity-60`
                  : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filter Chips — Row 4: Weight */}
        <div className="flex flex-wrap gap-2">
          {WEIGHT_FILTERS.map((wf) => (
            <button
              key={wf.label}
              onClick={() => setWeightFilter(wf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                weightFilter.label === wf.label
                  ? "bg-teal-500/30 border-teal-400/60 text-teal-200"
                  : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
              }`}
            >
              {wf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-white/40">
          Showing <span className="text-white font-bold">{filtered.length}</span> of{" "}
          <span className="text-white font-bold">{students.length}</span> registrations
        </p>
        <div className="flex gap-2">
          <button onClick={onRefresh} className="btn-outline text-sm px-4 py-2">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
          <button onClick={() => exportToCSV(filtered)} className="btn-gold text-sm px-4 py-2">
            <Download className="w-4 h-4" />
            Export CSV ({filtered.length})
          </button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card p-16 text-center">
          <Users className="w-10 h-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/40 font-semibold">No registrations match current filters</p>
          <button onClick={clearFilters} className="btn-outline text-sm mt-4 px-4 py-2">Clear Filters</button>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="roster-table min-w-[900px]">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Age</th>
                  <th>Weight</th>
                  <th>Belt</th>
                  <th>Kata</th>
                  <th>Kumite</th>
                  <th>M/F</th>
                  <th>Instructor</th>
                  <th>Style</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id}>
                    <td className="text-white/30 font-mono text-xs">{String(i + 1).padStart(2, "0")}</td>
                    <td className="font-semibold text-white max-w-[140px] truncate" title={s.name}>{s.name}</td>
                    <td className="text-white/60 font-mono text-xs">{s.dob}</td>
                    <td className="font-bold text-brand-gold">{s.age}</td>
                    <td className="font-semibold text-white">{s.weight} kg</td>
                    <td>
                      <span className={`belt-badge border text-xs ${BELT_COLORS[s.belt] ?? "text-white/60 border-white/10"}`}>
                        {BELT_LABELS[s.belt] ?? s.belt}
                      </span>
                    </td>
                    <td><CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" /></td>
                    <td><CheckCircle2 className="w-4 h-4 text-green-400 mx-auto" /></td>
                    <td>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        s.gender === "MALE" ? "bg-blue-500/15 text-blue-300" : "bg-pink-500/15 text-pink-300"
                      }`}>
                        {s.gender === "MALE" ? "M" : "F"}
                      </span>
                    </td>
                    <td className="text-white/70 max-w-[120px] truncate" title={s.instructorName}>{s.instructorName}</td>
                    <td className="text-white/60 text-xs">{s.style}</td>
                    <td className="text-white/50 text-xs max-w-[80px] truncate" title={s.state}>{s.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
