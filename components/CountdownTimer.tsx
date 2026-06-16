"use client";

import { useEffect, useState, useRef } from "react";
import { EVENT_DATE } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => { setFlip(false); setPrev(value); }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <div
        className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-xl sm:rounded-2xl
          bg-surface-800 border border-white/10 shadow-card-shadow
          flex items-center justify-center overflow-hidden
          transition-transform duration-300 ${flip ? "scale-95" : "scale-100"}`}
      >
        {/* top shine */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
        <span className="text-2xl sm:text-3xl md:text-5xl font-black text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-white/40">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      setTimeLeft(calcTimeLeft());
      rafRef.current = window.setTimeout(tick, 1000);
    };
    tick();
    return () => { if (rafRef.current) clearTimeout(rafRef.current); };
  }, []);

  if (!mounted) {
    return (
      <div className="text-center min-h-[120px] flex items-center justify-center">
        <p className="text-white/40 font-bold tracking-widest animate-pulse">SYNCING TIMERS...</p>
      </div>
    );
  }

  const isOver = Object.values(timeLeft).every((v) => v === 0);

  return (
    <div className="text-center">
      {isOver ? (
        <p className="text-2xl font-bold text-brand-gold">Tournament Day is Here!</p>
      ) : (
        <div className="flex items-start justify-center gap-1.5 sm:gap-3 md:gap-4">
          <Digit value={timeLeft.days}    label="Days" />
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-gold/60 mt-5 sm:mt-6">:</span>
          <Digit value={timeLeft.hours}   label="Hours" />
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-gold/60 mt-5 sm:mt-6">:</span>
          <Digit value={timeLeft.minutes} label="Mins" />
          <span className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-gold/60 mt-5 sm:mt-6">:</span>
          <Digit value={timeLeft.seconds} label="Secs" />
        </div>
      )}
    </div>
  );
}
