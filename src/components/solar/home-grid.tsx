import { Download, Moon, VolumeX, Zap } from "lucide-react";
import { AnalogNumbered } from "@/components/solar/clock-faces";
import { InfinityMark } from "@/components/solar/analog-clock";
import { useSyncStore } from "@/lib/sync/store";
import { cn } from "@/lib/utils";

function TileFoot() {
  return <InfinityMark className="mx-auto size-6 text-solar" />;
}

export function OnlineTile({ className }: { className?: string }) {
  return (
    <div className={cn("solar-tile flex flex-col p-5 text-left", className)}>
      <p className="text-[22px] font-semibold tracking-[0.2em] text-solar">ONLINE</p>
      <p className="mt-4 text-[13px] text-solar-fg/55">Laptop Connection</p>
      <p className="mt-1 text-[20px] font-semibold leading-tight text-solar">
        Wi-Fi 6 / Ethernet
      </p>
      <p className="mt-5 text-[13px] text-solar-fg/55">Active Bandwidth</p>
      <p className="mt-1 text-[34px] font-semibold leading-none tracking-tight text-solar">
        320 Mbps
      </p>
      <div className="mt-auto flex justify-center pt-3">
        <TileFoot />
      </div>
    </div>
  );
}

export function ActionsTile({ className }: { className?: string }) {
  const muted = useSyncStore((s) => s.laptopMuted);
  const toggleMute = useSyncStore((s) => s.toggleMute);
  const items = [
    { label: "Mute Audio", Icon: VolumeX, onClick: toggleMute, on: muted },
    { label: "Sleep / Power Mode", Icon: Moon },
    { label: "Docs / Downloads", Icon: Download },
  ];
  return (
    <div className={cn("solar-tile flex flex-col p-5", className)}>
      <p className="text-center text-[15px] font-medium tracking-wide text-solar-fg/90">
        Remote Actions
      </p>
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {items.map(({ label, Icon, onClick, on }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="flex flex-col items-center gap-2"
          >
            <span
              className={cn(
                "solar-action size-14",
                on && "brightness-125",
              )}
            >
              <Icon className="size-6" strokeWidth={2.1} />
            </span>
            <span className="text-center text-[10px] leading-tight text-solar-fg/70">
              {label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-auto flex justify-center pt-3">
        <TileFoot />
      </div>
    </div>
  );
}

export function BatteryTile({ className }: { className?: string }) {
  const pct = 88;
  const r = 44;
  const c = 2 * Math.PI * r;
  const dash = c * (1 - pct / 100);
  return (
    <div className={cn("solar-tile flex flex-col items-center justify-center p-4", className)}>
      <div className="relative aspect-square w-[86%]">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,246,234,0.08)" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="currentColor"
            className="text-solar"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={dash}
            style={{ filter: "drop-shadow(0 0 8px #ff8a1f)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-medium tracking-[0.2em] text-solar-fg/60">
            LAPTOP BATTERY
          </p>
          <p className="mt-1 flex items-center gap-1 text-[42px] font-semibold leading-none text-solar-fg">
            {pct}%
            <Zap className="size-5 text-solar" fill="currentColor" />
          </p>
          <p className="mt-1 text-[11px] tracking-[0.16em] text-solar">CHARGING (AC)</p>
        </div>
      </div>
      <TileFoot />
    </div>
  );
}

export function SolarHomeGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3.5", className)}>
      <AnalogNumbered className="aspect-square min-h-[180px]" />
      <OnlineTile className="aspect-square min-h-[180px]" />
      <ActionsTile className="aspect-square min-h-[180px]" />
      <BatteryTile className="aspect-square min-h-[180px]" />
    </div>
  );
}
