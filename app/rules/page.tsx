import { AlertCircle, Shield, DollarSign, Calendar, Package, Gavel, Lock } from "lucide-react";

export const metadata = {
  title: "Tournament Rules",
  description: "Official rules and regulations for OMAKKA Cup 2026 Season 3. Fees, deadlines, safety equipment, and appeal process.",
};

const rules = [
  {
    icon: DollarSign,
    color: "text-brand-gold",
    bg: "bg-brand-gold/10 border-brand-gold/20",
    title: "Entry Fees",
    badge: "₹1,800/-",
    items: [
      "Registration fee covers BOTH Kata and Kumite events.",
      "Both events are compulsory — no partial registrations accepted.",
      "Fees must be paid at time of registration.",
      "No refund once registered under any circumstances.",
    ],
  },
  {
    icon: Calendar,
    color: "text-brand-crimson-light",
    bg: "bg-brand-crimson/10 border-brand-crimson/20",
    title: "Registration Deadline",
    badge: "15 July 2026",
    items: [
      "Pre-registration must be completed before 15th July, 2026.",
      "Walk-in entries on the day of the event will NOT be accepted.",
      "Incomplete applications are subject to rejection without refund.",
      "Age proof documents may be required at the venue.",
    ],
  },
  {
    icon: Package,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "Safety Equipment",
    badge: "Mandatory",
    items: [
      "Competitors must carry their own personal safety guards.",
      "Hand gloves are mandatory and must be brought by the participant.",
      "The organization will NOT provide any safety equipment.",
      "Participants not equipped with required gear may be disqualified.",
    ],
  },
  {
    icon: Gavel,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    title: "Appeals & Grievances",
    badge: "₹1,000/- Fee",
    items: [
      "Claims regarding refereeing or judging will NOT be entertained at the venue.",
      "All appeals must be submitted in writing to the Sensei.",
      "A non-refundable appeal fee of ₹1,000/- is required.",
      "The judicial committee's decision will be conveyed by registered post.",
      "All appeal fees are strictly non-refundable.",
    ],
  },
  {
    icon: Shield,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    title: "Medical Requirements",
    badge: "Certificate Required",
    items: [
      "All participants must submit a medical certificate of fitness.",
      "Certificate must be endorsed by a registered medical practitioner.",
      "Forms without a fitness certificate will NOT be accepted.",
      "The organizer will provide first aid only at the tournament.",
    ],
  },
  {
    icon: Lock,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    title: "Floor Access & Conduct",
    badge: "Strict Policy",
    items: [
      "Only participants whose event is in progress may be on the tournament floor.",
      "Team managers and official coaches are allowed with valid accreditation.",
      "Arguing with the referee or disturbing the event may result in disqualification.",
      "All contestants must conduct themselves with decorum in the spirit of Karate.",
    ],
  },
  {
    icon: AlertCircle,
    color: "text-white/50",
    bg: "bg-white/5 border-white/10",
    title: "Organizer's Rights Reserved",
    badge: "Policy",
    items: [
      "The organizing committee holds all rights to accept or reject any participation.",
      "The federation reserves the right to forfeit fees for any reason they deem fit.",
      "Merit & Participation Certificates will be awarded.",
      "Tournament criteria and rules are subject to change at organizer's discretion.",
    ],
  },
];

const criteria = [
  {
    title: "KATA",
    color: "border-brand-gold/40 bg-brand-gold/5",
    titleColor: "text-brand-gold",
    text: "All contestants must perform Okinawa Kata. Repeat Kata is NOT allowed.",
  },
  {
    title: "KUMITE",
    color: "border-brand-crimson/40 bg-brand-crimson/5",
    titleColor: "text-brand-crimson-light",
    text: "Duration: 1 minute (Under 14) · 1.5 minutes (Above 14). All boys & girls.",
  },
];

export default function RulesPage() {
  return (
    <div className="bg-surface-950 min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4">Official Regulations</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Tournament <span className="text-brand-crimson">Rules</span>
          </h1>
          <p className="text-white/50 text-base max-w-2xl mx-auto">
            Please read all regulations carefully before registering. All participants and
            accompanying coaches must strictly adhere to these rules.
          </p>
        </div>

        {/* Tournament Criteria */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {criteria.map((c) => (
            <div key={c.title} className={`card p-6 border ${c.color}`}>
              <div className={`text-xs font-black tracking-[0.2em] uppercase mb-2 ${c.titleColor}`}>
                {c.title}
              </div>
              <p className="text-sm text-white/70 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="gold-divider" />

        {/* Rules Cards */}
        <div className="space-y-4">
          {rules.map(({ icon: Icon, color, bg, title, badge, items }) => (
            <div key={title} className="card overflow-hidden">
              {/* Card Header */}
              <div className={`flex items-center justify-between px-5 py-4 border-b border-white/[0.06] ${bg} border`}>
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <h2 className="font-bold text-white">{title}</h2>
                </div>
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${bg} ${color}`}>
                  {badge}
                </span>
              </div>

              {/* Card Body */}
              <ul className="px-5 py-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/65 leading-relaxed">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${color.replace("text-", "bg-")}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Important note */}
        <div className="mt-10 p-5 rounded-2xl bg-brand-crimson/10 border border-brand-crimson/25">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-brand-crimson-light flex-shrink-0 mt-0.5" />
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="font-bold text-white">Important: </span> By submitting a registration,
              participants and their guardians confirm they have read, understood, and agreed to all
              tournament rules and the official declaration waiver. The organizing committee&apos;s
              decisions are final and binding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
