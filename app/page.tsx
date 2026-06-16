import Link from "next/link";
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import {
  Trophy, Shield, Clock, MapPin, Star, Users, Award
} from "lucide-react";

export const metadata = {
  title: "OMAKKA Cup 2026 – Season 3 | Home",
  description:
    "OMAKKA Cup 2026 Season 3 – All India Open Karate Championship. Register now for the biggest karate tournament on August 2nd, 2026.",
};

const highlights = [
  { icon: Trophy,  label: "Championship",  value: "Season 3" },
  { icon: Users,   label: "Open To",       value: "All Ages" },
  { icon: Clock,   label: "Reporting",     value: "8:30 AM" },
  { icon: MapPin,  label: "Location",      value: "Mira Road (E)" },
];

const milestones = [
  { year: "2024", label: "Season 1 – Inaugural Championship" },
  { year: "2025", label: "Season 2 – 300+ Participants" },
  { year: "2026", label: "Season 3 – All India Open" },
];

export default function HomePage() {
  return (
    <div className="bg-surface-950">

      {/* ──────── HERO ──────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center
                          px-4 pt-24 pb-16 overflow-hidden bg-hero-gradient">

        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[600px] rounded-full
                        bg-brand-crimson/[0.07] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4
                        w-[400px] h-[400px] rounded-full
                        bg-brand-gold/[0.05] blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* Season badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-brand-gold/10 border border-brand-gold/25 mb-6">
            <Star className="w-3.5 h-3.5 text-brand-gold" fill="currentColor" />
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-brand-gold">
              Season 3 · All India Open
            </span>
            <Star className="w-3.5 h-3.5 text-brand-gold" fill="currentColor" />
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black
                         tracking-tight leading-none mb-4">
            <span className="text-white">OMAKKA</span>
            <span className="block text-brand-crimson drop-shadow-[0_0_30px_rgba(200,16,46,0.5)]">
              CUP
            </span>
            <span className="text-brand-gold text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider">
              2026
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white/60 mb-2">
            All India Open Karate Championship
          </p>
          <p className="text-[11px] sm:text-sm text-white/40 tracking-widest uppercase mb-10 px-2">
            Organised by – Okinawa Martial Arts Karate Kobudo Association
          </p>

          {/* Countdown */}
          <div className="card-crimson p-4 sm:p-6 md:p-8 rounded-2xl mb-8 w-full">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/40 mb-5">
              Tournament Begins In
            </p>
            <CountdownTimer />
            <p className="text-xs text-white/30 mt-4">
              Sunday, 2nd August 2026 · 8:30 AM
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-crimson text-base px-8 py-4 w-full sm:w-auto">
              Register Now
            </Link>
            <Link href="/rules" className="btn-outline text-base px-8 py-4 w-full sm:w-auto">
              View Rules
            </Link>
          </div>
        </div>
      </section>

      {/* ──────── HIGHLIGHTS ──────── */}
      <section className="py-14 px-4 border-y border-white/[0.06] bg-surface-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, label, value }) => (
            <div key={label} className="card flex flex-col items-center py-6 px-4 text-center gap-3
                                        hover:border-brand-gold/25 transition-colors">
              <Icon className="w-6 h-6 text-brand-gold" />
              <div>
                <div className="text-xl font-black text-white">{value}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────── ABOUT ──────── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* About OMAKKA */}
            <div>
              <span className="section-tag mb-4">About the Organization</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Okinawa Martial Arts<br />
                <span className="text-brand-gold">Karate Kobudo</span><br />
                Association
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                The Okinawa Martial Arts Karate Kobudo Association (OMAKKA) is dedicated to promoting
                and preserving the authentic traditions of Okinawan karate and kobudo across India.
                Through structured tournaments, seminars, and grading examinations, OMAKKA cultivates
                discipline, respect, and excellence among practitioners of all ages.
              </p>
              <p className="text-white/60 leading-relaxed">
                The OMAKKA Cup serves as the flagship annual championship event – a platform where
                aspiring karatekas from across the country compete, learn, and grow in the true
                spirit of Budo.
              </p>

              {/* Timeline */}
              <div className="mt-8 space-y-3">
                {milestones.map((m) => (
                  <div key={m.year} className="flex items-center gap-3">
                    <div className="w-14 text-xs font-black text-brand-gold">{m.year}</div>
                    <div className="flex-1 h-px bg-brand-gold/20" />
                    <div className="text-sm text-white/50">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Director Card */}
            <div className="card-gold p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-brand-gold/30 flex-shrink-0 shadow-lg">
                  <Image
                    src="/images/vijay-shigwan.jpg"
                    alt="Kyoshi Vijay Shigwan"
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                  />
                </div>
                <div>
                  <div className="section-tag-crimson mb-1">Tournament Director</div>
                  <h3 className="text-xl font-black text-white">Kyoshi Vijay Shigwan</h3>
                  <p className="text-sm text-brand-gold/80 font-semibold">7th Dan Black Belt</p>
                </div>
              </div>

              <div className="gold-divider !my-5" />

              <div className="space-y-3">
                {[
                  { icon: Award, text: "Senior instructor and head examiner for OMAKKA" },
                  { icon: Shield, text: "Dedicated to Okinawan Karate traditions since 1995" },
                  { icon: Trophy, text: "Champion mentor of 50+ national-level medalists" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60">{text}</p>
                  </div>
                ))}
              </div>

              {/* Credentials */}
              <div className="mt-4 pt-4 border-t border-brand-gold/10">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-brand-gold/50 mb-2">Official Credentials</p>
                <ul className="space-y-1.5">
                  {[
                    "7th Dan Black Belt (Goju Ryu Japan) & 6th Dan Black Belt (KAI)",
                    "3rd Dan Black Belt (Sqay Martial Art) & 1st Dan Black Belt (Kick Boxing)",
                    "'A' Grade Referee For NBS (Japan) & Kempo (MMA) Asian Referee",
                    "International Gold Medalist (Malaysia 2019)",
                    "World MAC Games Gold Medalist 2016",
                    "International Silver & Bronze Medalist (Malaysia 2014)",
                    "Unique World Records Holder 2018",
                  ].map((cred) => (
                    <li key={cred} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-gold/50 flex-shrink-0" />
                      <span className="text-xs text-white/55 leading-snug">{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 p-4 bg-surface-800/50 rounded-xl border border-brand-gold/10">
                <p className="text-xs italic text-white/50 leading-relaxed">
                  "The OMAKKA Cup is not just a competition — it is a celebration of the spirit, 
                  dedication, and discipline that define the true martial artist."
                </p>
                <p className="text-xs font-bold text-brand-gold mt-2">— Kyoshi Vijay Shigwan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── QUICK INFO ──────── */}
      <section className="py-16 px-4 bg-surface-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-tag mb-3">Key Details</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Tournament At a Glance</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Entry Fee",
                value: "₹1,800/-",
                sub: "Kata & Kumite · Both compulsory",
                color: "border-brand-gold/25 bg-brand-gold/5",
              },
              {
                label: "Registration Deadline",
                value: "15th July 2026",
                sub: "Pre-registration mandatory",
                color: "border-brand-crimson/25 bg-brand-crimson/5",
              },
              {
                label: "Tournament Date",
                value: "2nd Aug 2026",
                sub: "Sunday · Reporting: 8:30 AM",
                color: "border-white/10",
              },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className={`card ${color} p-6 text-center`}>
                <div className="text-xs font-bold tracking-widest uppercase text-white/40 mb-2">{label}</div>
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{value}</div>
                <div className="text-xs text-white/50">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── CTA BANNER ──────── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Ready to Compete?
          </h2>
          <p className="text-white/50 mb-8">
            Secure your spot before 15th July 2026. Register online in under 3 minutes.
          </p>
          <Link
            href="/register"
            className="btn-crimson inline-flex items-center gap-2 text-lg px-10 py-4"
          >
            Register Now · ₹1,800/-
          </Link>
        </div>
      </section>
    </div>
  );
}
