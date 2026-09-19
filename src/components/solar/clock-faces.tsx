import { BatteryMedium, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AnalogClock } from "@/components/solar/analog-clock";
import { useNow } from "@/hooks/use-now";
import { capitalize, cn } from "@/lib/utils";

export type ClockSize = "2x2" | "3x3";

function BrandFoot({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "wq-brand text-center text-[9px] font-semibold tracking-[0.18em] text-solar-fg/80",
        className,
      )}
    >
      SYNC ENGINE
      <span className="mt-0.5 block text-[8px] font-medium tracking-[0.2em] text-solar">
        by Barrantes Co.
      </span>
    </p>
  );
}

export function DigitalOption1({
  className,
  size = "2x2",
}: {
  className?: string;
  size?: ClockSize;
}) {
  const now = useNow(250);
  return (
    <div
      className={cn(
        "solar-tile flex flex-col items-center justify-center px-4 py-5",
        className,
      )}
    >
      <p
        key={format(now, "H:mm")}
        className="solar-tick wq-time font-sans font-semibold tracking-tight text-solar-fg tabular-nums"
      >
        {format(now, "H:mm")}
      </p>
      <p className="wq-meta mt-2 flex gap-3 tabular-nums">
        <span className="text-solar">{format(now, "H:mm:ss")}</span>
        <span className="text-solar-fg/45">{format(now, "MMM d, yy")}</span>
      </p>
      <p className="wq-extra mt-2 text-xs text-solar-fg/50">
        {capitalize(format(now, "EEEE d MMMM", { locale: es }))}
      </p>
      <BrandFoot className="mt-6" />
    </div>
  );
}

export function DigitalOption2({
  className,
  size = "2x2",
}: {
  className?: string;
  size?: ClockSize;
}) {
  const now = useNow(1000);
  return (
    <div
      className={cn(
        "solar-tile flex flex-col items-center justify-center px-4 py-5",
        className,
      )}
    >
      <p
        key={format(now, "H:mm")}
        className="solar-tick wq-time font-sans font-semibold tracking-tight text-solar-fg tabular-nums"
      >
        {format(now, "H:mm")}
      </p>
      <p className="wq-meta mt-3 flex items-center gap-3 text-solar-fg/55">
        <span className="inline-flex items-center gap-1">
          <BatteryMedium className="size-3.5" />
          87%
        </span>
        <span className="inline-flex items-center gap-1">
          <RefreshCcw className="size-3" />
          Sync
        </span>
      </p>
      <p className="wq-extra mt-2 text-xs tracking-[0.16em] text-solar">ONLINE · LAPTOP</p>
      <BrandFoot className="mt-6" />
    </div>
  );
}

export function DigitalOption3({
  className,
  size = "2x2",
}: {
  className?: string;
  size?: ClockSize;
}) {
  const now = useNow(1000);
  return (
    <div
      className={cn(
        "solar-tile wq-stack flex items-center justify-center gap-4 px-5 py-5",
        className,
      )}
    >
      <div
        key={format(now, "H:mm")}
        className="solar-tick wq-time text-right font-sans font-semibold leading-[0.86] tracking-tight text-solar-fg tabular-nums"
      >
        <p>{format(now, "HH")}</p>
        <p className="text-solar-fg/55">{format(now, "mm")}</p>
      </div>
      <span className="wq-extra h-16 w-px bg-solar-fg/20" />
      <div className="wq-extra text-left">
        <p className="wq-meta leading-snug text-solar-fg/70">
          {capitalize(format(now, "MMM d, yyyy", { locale: es }))}
        </p>
        <p className="mt-1 text-xs text-solar-fg/45">{format(now, "EEEE", { locale: es })}</p>
        <p className="mt-3 text-[10px] font-semibold tracking-[0.16em] text-solar-fg">
          SYNC ENGINE
        </p>
        <p className="text-[9px] tracking-[0.16em] text-solar">by Barrantes Co.</p>
      </div>
    </div>
  );
}

export function DigitalSeconds({ className }: { className?: string }) {
  const now = useNow(80);
  const sec = now.getSeconds() + now.getMilliseconds() / 1000;
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("solar-tile flex flex-col items-center justify-center p-5", className)}>
      <div className="relative aspect-square w-[min(72%,11.5rem)]">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            className="text-solar"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - sec / 60)}
            opacity="0.85"
          />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            className="solar-flow-ring text-solar"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="12 277"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            key={format(now, "H:mm")}
            className="solar-tick font-sans text-4xl font-semibold tabular-nums text-solar-fg"
          >
            {format(now, "H:mm")}
          </p>
          <p className="text-xs tabular-nums text-solar">{format(now, "ss")}</p>
        </div>
      </div>
      <BrandFoot className="mt-3" />
    </div>
  );
}

export function AnalogPrecision({ className }: { className?: string }) {
  return (
    <div className={cn("solar-tile solar-glass solar-glass-analog p-3", className)}>
      <span className="solar-veil" aria-hidden="true" />
      <AnalogClock />
    </div>
  );
}

export function AnalogNumbered({ className }: { className?: string }) {
  return (
    <div className={cn("solar-tile p-3", className)}>
      <AnalogClock numbered />
    </div>
  );
}

export const CLOCK_MODES = [
  {
    id: "analog",
    title: "Precision Minimalist",
    subtitle: "Analog Clock mode",
    Face: AnalogPrecision,
  },
  {
    id: "digital-1",
    title: "Digital Clock Mode",
    subtitle: "Option 1 · 2×2",
    Face: DigitalOption1,
  },
  {
    id: "digital-2",
    title: "Digital Clock Mode",
    subtitle: "Option 2 · 2×2",
    Face: DigitalOption2,
  },
  {
    id: "digital-3",
    title: "Digital Clock Mode",
    subtitle: "Option 3 · 2×2",
    Face: DigitalOption3,
  },
] as const;
