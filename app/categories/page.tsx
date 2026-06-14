import { AGE_CATEGORIES, WEIGHT_CLASSES } from "@/lib/constants";
import { Clock, Scale, Users } from "lucide-react";

export const metadata = {
  title: "Age Categories & Weight Classes",
  description: "Official age categories and weight classes for OMAKKA Cup 2026 Season 3. Under 8 to 18+ open category.",
};

const beltColors: Record<string, string> = {
  "Under 8 Yrs":   "bg-blue-500/10 text-blue-300 border-blue-500/20",
  "Under 10 Yrs":  "bg-green-500/10 text-green-300 border-green-500/20",
  "Under 12 Yrs":  "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  "Under 14 Yrs":  "bg-orange-500/10 text-orange-300 border-orange-500/20",
  "Under 16 Yrs":  "bg-red-500/10 text-red-300 border-red-500/20",
  "Under 18 Yrs":  "bg-purple-500/10 text-purple-300 border-purple-500/20",
  "Above 18+ Yrs": "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
};

export default function CategoriesPage() {
  return (
    <div className="bg-surface-950 min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4">Classification Grid</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Age <span className="text-brand-gold">Categories</span>
          </h1>
          <p className="text-white/50">
            Official age groups and weight classes for Kata &amp; Kumite — Boys and Girls
          </p>
        </div>

        {/* Criteria chips */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="card px-5 py-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-semibold text-white/80">Under 18: 1 min kumite</span>
          </div>
          <div className="card px-5 py-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-crimson-light" />
            <span className="text-sm font-semibold text-white/80">Above 18: 1.5 Mins or TBD on Match Day</span>
          </div>
          <div className="card px-5 py-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white/80">Boys &amp; Girls separate bouts</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="card overflow-hidden hidden md:block">
          <div className="overflow-x-auto">
            <table className="roster-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Age Group</th>
                  <th>Age Range</th>
                  <th>Kumite Duration</th>
                  <th>Weight Classes</th>
                </tr>
              </thead>
              <tbody>
                {AGE_CATEGORIES.map((cat, i) => (
                  <tr key={cat.label}>
                    <td className="text-white/30 font-mono text-xs">{String(i + 1).padStart(2, "0")}</td>
                    <td>
                      <span className={`belt-badge border ${beltColors[cat.label] ?? "text-white/60 border-white/10"}`}>
                        {cat.label}
                      </span>
                    </td>
                    <td className="text-white/70 font-semibold">{cat.range}</td>
                    <td>
                      <span className="flex items-center gap-1.5 text-white/70">
                        <Clock className="w-3.5 h-3.5 text-brand-gold" />
                        {cat.kumite}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {cat.weights.map((w) => (
                          <span
                            key={w}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md
                                       bg-surface-700 border border-white/10 text-xs text-white/60"
                          >
                            <Scale className="w-2.5 h-2.5 text-white/30" />
                            {w}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {AGE_CATEGORIES.map((cat, i) => (
            <div key={cat.label} className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={`belt-badge border text-sm font-bold ${beltColors[cat.label] ?? "text-white/60 border-white/10"}`}>
                  {cat.label}
                </span>
                <span className="text-xs text-white/30 font-mono">#{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mb-1">Range</div>
                  <div className="font-semibold text-white">{cat.range}</div>
                </div>
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mb-1">Kumite</div>
                  <div className="flex items-center gap-1 font-semibold text-white">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    {cat.kumite}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-white/30 text-xs uppercase tracking-widest mb-2">Weight Classes</div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.weights.map((w) => (
                    <span
                      key={w}
                      className="px-2 py-0.5 rounded-md bg-surface-700 border border-white/10 text-xs text-white/60"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All Weight Classes */}
        <div className="mt-12">
          <div className="gold-divider" />
          <h2 className="text-xl font-black text-white text-center mb-6">
            All <span className="text-brand-gold">Weight Classes</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {WEIGHT_CLASSES.map((w, i) => (
              <div
                key={w}
                className="card flex items-center justify-between px-4 py-3
                           hover:border-brand-gold/25 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-gold/60" />
                  <span className="text-sm font-semibold text-white">{w}</span>
                </div>
                <span className="text-xs text-white/20 font-mono">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
