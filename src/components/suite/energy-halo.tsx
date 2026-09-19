import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CX = 100;
const CY = 100;
const R = 74;
const TAU = Math.PI * 2;
const N = 80;
const BOLT = 52;

function plasmaBand(t: number) {
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * TAU;
    const w =
      3.4 * Math.sin(a * 4 + t * 1.15) +
      2.0 * Math.sin(a * 9 - t * 1.7) +
      1.1 * Math.sin(a * 17 + t * 2.4);
    outer.push(
      `${(CX + Math.cos(a) * (R + 8 + w)).toFixed(2)} ${(CY + Math.sin(a) * (R + 8 + w)).toFixed(2)}`,
    );
  }
  for (let i = N; i >= 0; i--) {
    const a = (i / N) * TAU;
    const w = 1.6 * Math.sin(a * 6 - t * 1.35) + 1.0 * Math.sin(a * 14 + t * 2.1);
    inner.push(
      `${(CX + Math.cos(a) * (R - 7 + w)).toFixed(2)} ${(CY + Math.sin(a) * (R - 7 + w)).toFixed(2)}`,
    );
  }
  return `M${outer.join("L")}L${inner.join("L")}Z`;
}

function boltPath(theta: number, t: number) {
  let d = "";
  for (let i = 0; i <= BOLT; i++) {
    const u = i / BOLT;
    const a = theta - u * 1.15;
    const crack =
      0.55 * Math.sin(a * 18 + t * 16) +
      (i % 5 === 0 ? 2.2 * Math.sin(t * 30 + i * 1.7) : 0);
    const rr = R + crack * (1 - u);
    d += `${i === 0 ? "M" : "L"}${(CX + Math.cos(a) * rr).toFixed(2)} ${(CY + Math.sin(a) * rr).toFixed(2)} `;
  }
  return d;
}

export function EnergyHalo({ className }: { className?: string }) {
  const bandRef = useRef<SVGPathElement>(null);
  const boltRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    const bolt = boltRef.current;
    const head = headRef.current;
    if (!band || !bolt || !head) return;
    let raf = 0;
    let running = true;
    const loop = (now: number) => {
      if (!running) return;
      const t = now / 1000;
      const theta = (t * TAU) / 2.6;
      band.setAttribute("d", plasmaBand(t));
      bolt.setAttribute("d", boltPath(theta, t));
      bolt.setAttribute("opacity", (0.7 + 0.3 * Math.abs(Math.sin(t * 22))).toFixed(3));
      head.setAttribute("cx", String(CX + Math.cos(theta) * R));
      head.setAttribute("cy", String(CY + Math.sin(theta) * R));
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);
    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      role="img"
      aria-label="Halo de plasma con corriente eléctrica alrededor del reloj"
      className={cn("energy-halo pointer-events-none absolute inset-0", className)}
    >
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="plasma-soft"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="bolt-glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="1.1" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={bandRef}
          d={plasmaBand(0)}
          fill="#9b4dff"
          opacity="0.55"
          filter="url(#plasma-soft)"
        />
        <circle
          cx={CX}
          cy={CY}
          r={R}
          fill="none"
          stroke="#c48cff"
          strokeWidth="10"
        />
        <g filter="url(#bolt-glow)">
          <path
            ref={boltRef}
            d={boltPath(0, 0)}
            fill="none"
            stroke="#e8c8ff"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle ref={headRef} cx={CX + R} cy={CY} r="3.2" fill="#f0dcff" />
        </g>
        <circle cx={CX} cy={CY} r="50" fill="#1a1a1a" />
      </svg>
    </div>
  );
}
