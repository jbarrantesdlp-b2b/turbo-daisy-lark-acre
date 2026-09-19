import { cn } from "@/lib/utils";

export function Ring({
  value,
  size = 56,
  stroke = 6,
  className,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("-rotate-90", className)}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        className="stroke-border"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        className="stroke-ok"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkBars({
  values,
  className,
  accentLast = true,
}: {
  values: number[];
  className?: string;
  accentLast?: boolean;
}) {
  const max = Math.max(...values, 1);
  return (
    <div className={cn("flex h-10 items-end gap-1", className)}>
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className={cn(
            "w-1.5 rounded-full",
            accentLast && index === values.length - 1
              ? "bg-primary"
              : "bg-border",
          )}
          style={{ height: `${Math.max(12, (value / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

export function SparkLine({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const w = 120;
  const h = 40;
  const pts = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * w;
      const y = h - ((value - min) / Math.max(max - min, 1)) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-10 w-full", className)}
      fill="none"
      aria-hidden="true"
    >
      <polyline
        points={pts}
        className="stroke-primary"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function UsageMeter({
  parts,
}: {
  parts: { label: string; value: number; color: string }[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex h-2 overflow-hidden rounded-full bg-sidebar-line">
        {parts.map((part) => (
          <span
            key={part.label}
            className="h-full"
            style={{ width: `${part.value}%`, background: part.color }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-sidebar-muted">
        {parts.map((part) => (
          <li key={part.label} className="flex items-center gap-1.5">
            <span
              className="size-1.5 rounded-full"
              style={{ background: part.color }}
            />
            {part.label} {part.value}%
          </li>
        ))}
      </ul>
    </div>
  );
}
