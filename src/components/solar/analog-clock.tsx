import { useId } from "react";
import { useNow } from "@/hooks/use-now";
import { cn } from "@/lib/utils";

export function AnalogClock({
  numbered = false,
  brand = true,
  className,
}: {
  numbered?: boolean;
  brand?: boolean;
  className?: string;
}) {
  const now = useNow(80);
  const glowId = useId();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const hourDeg = (hours + minutes / 60) * 30;
  const minDeg = (minutes + seconds / 60) * 6;
  const secDeg = seconds * 6;

  return (
    <div className={cn("relative aspect-square w-full text-solar", className)}>
      <svg viewBox="0 0 200 200" className="size-full" aria-hidden="true">
        <defs>
          <radialGradient id={glowId} cx="50%" cy="92%" r="62%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
            <stop offset="42%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="98" fill={`url(#${glowId})`} />
        {Array.from({ length: 60 }, (_, i) => {
          const major = i % 5 === 0;
          const a = (i * 6 * Math.PI) / 180;
          const inner = major ? 80 : 86;
          const outer = 92;
          return (
            <line
              key={i}
              x1={100 + inner * Math.sin(a)}
              y1={100 - inner * Math.cos(a)}
              x2={100 + outer * Math.sin(a)}
              y2={100 - outer * Math.cos(a)}
              stroke={major ? "currentColor" : "rgba(255,246,234,0.22)"}
              strokeWidth={major ? 2 : 0.7}
              strokeLinecap="round"
            />
          );
        })}
        {numbered
          ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return (
                <text
                  key={n}
                  x={100 + 68 * Math.sin(a)}
                  y={100 - 68 * Math.cos(a) + 4.5}
                  textAnchor="middle"
                  fill="rgba(255,246,234,0.88)"
                  fontSize="13"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight="500"
                >
                  {n}
                </text>
              );
            })
          : null}
        <path
          d="M97 132 L101.5 142 L99.2 142 L103 152 L98 141.5 L100.4 141.5 Z"
          fill="currentColor"
          opacity="0.95"
        />
        <g transform={`rotate(${hourDeg} 100 100)`}>
          <line x1="100" y1="100" x2="100" y2="56" stroke="#ffb56a" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${minDeg} 100 100)`}>
          <line x1="100" y1="106" x2="100" y2="38" stroke="#ffc58a" strokeWidth="2.6" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${secDeg} 100 100)`}>
          <line x1="100" y1="110" x2="100" y2="32" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
        </g>
        <circle cx="100" cy="100" r="5" fill="#ffb56a" />
        <circle cx="100" cy="100" r="2" fill="#1a0e04" />
      </svg>
      {brand ? (
        <>
          <p className="pointer-events-none absolute bottom-[12%] right-[12%] text-right text-[9px] font-semibold leading-tight tracking-[0.14em] text-solar-fg/90">
            SYNC ENGINE
            <span className="mt-0.5 block text-[8px] font-medium tracking-[0.16em] text-solar">
              by Barrantes Co.
            </span>
          </p>
          <InfinityMark className="absolute bottom-[11%] left-[12%] size-5 text-solar" />
        </>
      ) : null}
    </div>
  );
}

export function InfinityMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 14" className={className} aria-hidden="true">
      <path
        d="M7 7c0-2.6 2-4.6 4.4-4.6 2.8 0 4.2 2.4 6.6 4.6-2.4 2.2-3.8 4.6-6.6 4.6C9 11.6 7 9.6 7 7Zm14 0c0 2.6-2 4.6-4.4 4.6-2.8 0-4.2-2.4-6.6-4.6 2.4-2.2 3.8-4.6 6.6-4.6C19 2.4 21 4.4 21 7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
