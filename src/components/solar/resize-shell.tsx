import { useCallback, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

export const SIZE_PRESETS: Record<string, { w: number; h: number; label: string }> = {
  "2x2": { w: 168, h: 168, label: "2×2" },
  "4x2": { w: 348, h: 148, label: "4×2" },
  "3x3": { w: 252, h: 252, label: "3×3" },
  "4x4": { w: 348, h: 348, label: "4×4" },
} as const;

export type SizePreset = "2x2" | "4x2" | "3x3" | "4x4";

const MIN = 128;
const MAX = 420;
const SNAP = 8;

function snap(n: number) {
  return Math.round(n / SNAP) * SNAP;
}

export function WidgetShell({
  children,
  preset = "2x2",
  label,
}: {
  children: ReactNode;
  preset?: SizePreset;
  label: string;
}) {
  const start = SIZE_PRESETS[preset];
  const [box, setBox] = useState({ w: start.w, h: start.h });
  const [active, setActive] = useState<SizePreset | "free">(preset);
  const drag = useRef<{ x: number; y: number; w: number; h: number } | null>(null);

  const onPointerDown = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, w: box.w, h: box.h };
  }, [box]);

  const onPointerMove = useCallback((e: PointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return;
    const nextW = snap(Math.min(MAX, Math.max(MIN, drag.current.w + (e.clientX - drag.current.x))));
    const nextH = snap(Math.min(MAX, Math.max(MIN, drag.current.h + (e.clientY - drag.current.y))));
    setBox({ w: nextW, h: nextH });
    setActive("free");
  }, []);

  const onPointerUp = useCallback(() => {
    drag.current = null;
  }, []);

  return (
    <div className="min-w-0">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] text-solar-fg/50">{label}</p>
        <div className="flex gap-1">
          {(Object.keys(SIZE_PRESETS) as SizePreset[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setBox({ w: SIZE_PRESETS[id].w, h: SIZE_PRESETS[id].h });
                setActive(id);
              }}
              className={cn(
                "h-6 rounded-full px-2 text-[10px] font-medium",
                active === id ? "bg-solar text-oled" : "bg-solar-fg/8 text-solar-fg/55",
              )}
            >
              {SIZE_PRESETS[id].label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="widget-shell relative"
        style={{ width: box.w, height: box.h }}
      >
        {children}
        <button
          type="button"
          aria-label="Redimensionar widget"
          className="absolute bottom-1.5 right-1.5 z-10 size-5 cursor-nwse-resize rounded-sm border border-solar/70 bg-solar/30"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
      <p className="mt-1 text-[10px] tabular-nums text-solar-fg/35">
        {box.w} × {box.h}
      </p>
    </div>
  );
}
