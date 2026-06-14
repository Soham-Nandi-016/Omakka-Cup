import { MapPin, Clock, Phone, Navigation } from "lucide-react";

export const metadata = {
  title: "Venue & Info",
  description: "OMAKKA Cup 2026 venue: Samrat Ashok Buddha Vihar AC Hall, Mira Road (E). Reporting time 8:30 AM, August 2nd 2026.",
};

const phones = [
  { number: "+91 99308 94339", name: "Kyoshi Vijay Shigwan", href: "tel:+919930894339" },
  { number: "+91 70456 14499", name: "Sensei Saurav Puthran", href: "tel:+917045614499" },
];

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.8!2d72.8679!3d19.2889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSamrat%20Ashok%20Buddha%20Vihar%2C%20Ramdev%20Park%2C%20Mira%20Road%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890";

const directions =
  "https://www.google.com/maps/search/?api=1&query=Samrat+Ashok+Buddha+Vihar+AC+Hall+Near+Divine+Mercy+Church+Ramdev+Park+Mira+Road+East+Maharashtra";

export default function VenuePage() {
  return (
    <div className="bg-surface-950 min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag mb-4">Event Location</span>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Venue <span className="text-brand-gold">&amp; Info</span>
          </h1>
          <p className="text-white/50">Tournament location, timing, and organizer helplines</p>
        </div>

        {/* Quick Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="card-gold p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/20 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Reporting Time</div>
              <div className="text-xl font-black text-white">8:30 AM Sharp</div>
              <div className="text-sm text-brand-gold/80">Sunday, 2nd August 2026</div>
            </div>
          </div>

          <div className="card-crimson p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-crimson/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-brand-crimson-light" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Venue</div>
              <div className="text-base font-bold text-white leading-tight">
                Samrat Ashok Buddha Vihar AC Hall
              </div>
              <div className="text-sm text-white/50">Near Divine Mercy Church, Mira Road (E)</div>
            </div>
          </div>
        </div>

        {/* Full Address Card */}
        <div className="card p-6 mb-8">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-brand-crimson-light flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="font-bold text-white text-lg mb-1">Full Address</h2>
              <p className="text-white/70 leading-relaxed">
                Samrat Ashok Buddha Vihar AC Hall,<br />
                Near Divine Mercy Church,<br />
                Ramdev Park, Mira Road (E),<br />
                Mira-Bhayandar, Maharashtra – 401107
              </p>
              <a
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 btn-gold text-sm px-5 py-2.5"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
                <span className="text-xs font-normal opacity-80">(Click here to open maps)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="card overflow-hidden mb-8">
          <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span className="text-sm font-semibold text-white">Location Map</span>
          </div>
          <div className="relative w-full" style={{ paddingTop: "50%" }}>
            <iframe
              src={mapSrc}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="OMAKKA Cup 2026 Venue – Samrat Ashok Buddha Vihar AC Hall, Mira Road"
              allowFullScreen
            />
          </div>
          <div className="px-5 py-3 bg-surface-800/50 border-t border-white/[0.06]">
            <p className="text-xs text-white/40">
              Samrat Ashok Buddha Vihar AC Hall · Ramdev Park, Mira Road (E) · Maharashtra
            </p>
          </div>
        </div>

        {/* Helpline */}
        <div className="card p-6">
          <h2 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
            <Phone className="w-5 h-5 text-brand-gold" />
            Organizer Helplines
          </h2>
          <p className="text-sm text-white/50 mb-5">
            For queries about registration, venue, or event logistics — call the organizers directly:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {phones.map(({ number, name, href }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-4 p-4 rounded-xl
                           bg-surface-700 border border-white/10
                           hover:border-brand-gold/40 hover:bg-brand-gold/5
                           transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20
                                flex items-center justify-center flex-shrink-0
                                group-hover:bg-brand-gold/20 transition-colors">
                  <Phone className="w-4 h-4 text-brand-gold" />
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-0.5">Tap to Call</div>
                  <div className="text-base font-bold text-white group-hover:text-brand-gold transition-colors">
                    {number}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5">{name}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* How to reach */}
        <div className="mt-8 card p-6">
          <h2 className="font-bold text-white text-base mb-4">How to Reach</h2>
          <div className="space-y-3 text-sm text-white/60">
            {[
              "🚉 Nearest Station: Convenient from both Mira Road Railway Station and Bhayandar Railway Station (Western Railway) (~2-3 km).",
              "🚌 By Bus (From Mira Road): Take MBMT Bus No. 21 and alight at the Ramnagar Bus Stop.",
              "🚌 By Bus (From Bhayandar): Take MBMT Bus No. 12 and alight at the Ramnagar Bus Stop.",
              "🛺 By Auto-rickshaw: Share/Special auto-rickshaws are readily available outside both stations directly to the venue. Approximate fare is ₹70.",
              "🚗 By Road: Take Western Express Highway, exit at Mira Road/Kashimira, and follow routes toward Ramdev Park / Ramnagar.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-2 leading-relaxed">
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
