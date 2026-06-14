import RegistrationForm from "@/components/RegistrationForm";
import { ClipboardList, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Student Registration",
  description: "Register for OMAKKA Cup 2026 Season 3. Fill the form with your details to secure your spot.",
};

export default function RegisterPage() {
  return (
    <div className="bg-surface-950 min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-tag mb-4">Online Registration</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Register <span className="text-brand-crimson">Now</span>
          </h1>
          <p className="text-white/50">
            Fill out all fields accurately. Registration closes{" "}
            <span className="text-brand-gold font-semibold">15th July 2026</span>.
          </p>
        </div>

        {/* Fee Banner */}
        <div className="card-gold p-4 flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-5 h-5 text-brand-gold" />
            <div>
              <div className="font-bold text-white text-sm">OMAKKA Cup 2026 · Season 3</div>
              <div className="text-xs text-white/50">Kata &amp; Kumite – Both events compulsory</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-brand-gold">₹1,800</div>
            <div className="text-xs text-white/40">Entry Fee</div>
          </div>
        </div>

        {/* Warning */}
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/60 leading-relaxed">
            <span className="text-amber-400 font-bold">Important: </span>
            All fields marked with * are mandatory. Enter information exactly as it appears
            on official documents. No refunds are provided after registration.
          </p>
        </div>

        {/* Form Card */}
        <div className="card p-6 sm:p-8">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
