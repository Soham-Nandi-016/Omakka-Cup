import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OMAKKA Cup 2026 – Season 3 | All India Open Karate Championship",
    template: "%s | OMAKKA Cup 2026",
  },
  description:
    "Official registration portal for OMAKKA Cup 2026 Season 3 – All India Open Karate Championship organized by the Okinawa Martial Arts Karate Kobudo Association. Tournament on August 2nd, 2026 at Mira Road.",
  keywords: ["OMAKKA Cup", "karate championship", "2026", "Mira Road", "registration", "OKMAKKA"],
  openGraph: {
    title: "OMAKKA Cup 2026 – Season 3",
    description: "All India Open Karate Championship – Register Now",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-surface-950 text-white antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
