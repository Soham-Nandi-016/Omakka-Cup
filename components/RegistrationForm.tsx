"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User, MapPin, Phone, Mail, Calendar, Scale, Award, BookOpen, Loader2,
  CheckCircle2, AlertCircle, ChevronDown
} from "lucide-react";
import TooltipField from "@/components/TooltipField";

export interface SubmitResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
import { INDIAN_STATES, BELT_OPTIONS, KARATE_STYLES, DECLARATION_TEXT } from "@/lib/constants";

const schema = z.object({
  name:           z.string().min(2, "Full name must be at least 2 characters"),
  address:        z.string().min(10, "Please enter a complete address"),
  phone:          z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email:          z.string().email("Enter a valid email"),
  gender:         z.enum(["MALE", "FEMALE"], { errorMap: () => ({ message: "Please select gender" }) }),
  dob:            z.string().min(1, "Date of birth is required"),
  state:          z.string().min(1, "Select a state"),
  belt:           z.enum(["WHITE", "YELLOW", "ORANGE", "GREEN", "BLUE", "PURPLE", "BROWN", "BLACK"], {
    errorMap: () => ({ message: "Select a belt rank" }),
  }),
  style:          z.string().min(1, "Select a karate style"),
  instructorName: z.string().min(2, "Instructor name is required"),
  weight:         z.string().min(1, "Weight is required").refine((v) => {
    const n = parseFloat(v);
    return !isNaN(n) && n >= 10 && n <= 200;
  }, "Enter a valid weight between 10 – 200 kg"),
  declarationAccepted: z.boolean().refine((v) => v === true, "You must accept the declaration"),
});

type FormValues = z.infer<typeof schema>;

function computeAge(dob: string): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age >= 0 ? age : null;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="form-error">
      <AlertCircle className="w-3 h-3" />
      {msg}
    </p>
  );
}

// ─── Types for history ─────────────────────────────────────────────────────
interface HistoryEntry {
  id: string;          // timestamp-based unique id
  submittedAt: string; // ISO string
  name: string;
  dob: string;
  age: number | null;
  weight: string;
  belt: string;
  categories: string[];
}

const LS_KEY = "omakka_registration_history";

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]") as HistoryEntry[];
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(entries));
}

export default function RegistrationForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // History accordion state — success view
  const [historyOpen, setHistoryOpen] = useState(false);
  // History accordion state — main form view (separate toggle)
  const [historyOpenForm, setHistoryOpenForm] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Load history from localStorage on mount (client-only)
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { declarationAccepted: false },
  });

  const declarationChecked = watch("declarationAccepted");
  const dobValue = watch("dob");

  // Auto-compute age when DOB changes
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const computed = computeAge(e.target.value);
    setAge(computed);
  };

  const onSubmit = async (values: FormValues) => {
    setResult(null);
    setIsPending(true);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setResult(data);
      if (data.success) {
        // ── Persist this registration to localStorage ──────────────────────
        const computedAge = computeAge(values.dob);
        const newEntry: HistoryEntry = {
          id: Date.now().toString(),
          submittedAt: new Date().toISOString(),
          name: values.name,
          dob: values.dob,
          age: computedAge,
          weight: values.weight,
          belt: values.belt,
          categories: ["Kata", "Kumite"],
        };
        const updated = [...loadHistory(), newEntry];
        saveHistory(updated);
        setHistory(updated);
        // ─────────────────────────────────────────────────────────────────
        reset();
        setAge(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
        router.refresh();
      }
    } catch (err) {
      setResult({
        success: false,
        message: "Failed to connect to the server. Ensure the backend is running.",
      });
    } finally {
      setIsPending(false);
    }
  };

  // ── Belt display labels (shared by both success view and form-page accordion) ──
  const BELT_LABEL: Record<string, string> = {
    WHITE: "White Belt", YELLOW: "Yellow Belt", ORANGE: "Orange Belt",
    GREEN: "Green Belt", BLUE: "Blue Belt", PURPLE: "Purple Belt",
    BROWN: "Brown Belt", BLACK: "Black Belt",
  };

  if (result?.success) {

    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50
                        flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-3xl font-black text-white">Registration Confirmed!</h2>
        <p className="text-white/60 max-w-md leading-relaxed">{result.message}</p>

        {/* ─ Event Details Card (unchanged dimensions) ─ */}
        <div className="card p-5 text-sm text-white/50 space-y-1 max-w-sm">
          <p>📍 Samrat Ashok Buddha Vihar AC Hall, Mira Road (E)</p>
          <p>🗓️ Sunday, 2nd August 2026</p>
          <p>⏰ Reporting Time: 8:30 AM Sharp</p>
          <p>💰 Entry Fee: ₹1,800 (already noted)</p>
          {/* ── Payment Note ── */}
          <p className="mt-2 pt-2 border-t border-white/10 text-brand-gold font-semibold text-xs leading-snug">
            📌 Note: Fees must be paid directly to your respective club coaches.
          </p>
        </div>

        <button onClick={() => setResult(null)} className="btn-outline">
          Register Another Participant
        </button>

        {/* ─ Registration History Accordion ─ */}
        {history.length > 0 && (
          <div className="w-full max-w-2xl">
            {/* Toggle button */}
            <button
              id="view-history-toggle"
              onClick={() => setHistoryOpen((o) => !o)}
              className="w-full flex items-center justify-between px-5 py-3 rounded-xl
                         bg-white/5 border border-white/10 hover:border-white/20
                         text-white/70 hover:text-white text-sm font-semibold
                         transition-all duration-200"
            >
              <span>🗂️ View Filled Forms History ({history.length})</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  historyOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Collapsible panel */}
            {historyOpen && (
              <div
                id="history-panel"
                className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
              >
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="card p-4 space-y-1.5 text-xs border border-white/10"
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-white text-sm leading-tight">
                        {entry.name}
                      </p>
                      <span className="text-white/30 text-[10px] shrink-0">
                        {new Date(entry.submittedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-white/55 mt-1">
                      <div>
                        <span className="text-white/30 uppercase tracking-wider text-[10px]">DOB</span>
                        <p className="font-medium text-white/70">
                          {new Date(entry.dob).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-white/30 uppercase tracking-wider text-[10px]">Age</span>
                        <p className="font-medium text-white/70">
                          {entry.age !== null ? `${entry.age} yrs` : "—"}
                        </p>
                      </div>
                      <div>
                        <span className="text-white/30 uppercase tracking-wider text-[10px]">Weight</span>
                        <p className="font-medium text-white/70">{entry.weight} kg</p>
                      </div>
                      <div>
                        <span className="text-white/30 uppercase tracking-wider text-[10px]">Belt</span>
                        <p className="font-medium text-white/70">
                          {BELT_LABEL[entry.belt] ?? entry.belt}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-white/30 uppercase tracking-wider text-[10px]">Categories</span>
                        <p className="font-medium text-white/70">{entry.categories.join(" · ")}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (<>
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} noValidate>
      {result && !result.success && (
        <div className="mb-6 p-4 rounded-xl bg-brand-crimson/10 border border-brand-crimson/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-brand-crimson-light flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/80">{result.message}</p>
        </div>
      )}

      <div className="space-y-8">

        {/* ─ Section 1: Personal ─ */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-brand-gold" />
            <h2 className="font-bold text-white">Personal Information</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Enter participant's full name"
                className="form-input"
                {...register("name")}
              />
              <FieldError msg={errors.name?.message} />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="form-label" htmlFor="address">Address *</label>
              <textarea
                id="address"
                rows={2}
                placeholder="Full residential address"
                className="form-input resize-none"
                {...register("address")}
              />
              <FieldError msg={errors.address?.message} />
            </div>

            {/* Phone */}
            <div>
              <label className="form-label" htmlFor="phone">
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Contact Number *</span>
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit mobile number"
                className="form-input"
                {...register("phone")}
              />
              <FieldError msg={errors.phone?.message} />
            </div>

            {/* Email */}
            <div>
              <label className="form-label" htmlFor="email">
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email Address *</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="yourname@example.com"
                className="form-input"
                {...register("email")}
              />
              <FieldError msg={errors.email?.message} />
            </div>
          </div>
        </section>

        {/* ─ Section 2: Bio ─ */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Calendar className="w-4 h-4 text-brand-gold" />
            <h2 className="font-bold text-white">Biographical Details</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Gender */}
            <div className="md:col-span-1">
              <label className="form-label">Gender *</label>
              <div className="flex gap-4 mt-1">
                {[
                  { value: "MALE",   label: "Male" },
                  { value: "FEMALE", label: "Female" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      value={value}
                      className="w-4 h-4 accent-brand-crimson"
                      {...register("gender")}
                    />
                    <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
              <FieldError msg={errors.gender?.message} />
            </div>

            {/* DOB + Age auto-compute */}
            <div className="md:col-span-1">
              <label className="form-label" htmlFor="dob">Date of Birth *</label>
              <input
                id="dob"
                type="date"
                max={new Date().toISOString().split("T")[0]}
                className="form-input"
                {...register("dob", {
                  onChange: handleDobChange,
                })}
              />
              <FieldError msg={errors.dob?.message} />
            </div>

            {/* Auto Age Display */}
            <div className="md:col-span-1">
              <label className="form-label">Age (Auto-computed)</label>
              <div className={`form-input flex items-center justify-center text-center font-black text-2xl
                ${age !== null ? "text-brand-gold border-brand-gold/30" : "text-white/20"}`}>
                {age !== null ? `${age} yrs` : "—"}
              </div>
              {age !== null && (
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Age verified
                </p>
              )}
            </div>

            {/* State */}
            <div className="md:col-span-1">
              <label className="form-label" htmlFor="state">State *</label>
              <div className="relative">
                <select id="state" className="form-input appearance-none pr-10" {...register("state")}>
                  <option value="">Select state…</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
              <FieldError msg={errors.state?.message} />
            </div>
          </div>
        </section>

        {/* ─ Section 3: Karate ─ */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Award className="w-4 h-4 text-brand-gold" />
            <h2 className="font-bold text-white">Karate Details</h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Belt */}
            <TooltipField
              id="belt-field"
              tip="Select your current belt tier (KYU). White is the lowest, Black belt (Dan) is the highest. When in doubt, pick the belt colour you are currently wearing in practice."
            >
              <label className="form-label" htmlFor="belt">Rank (KYU) / Belt *</label>
              <div className="relative">
                <select id="belt" className="form-input appearance-none pr-10" {...register("belt")}>
                  <option value="">Select belt rank…</option>
                  {BELT_OPTIONS.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
              <FieldError msg={errors.belt?.message} />
            </TooltipField>

            {/* Style */}
            <div>
              <label className="form-label" htmlFor="style">
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Karate Style *</span>
              </label>
              <div className="relative">
                <select id="style" className="form-input appearance-none pr-10" {...register("style")}>
                  <option value="">Select style…</option>
                  {KARATE_STYLES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
              <FieldError msg={errors.style?.message} />
            </div>

            {/* Instructor */}
            <div>
              <label className="form-label" htmlFor="instructorName">Instructor Name *</label>
              <input
                id="instructorName"
                type="text"
                placeholder="Full name of your Sensei / Instructor"
                className="form-input"
                {...register("instructorName")}
              />
              <FieldError msg={errors.instructorName?.message} />
            </div>

            {/* Weight */}
            <TooltipField
              id="weight-field"
              tip="Enter your current body weight in kilograms (kg) only. For example, if you weigh 45.5 kg, type 45.5. Do NOT enter pounds or stones."
            >
              <label className="form-label" htmlFor="weight">
                <span className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5" /> Weight (kg) *</span>
              </label>
              <input
                id="weight"
                type="number"
                step="0.1"
                min="10"
                max="200"
                inputMode="decimal"
                placeholder="e.g. 45.5"
                className="form-input"
                {...register("weight")}
              />
              <FieldError msg={errors.weight?.message} />
            </TooltipField>
          </div>

          {/* Events (auto-checked, display only) */}
          <div className="mt-5 grid grid-cols-2 gap-4">
            {["Kata", "Kumite"].map((e) => (
              <div key={e} className="card-gold p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                <div>
                  <div className="font-bold text-white text-sm">{e}</div>
                  <div className="text-xs text-white/40">Compulsory · Auto-enrolled</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─ Declaration ─ */}
        <section>
          <div className="card-crimson p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-brand-crimson-light mb-3">
              Official Declaration Waiver
            </p>
            <div className="max-h-36 overflow-y-auto rounded-lg bg-surface-900 p-4 mb-4
                            scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <p className="text-xs text-white/55 leading-relaxed">{DECLARATION_TEXT}</p>
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-0.5 w-5 h-5 rounded accent-brand-crimson flex-shrink-0"
                {...register("declarationAccepted")}
              />
              <span className="text-sm text-white/70 group-hover:text-white transition-colors leading-relaxed">
                I have read, understood, and agree to the declaration waiver above.
                I confirm all information provided is accurate.
              </span>
            </label>
            <FieldError msg={errors.declarationAccepted?.message} />
          </div>
        </section>

        {/* ─ Submit ─ */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isPending || !declarationChecked}
            id="submit-registration"
            className="btn-crimson w-full sm:w-auto px-12 py-4 text-base
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting…
              </>
            ) : (
              <>Submit Registration</>
            )}
          </button>
          {!declarationChecked && (
            <p className="text-xs text-white/30">Accept the declaration above to enable submission</p>
          )}
        </div>
      </div>
    </form>

    {/* ─ Registration History Accordion (form-page view) ─ */}
    {history.length > 0 && (
      <div className="w-full mt-8">
        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-xs text-white/25 uppercase tracking-widest font-semibold">Previous Submissions</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* Toggle button */}
        <button
          id="view-history-form-toggle"
          type="button"
          onClick={() => setHistoryOpenForm((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-3 rounded-xl
                     bg-white/5 border border-white/10 hover:border-white/20
                     text-white/70 hover:text-white text-sm font-semibold
                     transition-all duration-200"
        >
          <span>🗂️ View Filled Forms History ({history.length})</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              historyOpenForm ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Collapsible panel */}
        {historyOpenForm && (
          <div
            id="history-form-panel"
            className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
          >
            {history.map((entry) => (
              <div
                key={entry.id}
                className="card p-4 space-y-1.5 text-xs border border-white/10"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-white text-sm leading-tight">
                    {entry.name}
                  </p>
                  <span className="text-white/30 text-[10px] shrink-0">
                    {new Date(entry.submittedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-white/55 mt-1">
                  <div>
                    <span className="text-white/30 uppercase tracking-wider text-[10px]">DOB</span>
                    <p className="font-medium text-white/70">
                      {new Date(entry.dob).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/30 uppercase tracking-wider text-[10px]">Age</span>
                    <p className="font-medium text-white/70">
                      {entry.age !== null ? `${entry.age} yrs` : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/30 uppercase tracking-wider text-[10px]">Weight</span>
                    <p className="font-medium text-white/70">{entry.weight} kg</p>
                  </div>
                  <div>
                    <span className="text-white/30 uppercase tracking-wider text-[10px]">Belt</span>
                    <p className="font-medium text-white/70">
                      {BELT_LABEL[entry.belt] ?? entry.belt}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-white/30 uppercase tracking-wider text-[10px]">Categories</span>
                    <p className="font-medium text-white/70">{entry.categories.join(" · ")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}
  </>);
}
