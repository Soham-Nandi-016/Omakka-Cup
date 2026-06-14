"use client";

import { useState, useRef } from "react";
import { HelpCircle } from "lucide-react";

interface Props {
  tip: string;
  children: React.ReactNode;
  id?: string;
}

export default function TooltipField({ tip, children, id }: Props) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  };
  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  };

  return (
    <div className="flex items-start gap-1.5" id={id}>
      <div className="flex-1">{children}</div>
      <div className="relative mt-8 flex-shrink-0">
        <button
          type="button"
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
          onClick={() => setVisible((v) => !v)}
          aria-label="Help"
          className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/30
                     flex items-center justify-center text-brand-gold
                     hover:bg-brand-gold/20 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
        </button>

        {visible && (
          <div
            className="absolute bottom-full right-0 mb-2 w-56 z-30
                       bg-surface-700 border border-brand-gold/20 rounded-xl
                       p-3 shadow-gold-glow text-xs text-white/80 leading-relaxed"
            onMouseEnter={show}
            onMouseLeave={hide}
          >
            <div className="absolute bottom-0 right-3 translate-y-full
                            border-4 border-transparent border-t-surface-700" />
            {tip}
          </div>
        )}
      </div>
    </div>
  );
}
