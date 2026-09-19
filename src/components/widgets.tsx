import type { ReactNode } from "react";
import { Check, Download, Moon, VolumeX } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LogoMark } from "@/components/logo";
import { Ring, SparkBars, SparkLine } from "@/components/charts";
import { EVENT_BARS, FILE_SPARK } from "@/lib/sync/model";
import { useSyncStore } from "@/lib/sync/store";
import { capitalize, cn } from "@/lib/utils";
import { useNow } from "@/hooks/use-now";

function WidgetShell({
  className,
  style,
  children,
}: {
  className?: string;
  style: "dark" | "light";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] p-4 text-left shadow-[var(--shadow-widget)]",
        style === "dark"
          ? "widget-glass text-widget-fg"
          : "widget-light text-fg shadow-[var(--shadow-border)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function StatsWidget({
  style = "dark",
  className,
}: {
  style?: "dark" | "light";
  className?: string;
}) {
  const health = useSyncStore((s) => s.health);
  const eventsToday = useSyncStore((s) => s.eventsToday);
  const filesSynced = useSyncStore((s) => s.filesSynced);
  const current = useSyncStore((s) => s.devices.find((d) => d.current));
  const muted = style === "dark" ? "text-widget-muted" : "text-muted";

  return (
    <WidgetShell style={style} className={cn("w-full max-w-[340px]", className)}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <LogoMark className="size-7" />
          <div>
            <p className="text-[11px] font-semibold tracking-wide">SYNC ENGINE</p>
            <p className="text-[9px] font-semibold tracking-[0.14em] text-[#00BFFF]">
              BARRANTES CO.
            </p>
            <p className={cn("flex items-center gap-1.5 text-[11px]", muted)}>
              <span className="size-1.5 rounded-full bg-ok" />
              En línea
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img
            src="/media/device-laptop.jpg"
            alt=""
            className="h-9 w-14 rounded-lg object-cover"
          />
          <div className="text-right">
            <p className="text-[11px] font-medium">{current?.name ?? "Xiaomi 2312"}</p>
            <p className={cn("text-[10px]", muted)}>
              {current?.latencyMs ?? 12} ms · Wi-Fi
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-2xl bg-sidebar-fg/6 p-2.5">
          <p className={cn("text-[10px]", muted)}>Sync</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">
            {health.toFixed(1)}%
          </p>
          <Ring value={health} size={36} stroke={4} className="mt-1" />
        </div>
        <div className="rounded-2xl bg-sidebar-fg/6 p-2.5">
          <p className={cn("text-[10px]", muted)}>Eventos hoy</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{eventsToday}</p>
          <SparkBars values={EVENT_BARS} className="mt-2 h-7" />
        </div>
        <div className="rounded-2xl bg-sidebar-fg/6 p-2.5">
          <p className={cn("text-[10px]", muted)}>Archivos</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">
            {filesSynced.toLocaleString("es-PE")}
          </p>
          <SparkLine values={FILE_SPARK} className="mt-1 h-7" />
        </div>
      </div>
    </WidgetShell>
  );
}

export function DeviceWidget({
  style = "dark",
  className,
}: {
  style?: "dark" | "light";
  className?: string;
}) {
  const current = useSyncStore((s) => s.devices.find((d) => d.current));
  const muted = style === "dark" ? "text-widget-muted" : "text-muted";
  return (
    <WidgetShell style={style} className={cn("aspect-square w-[168px]", className)}>
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2">
          <LogoMark className="size-6" />
          <div>
            <p className="text-[10px] font-semibold tracking-wide">SYNC ENGINE</p>
            <p className="text-[8px] font-semibold tracking-[0.12em] text-[#00BFFF]">
              BARRANTES CO.
            </p>
            <p className={cn("flex items-center gap-1 text-[10px]", muted)}>
              <span className="size-1.5 rounded-full bg-ok" />
              Conectado
            </p>
          </div>
        </div>
        <img
          src="/media/device-laptop.jpg"
          alt=""
          className="mt-3 h-16 w-full rounded-xl object-cover"
        />
        <p className={cn("mt-auto pt-2 text-[11px]", muted)}>
          {current?.latencyMs ?? 12} ms
        </p>
      </div>
    </WidgetShell>
  );
}

export function ActionsWidget({
  style = "dark",
  className,
}: {
  style?: "dark" | "light";
  className?: string;
}) {
  const muted = style === "dark" ? "text-widget-muted" : "text-muted";
  const items = [
    { id: "mute", label: "Mute", icon: VolumeX },
    { id: "sleep", label: "Sleep", icon: Moon },
    { id: "docs", label: "Docs", icon: Download },
  ];
  return (
    <WidgetShell style={style} className={cn("aspect-square w-[168px]", className)}>
      <div className="grid h-full grid-cols-3 gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center gap-1.5 rounded-2xl bg-sidebar-fg/6"
          >
            <item.icon className="size-4" />
            <span className={cn("text-[10px] font-medium", muted)}>{item.label}</span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

export function LockWidget({
  style = "dark",
  className,
}: {
  style?: "dark" | "light";
  className?: string;
}) {
  const now = useNow();
  const filesSynced = useSyncStore((s) => s.filesSynced);
  const muted = style === "dark" ? "text-widget-muted" : "text-muted";
  const date = capitalize(
    format(now, "EEEE, d 'de' MMMM", { locale: es }),
  );
  const time = format(now, "H:mm");

  return (
    <WidgetShell
      style={style}
      className={cn(
        "w-full max-w-[340px] bg-cover bg-center p-5",
        className,
      )}
    >
      <p className={cn("text-center text-sm", muted)}>{date}</p>
      <p className="mt-1 text-center font-sans text-6xl font-semibold tracking-tight tabular-nums">
        {time}
      </p>
      <div
        className={cn(
          "mt-6 flex items-start gap-3 rounded-2xl p-3",
          style === "dark" ? "bg-sidebar-fg/8" : "bg-fg/5",
        )}
      >
        <LogoMark className="size-8 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-semibold tracking-wide">SYNC ENGINE</p>
            <p className="text-[9px] font-semibold tracking-[0.14em] text-[#00BFFF]">
              BARRANTES CO.
            </p>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-ok text-primary-fg">
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            Sincronización completa
          </p>
          <p className={cn("mt-0.5 text-[11px]", muted)}>
            Xiaomi 2312 · {Math.min(filesSynced, 24)} archivos sincronizados
          </p>
        </div>
      </div>
    </WidgetShell>
  );
}

export function HealthHeroWidget({
  style = "light",
  className,
}: {
  style?: "dark" | "light";
  className?: string;
}) {
  const health = useSyncStore((s) => s.health);
  const muted = style === "dark" ? "text-widget-muted" : "text-muted";
  return (
    <WidgetShell style={style} className={cn("p-6", className)}>
      <p className={cn("text-xs font-medium uppercase tracking-[0.14em]", muted)}>
        Salud de sync
      </p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <p className="text-6xl font-semibold tracking-tight tabular-nums">
          {health.toFixed(1)}
        </p>
        <Ring value={health} size={72} stroke={7} />
      </div>
      <p className={cn("mt-3 text-sm", muted)}>Excelente · verificado ahora</p>
    </WidgetShell>
  );
}
