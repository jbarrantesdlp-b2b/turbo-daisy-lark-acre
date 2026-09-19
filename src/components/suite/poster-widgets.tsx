import { format } from "date-fns";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { EnergyHalo } from "@/components/suite/energy-halo";
import { useInstall } from "@/hooks/use-install";
import { useNow } from "@/hooks/use-now";
import { useOnline } from "@/hooks/use-online";
import { MEDIA_QUEUE, MEDIA_SOURCES, useSyncStore } from "@/lib/sync/store";
import { cn } from "@/lib/utils";

export function PosterWidgets() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#1a100c]">
      <img
        src="/media/home-barrantes.png"
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 flex min-h-dvh flex-col items-center px-5 pt-[11vh] pb-8">
        <ClockCard />
        <InstallHint />
      </div>
    </div>
  );
}

export function ClockCard() {
  const now = useNow(1000);
  const online = useOnline();
  const steps = useSyncStore((s) => s.phoneSteps);
  const temp = useSyncStore((s) => s.phoneTemp);

  return (
    <article className="bank-card mx-auto flex w-full max-w-[260px] flex-col items-center rounded-[28px] px-3.5 pb-3.5 pt-3 text-center">
      <div className="relative aspect-square w-full">
        <EnergyHalo />
        <div className="absolute inset-[14%] flex items-center justify-center">
          <p
            className="bank-num text-[58px] font-semibold leading-none tracking-[-0.07em] text-[#f4f4f4] sm:text-[64px]"
            suppressHydrationWarning
          >
            {format(now, "HH:mm")}
          </p>
        </div>
      </div>

      <div className={cn("mt-1.5 grid w-full grid-cols-2", !online && "opacity-55")}>
        <ClockStat
          emoji="👟"
          label="Pasos"
          value={steps == null ? "—" : steps.toLocaleString("es-PE")}
        />
        <ClockStat emoji="☀️" label="Clima" value={temp == null ? "—" : `${temp}°`} />
      </div>
      <p className="mt-1 min-h-[14px] text-[10px] tracking-wide text-[#8a8a8a]">
        {online ? "\u00a0" : "Sin conexión"}
      </p>
    </article>
  );
}

function ClockStat({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <p className="flex h-4 items-center justify-center gap-1 text-[11px] text-[#8a8a8a]">
        <span className="clock-emo" aria-hidden="true">
          {emoji}
        </span>
        {label}
      </p>
      <p className="mt-0.5 min-h-[22px] w-full text-center text-[18px] font-semibold tabular-nums tracking-tight">
        {value}
      </p>
    </div>
  );
}

function InstallHint() {
  const { canInstall, installed, install } = useInstall();

  if (installed) {
    return <p className="mt-5 text-center text-[12px] text-white/70">En el inicio del teléfono</p>;
  }

  if (canInstall) {
    return (
      <button
        type="button"
        onClick={() => void install()}
        className="mt-6 rounded-full bg-[#ff4a12] px-5 py-2.5 text-[13px] font-semibold text-white"
      >
        Instalar en el teléfono
      </button>
    );
  }

  return (
    <p className="mt-6 max-w-[34ch] text-center text-[12px] leading-relaxed text-white/75">
      Publica, ábrelo en Chrome del Android y pulsa ⋮ → Añadir a la pantalla de inicio.
    </p>
  );
}

function PlayingCard() {
  const index = useSyncStore((s) => s.mediaIndex);
  const playing = useSyncStore((s) => s.mediaPlaying);
  const source = useSyncStore((s) => s.mediaSource);
  const togglePlay = useSyncStore((s) => s.togglePlay);
  const skipTrack = useSyncStore((s) => s.skipTrack);
  const track = MEDIA_QUEUE[index] ?? MEDIA_QUEUE[0];
  const label = MEDIA_SOURCES.find((s) => s.id === source)?.label ?? "Spotify";

  return (
    <article className="bank-card flex items-center gap-4 rounded-[32px] px-5 py-[18px]">
      <button
        type="button"
        aria-label={playing ? "Pausar" : "Reproducir"}
        onClick={togglePlay}
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ff4a12] text-white"
      >
        {playing ? (
          <Pause className="size-5" fill="currentColor" />
        ) : (
          <Play className="size-5 translate-x-px" fill="currentColor" />
        )}
      </button>
      <button type="button" onClick={() => skipTrack(1)} className="min-w-0 flex-1 text-left">
        <p className="truncate text-[16px] font-semibold leading-tight">{track.title}</p>
        <p className="bank-muted mt-0.5 truncate text-[13px]">
          {track.artist} · {label}
        </p>
      </button>
    </article>
  );
}

function BrandCard() {
  const togglePlay = useSyncStore((s) => s.togglePlay);
  return (
    <article className="bank-card relative rounded-[40px] p-8 pb-[88px]">
      <p className="bank-muted text-[13px] font-medium">Sync Engine</p>
      <h2 className="mt-5 text-[36px] font-semibold leading-[1.06] tracking-[-0.038em] sm:text-[42px]">
        Energía
        <br />
        en movimiento
      </h2>
      <p className="bank-muted mt-5 max-w-[32ch] text-[14px] leading-[1.55]">
        Reloj, volumen y reproducción en el mismo cristal. Barrantes Co.
      </p>
      <button
        type="button"
        aria-label="Reproducir"
        onClick={togglePlay}
        className="absolute bottom-8 right-8 flex size-[56px] items-center justify-center rounded-full bg-white text-[#ff4a12]"
      >
        <ArrowUpRight className="size-6 translate-x-px" strokeWidth={2.5} />
      </button>
    </article>
  );
}

function VolumeCard({ className }: { className?: string }) {
  const volume = useSyncStore((s) => s.laptopVolume);
  const muted = useSyncStore((s) => s.laptopMuted);
  const setVolume = useSyncStore((s) => s.setVolume);
  const shown = muted ? 0 : volume;
  const active = Math.max(1, Math.round(shown / 10));

  return (
    <article className={cn("bank-card flex flex-col rounded-[40px] p-8", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-medium">Laptop</p>
        <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[12px] font-medium text-white/55">
          volume
        </span>
      </div>
      <p className="mt-4 flex items-baseline gap-2.5">
        <span className="bank-num text-[44px] font-semibold leading-none sm:text-[50px]">
          {shown}
        </span>
        <span className="bank-muted pb-1 text-[15px] font-medium">%</span>
      </p>
      <div
        className="mt-8 flex h-[120px] items-end justify-between gap-[6px]"
        onPointerDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const t = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
          setVolume(Math.round(t * 100));
        }}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const on = i < active;
          const hot = i === active - 1;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Volumen ${(i + 1) * 10}`}
              onClick={() => setVolume((i + 1) * 10)}
              className={cn(
                "bank-bar",
                !on && "opacity-[0.18]",
                hot && "bank-bar-hot",
              )}
              style={{
                height: `${36 + i * 7}%`,
                transform: hot ? "scaleY(1)" : undefined,
              }}
            />
          );
        })}
      </div>
      <div className="mt-auto flex items-end justify-between gap-3 pt-7 text-[11px] leading-none">
        <p className="bank-muted">{muted ? "Silenciado" : "Arrastra las barras"}</p>
        <p className="text-white/70">{shown === 0 ? "Mute" : "Active"}</p>
      </div>
    </article>
  );
}
