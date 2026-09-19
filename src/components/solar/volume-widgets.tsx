import { Volume2, VolumeX } from "lucide-react";
import { InfinityMark } from "@/components/solar/analog-clock";
import { useSyncStore } from "@/lib/sync/store";
import { cn } from "@/lib/utils";

function useLaptopAudio() {
  const volume = useSyncStore((s) => s.laptopVolume);
  const muted = useSyncStore((s) => s.laptopMuted);
  const setVolume = useSyncStore((s) => s.setVolume);
  const toggleMute = useSyncStore((s) => s.toggleMute);
  const shown = muted ? 0 : volume;
  return { volume, muted, shown, setVolume, toggleMute };
}

function VolumeBar({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="relative flex h-7 items-center">
      <div className="pointer-events-none absolute inset-x-0 h-2 rounded-full bg-solar-fg/10">
        <div
          className="solar-fill h-full rounded-full bg-solar shadow-[0_0_12px_color-mix(in_srgb,var(--color-solar)_70%,transparent)]"
          style={{ width: `${value}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label="Volumen de la laptop"
        className="solar-slider relative z-10"
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function LevelMeters({ level }: { level: number }) {
  return (
    <div className="flex h-10 items-end justify-center gap-0.5">
      {Array.from({ length: 16 }, (_, i) => {
        const on = level > (i / 16) * 100;
        return (
          <span
            key={i}
            className={cn(
              "w-1.5 rounded-sm transition-colors duration-[var(--motion-quick)]",
              on ? "solar-meter-on bg-solar" : "bg-solar-fg/12",
            )}
            style={{ height: `${10 + i * 5}%`, animationDelay: `${i * 55}ms` }}
          />
        );
      })}
    </div>
  );
}

export function VolumeTile2x2({ className }: { className?: string }) {
  const { volume, shown, muted, setVolume, toggleMute } = useLaptopAudio();
  return (
    <div className={cn("solar-tile flex flex-col justify-between p-3.5", className)}>
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-medium tracking-[0.16em] text-solar-fg/55">
          LAPTOP
        </p>
        <button
          type="button"
          aria-label={muted ? "Activar audio" : "Silenciar"}
          onClick={toggleMute}
          className="flex size-8 items-center justify-center rounded-full bg-solar-fg/8 text-solar"
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
      </div>
      <p className="wq-pct text-[34px] font-semibold leading-none tabular-nums text-solar-fg">
        {muted ? "MUTE" : shown}
        {muted ? null : <span className="text-lg text-solar">%</span>}
      </p>
      <VolumeBar value={volume} onChange={setVolume} />
      <div className="wq-meters mt-2">
        <LevelMeters level={shown} />
      </div>
    </div>
  );
}

export function VolumeTileWide({ className }: { className?: string }) {
  const { volume, shown, muted, setVolume, toggleMute } = useLaptopAudio();
  return (
    <div className={cn("solar-tile flex flex-col justify-between p-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium tracking-[0.18em] text-solar-fg/55">
            LAPTOP VOLUME
          </p>
          <p className="mt-1 text-sm text-solar-fg/70">Barrantes Co.</p>
        </div>
        <p className="wq-pct text-[40px] font-semibold leading-none tabular-nums text-solar">
          {muted ? "MUTE" : `${shown}%`}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          aria-label={muted ? "Activar audio" : "Silenciar"}
          onClick={toggleMute}
          className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-solar text-oled"
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
        <VolumeBar value={volume} onChange={setVolume} />
      </div>
    </div>
  );
}

export function VolumeTile3x3({ className }: { className?: string }) {
  const { volume, shown, muted, setVolume, toggleMute } = useLaptopAudio();
  return (
    <div className={cn("solar-tile solar-glass solar-glass-volume flex flex-col p-4", className)}>
      <span className="solar-veil" aria-hidden="true" />
      <p className="text-[10px] font-semibold tracking-[0.2em] text-solar">
        LAPTOP VOLUME
      </p>
      <div className="mt-3 flex items-end justify-between">
        <p className="wq-pct text-[52px] font-semibold leading-none tabular-nums text-solar-fg">
          {muted ? "MUTE" : shown}
          {muted ? null : <span className="text-xl text-solar">%</span>}
        </p>
        <button
          type="button"
          onClick={toggleMute}
          className="mb-1 flex size-11 items-center justify-center rounded-2xl bg-white/10 text-solar backdrop-blur-sm"
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </div>
      <div className="mt-4">
        <LevelMeters level={shown} />
      </div>
      <div className="mt-4">
        <VolumeBar value={volume} onChange={setVolume} />
      </div>
      <p className="mt-auto pt-3 text-center text-[9px] font-medium tracking-[0.18em] text-solar-fg/45 wq-brand">
        SYNC ENGINE · by Barrantes Co.
      </p>
      <InfinityMark className="mx-auto mt-1 size-5 text-solar" />
    </div>
  );
}
