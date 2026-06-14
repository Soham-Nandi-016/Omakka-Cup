import Link from "next/link";
import { Phone, MapPin, Swords } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-900 border-t border-white/[0.06] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-brand-crimson flex items-center justify-center">
                <Swords className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-black tracking-wider text-white">OMAKKA CUP 2026</div>
                <div className="text-[10px] text-brand-gold tracking-widest uppercase">Season 3</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              All India Open Karate Championship organized by the Okinawa Martial Arts Karate Kobudo Association.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ["Home", "/"],
                ["Tournament Rules", "/rules"],
                ["Age Categories", "/categories"],
                ["Venue & Info", "/venue"],
                ["Register Now", "/register"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-brand-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-3">Contact</h3>
            <div className="space-y-2.5">
              <a
                href="tel:+919930894339"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold/60 flex-shrink-0" />
                +91 99308 94339 (Kyoshi Vijay Shigwan)
              </a>
              <a
                href="tel:+917045614499"
                className="flex items-center gap-2.5 text-sm text-white/60 hover:text-brand-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold/60 flex-shrink-0" />
                +91 70456 14499 (Sensei Saurav Puthran)
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-brand-crimson/60 flex-shrink-0 mt-0.5" />
                <span>Samrat Ashok Buddha Vihar AC Hall, Near Divine Mercy Church, Ramdev Park, Mira Road (E)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <span>© 2026 Okinawa Martial Arts Karate Kobudo Association. All rights reserved.</span>
          <span>Tournament Date: Sunday, 2nd August 2026</span>
        </div>
        <div className="mt-4 text-center">
          <span className="text-xs tracking-wide text-neutral-400 italic">
            Designed and Developed by Soham Nandi
          </span>
        </div>
      </div>
    </footer>
  );
}
