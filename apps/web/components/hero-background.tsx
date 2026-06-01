import React from "react";

interface GridLine {
  pos: number;
  delay: number;
  duration: number;
}

const verticalLines: GridLine[] = [
  { pos: 12, delay: 2, duration: 16 },
  { pos: 32, delay: 8, duration: 20 },
  { pos: 50, delay: 14, duration: 24 },
  { pos: 68, delay: 6, duration: 28 },
  { pos: 88, delay: 20, duration: 32 },
];

const horizontalLines: GridLine[] = [
  { pos: 15, delay: 4, duration: 18 },
  { pos: 42, delay: 10, duration: 22 },
  { pos: 68, delay: 16, duration: 26 },
  { pos: 88, delay: 0, duration: 30 },
];

export default function HeroBackground() {
  return (
    <div
      className="absolute inset-x-0 -top-24 h-[800px] pointer-events-none -z-10 overflow-hidden select-none"
      style={{
        maskImage: "radial-gradient(circle at 50% 25%, black 45%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 25%, black 45%, transparent 80%)",
      }}
    >
      {/* Vertical Lines */}
      {verticalLines.map((line, idx) => (
        <div
          key={`v-${idx}`}
          className="absolute top-0 bottom-0 w-[1px] bg-slate-300/10 dark:bg-slate-800/20"
          style={{ left: `${line.pos}%` }}
        >
          {/* Moving Glow Beam & Spark */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-[120px] opacity-0 animate-glow-y"
            style={{
              animationDelay: `${line.delay}s`,
              animationDuration: `${line.duration}s`,
            }}
          >
            {/* The Beam - High visibility in dark mode */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[1.5px] h-full bg-gradient-to-b from-transparent via-[oklch(62.3%_0.214_259.815)] to-transparent" />
            {/* The Moving Spark (Splash) - Matching passion badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,1),0_0_15px_4px_oklch(62.3%_0.214_259.815)]" />
          </div>
        </div>
      ))}

      {/* Horizontal Lines */}
      {horizontalLines.map((line, idx) => (
        <div
          key={`h-${idx}`}
          className="absolute left-0 right-0 h-[1px] bg-slate-300/10 dark:bg-slate-800/20"
          style={{ top: `${line.pos}%` }}
        >
          {/* Moving Glow Beam & Spark */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-[120px] h-4 opacity-0 animate-glow-x"
            style={{
              animationDelay: `${line.delay}s`,
              animationDuration: `${line.duration}s`,
            }}
          >
            {/* The Beam - High visibility in dark mode */}
            <div className="absolute top-1/2 -translate-y-1/2 h-[1.5px] w-full bg-gradient-to-r from-transparent via-[oklch(62.3%_0.214_259.815)] to-transparent" />
            {/* The Moving Spark (Splash) - Matching passion badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,1),0_0_15px_4px_oklch(62.3%_0.214_259.815)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
