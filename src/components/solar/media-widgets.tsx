import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect } from "react";
import { InfinityMark } from "@/components/solar/analog-clock";
import { useNow } from "@/hooks/use-now";
import {
  MEDIA_QUEUE,
  MEDIA_SOURCES,
  useSyncStore,
} from "@/lib/sync/store";
import { cn } from "@/lib/utils";

function useMediaSession() {
  const source = useSyncStore((s) => s.mediaSource);
  const index = useSyncStore((s) => s.mediaIndex);
  const playing = useSyncStore((s) => s.mediaPlaying);
  const positionMs = useSyncStore((s) => s.mediaPositionMs);
  const startedAt = useSyncStore((s) => s.mediaStartedAt);
  const togglePlay = useSyncStore((s) => s.togglePlay);
  const skipTrack = useSyncStore((s) => s.skipTrack);
  const setMediaSource = useSyncStore((s) => s.setMediaSource);
  const seekMedia = useSyncStore((s) => s.seekMedia);
  const now = useNow(playing ? 200 : 30000);
  const track = MEDIA_QUEUE[index] ?? MEDIA_QUEUE[0];
  let elapsed = playing ? positionMs + (now.getTime() - startedAt) : positionMs;
  if (elapsed >= track.durationMs) {
    elapsed = elapsed % track.durationMs;
  }
  const progress = Math.min(1, elapsed / track.durationMs);
  const label = MEDIA_SOURCES.find((s) => s.id === source)?.label ?? "Spotify";
  useEffect(() => {
    if (!playing) return;
    const remaining = track.durationMs - (positionMs + (Date.now() - startedAt));
    const id = window.setTimeout(() => skipTrack(1), Math.max(80, remaining));
    return () => window.clearTimeout(id);
  }, [playing, index, positionMs, startedAt, track.durationMs, skipTrack]);
  return {
    track,
    source,
    label,
    playing,
    elapsed,
    progress,
    togglePlay,
    skipTrack,
    setMediaSource,
    seekMedia,
  };
}

function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function Cover({
  hue,
  playing,
  className,
}: {
  hue: number;
  playing: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.35)]",
        playing && "solar-pulse",
        className,
      )}
      style={{
        background: `conic-gradient(from 210deg, hsl(${hue} 72% 48%), hsl(${(hue + 40) % 360} 60% 22%), hsl(${hue} 72% 48%))`,
      }}
    >
      <span className="absolute inset-[18%] rounded-full border border-white/25" />
      <span className="absolute inset-[38%] rounded-full bg-oled/80" />
    </div>
  );
}

function Transport({
  playing,
  onPlay,
  onSkip,
  size = "md",
}: {
  playing: boolean;
  onPlay: () => void;
  onSkip: (dir: 1 | -1) => void;
  size?: "sm" | "md";
}) {
  const icon = size === "sm" ? "size-4" : "size-5";
  const btn = size === "sm" ? "size-9" : "size-11";
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => onSkip(-1)}
        className={cn(btn, "flex items-center justify-center text-solar-fg/70 active:scale-[0.96]")}
      >
        <SkipBack className={icon} />
      </button>
      <button
        type="button"
        aria-label={playing ? "Pausa" : "Reproducir"}
        onClick={onPlay}
        className={cn(
          btn,
          "flex items-center justify-center rounded-full bg-solar text-oled active:scale-[0.96]",
        )}
      >
        {playing ? <Pause className={icon} /> : <Play className={cn(icon, "translate-x-px")} />}
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => onSkip(1)}
        className={cn(btn, "flex items-center justify-center text-solar-fg/70 active:scale-[0.96]")}
      >
        <SkipForward className={icon} />
      </button>
    </div>
  );
}

export function MediaTile2x2({ className }: { className?: string }) {
  const { track, label, playing, progress, togglePlay, skipTrack } = useMediaSession();
  return (
    <div className={cn("solar-tile flex flex-col p-3.5", className)}>
      <p className="text-[10px] font-semibold tracking-[0.18em] text-solar">{label.toUpperCase()}</p>
      <Cover hue={track.hue} playing={playing} className="mx-auto mt-2 w-[48%]" />
      <p className="wq-title mt-2 truncate text-sm font-semibold text-solar-fg">{track.title}</p>
      <p className="truncate text-[11px] text-solar-fg/50">{track.artist}</p>
      <div className="mt-auto pt-2">
        <div className="mb-2 h-1 overflow-hidden rounded-full bg-solar-fg/10">
          <div className="solar-fill h-full bg-solar" style={{ width: `${progress * 100}%` }} />
        </div>
        <Transport playing={playing} onPlay={togglePlay} onSkip={skipTrack} size="sm" />
      </div>
    </div>
  );
}

export function MediaTileWide({ className }: { className?: string }) {
  const {
    track,
    label,
    playing,
    elapsed,
    progress,
    togglePlay,
    skipTrack,
    setMediaSource,
    source,
  } = useMediaSession();
  return (
    <div className={cn("solar-tile flex gap-3 p-3.5", className)}>
      <Cover hue={track.hue} playing={playing} className="w-[88px] shrink-0" />
      <div className="flex min-w-0 flex-1 flex-col">
        <button
          type="button"
          onClick={() => {
            const i = MEDIA_SOURCES.findIndex((s) => s.id === source);
            const next = MEDIA_SOURCES[(i + 1) % MEDIA_SOURCES.length];
            if (next) setMediaSource(next.id);
          }}
          className="self-start text-[10px] font-semibold tracking-[0.18em] text-solar"
        >
          {label.toUpperCase()} · SESIÓN
        </button>
        <p className="wq-title mt-1 truncate text-base font-semibold text-solar-fg">{track.title}</p>
        <p className="truncate text-xs text-solar-fg/50">{track.artist}</p>
        <div className="mt-auto">
          <div className="h-1 overflow-hidden rounded-full bg-solar-fg/10">
            <div className="solar-fill h-full bg-solar" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[9px] tabular-nums text-solar-fg/40">
            <span>{fmt(elapsed)}</span>
            <span>{fmt(track.durationMs)}</span>
          </div>
          <Transport playing={playing} onPlay={togglePlay} onSkip={skipTrack} size="sm" />
        </div>
      </div>
    </div>
  );
}

export function MediaTile3x3({ className }: { className?: string }) {
  const { track, label, playing, elapsed, progress, togglePlay, skipTrack } = useMediaSession();
  return (
    <div className={cn("solar-tile flex flex-col p-4", className)}>
      <p className="text-[10px] font-semibold tracking-[0.2em] text-solar">
        {label.toUpperCase()} · NOW PLAYING
      </p>
      <div className="mx-auto mt-3 aspect-square w-[58%]">
        <Cover hue={track.hue} playing={playing} className="w-full" />
      </div>
      <p className="mt-3 truncate text-center text-lg font-semibold text-solar-fg wq-title">{track.title}</p>
      <p className="truncate text-center text-sm text-solar-fg/50">{track.artist}</p>
      <div className="mt-3">
        <div className="h-1.5 overflow-hidden rounded-full bg-solar-fg/10">
          <div className="solar-fill h-full bg-solar" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="mt-1 flex justify-between text-[10px] tabular-nums text-solar-fg/40">
          <span>{fmt(elapsed)}</span>
          <span>{fmt(track.durationMs)}</span>
        </div>
      </div>
      <div className="mt-2">
        <Transport playing={playing} onPlay={togglePlay} onSkip={skipTrack} />
      </div>
      <p className="mt-auto pt-2 text-center text-[9px] tracking-[0.16em] text-solar-fg/40 wq-brand">
        SYNC ENGINE · by Barrantes Co.
      </p>
      <InfinityMark className="mx-auto size-5 text-solar" />
    </div>
  );
}
