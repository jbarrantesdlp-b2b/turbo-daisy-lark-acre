import {
  Bell,
  Clipboard,
  Cloud,
  FileText,
  Folder,
  Image as ImageIcon,
  LayoutGrid,
  MoreHorizontal,
  Sparkles,
  Video,
} from "lucide-react";
import { Ring, SparkBars, SparkLine } from "@/components/charts";
import {
  EVENT_BARS,
  FILE_SPARK,
  type ActivityItem,
  type Device,
  type SyncedFile,
  relativeLabel,
} from "@/lib/sync/model";
import { useSyncStore } from "@/lib/sync/store";
import { cn } from "@/lib/utils";

export function StatusDot({ online }: { online: boolean }) {
  return (
    <span
      className={cn(
        "inline-block size-2 rounded-full",
        online ? "bg-ok" : "bg-subtle",
      )}
    />
  );
}

export function DeviceHero({ compact = false }: { compact?: boolean }) {
  const device = useSyncStore((s) => s.devices.find((d) => d.current));
  const setScreen = useSyncStore((s) => s.setScreen);
  const selectDevice = useSyncStore((s) => s.selectDevice);
  if (!device) return null;

  return (
    <section className="overflow-hidden rounded-[28px] bg-sidebar text-sidebar-fg shadow-[var(--shadow-border)]">
      <div
        className={cn(
          "grid items-center gap-4 p-4 sm:p-5",
          compact ? "grid-cols-1" : "md:grid-cols-[1.1fr_0.9fr]",
        )}
      >
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-sidebar-muted">
            Dispositivo actual
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-ok">
            <StatusDot online />
            Conectado
          </div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight">
            {device.name}
          </h2>
          <p className="mt-1 text-sm text-sidebar-muted">
            {device.os} · Wi-Fi · {device.latencyMs} ms de latencia
          </p>
          {!compact ? (
            <button
              type="button"
              className="mt-4 h-9 rounded-full bg-sidebar-fg/10 px-4 text-sm font-medium text-sidebar-fg transition-colors duration-[var(--motion-quick)] hover:bg-sidebar-fg/16"
              onClick={() => {
                selectDevice(device.id);
                setScreen("devices");
              }}
            >
              Ver detalles
            </button>
          ) : null}
        </div>
        <img
          src={device.image}
          alt={device.name}
          className="h-36 w-full rounded-2xl object-cover sm:h-40"
        />
      </div>
    </section>
  );
}

export function StatCards() {
  const health = useSyncStore((s) => s.health);
  const eventsToday = useSyncStore((s) => s.eventsToday);
  const filesSynced = useSyncStore((s) => s.filesSynced);

  const cards = [
    {
      label: "Salud de sync",
      value: `${health.toFixed(1)}%`,
      hint: "Uptime saludable",
      extra: <Ring value={health} size={52} stroke={5} />,
    },
    {
      label: "Actividad reciente",
      value: String(eventsToday),
      hint: "eventos hoy",
      extra: <SparkBars values={EVENT_BARS} className="h-9 w-24" />,
    },
    {
      label: "Archivos sincronizados",
      value: filesSynced.toLocaleString("es-PE"),
      hint: "este mes",
      extra: <SparkLine values={FILE_SPARK} className="h-9 w-28" />,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className="flex items-center justify-between gap-3 rounded-[24px] bg-surface p-4 shadow-[var(--shadow-border)]"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-muted">{card.hint}</p>
          </div>
          {card.extra}
        </article>
      ))}
    </div>
  );
}

export function QuickActions({ dense = false }: { dense?: boolean }) {
  const copyClipboard = useSyncStore((s) => s.copyClipboard);
  const syncNow = useSyncStore((s) => s.syncNow);
  const syncing = useSyncStore((s) => s.syncing);
  const askAi = useSyncStore((s) => s.askAi);
  const setScreen = useSyncStore((s) => s.setScreen);

  const actions = [
    {
      id: "clip",
      label: "Enviar al portapapeles",
      hint: "Entre dispositivos",
      icon: Folder,
      primary: true,
      onClick: () => void copyClipboard(),
    },
    {
      id: "sync",
      label: syncing ? "Sincronizando…" : "Sincronizar ahora",
      hint: "Archivos pendientes",
      icon: Cloud,
      onClick: syncNow,
    },
    {
      id: "ai",
      label: "Ask AI",
      hint: "Resumir / Analizar",
      icon: Sparkles,
      onClick: () => askAi("Resumir el estado de mis dispositivos"),
    },
    {
      id: "auto",
      label: "Automatizaciones",
      hint: "Crear nueva regla",
      icon: LayoutGrid,
      onClick: () => setScreen("automations"),
    },
  ];

  return (
    <div className={cn("grid gap-3", dense ? "grid-cols-2" : "grid-cols-2")}>
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={action.onClick}
          className={cn(
            "flex min-h-24 flex-col items-start rounded-[22px] p-4 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] active:scale-[0.98]",
            action.primary
              ? "bg-primary text-primary-fg"
              : "bg-surface text-fg hover:shadow-[var(--shadow-border-hover)]",
          )}
        >
          <action.icon className="size-5" />
          <span className="mt-3 text-sm font-semibold">{action.label}</span>
          <span
            className={cn(
              "mt-0.5 text-xs",
              action.primary ? "text-primary-fg/80" : "text-muted",
            )}
          >
            {action.hint}
          </span>
        </button>
      ))}
    </div>
  );
}

const ACTIVITY_ICON: Record<ActivityItem["kind"], typeof Bell> = {
  clipboard: Clipboard,
  ai: Sparkles,
  device: Cloud,
  file: FileText,
  automation: LayoutGrid,
};

export function ActivityList({
  items,
  limit,
}: {
  items: ActivityItem[];
  limit?: number;
}) {
  const visible = limit ? items.slice(0, limit) : items;
  if (visible.length === 0) {
    return (
      <p className="px-2 py-8 text-center text-sm text-muted">
        No hay actividad todavía.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-border">
      {visible.map((item) => {
        const Icon = ACTIVITY_ICON[item.kind];
        return (
          <li key={item.id} className="flex items-center gap-3 py-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.title}</p>
              <p className="truncate text-xs text-muted">
                {item.detail} · {relativeLabel(item.minutesAgo)}
              </p>
            </div>
            <MoreHorizontal className="size-4 text-subtle" />
          </li>
        );
      })}
    </ul>
  );
}

export function DeviceRow({
  device,
  selected,
  onSelect,
}: {
  device: Device;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-[22px] p-3 text-left transition-colors duration-[var(--motion-quick)]",
        selected ? "bg-primary-soft" : "hover:bg-bg",
      )}
    >
      <img
        src={device.image}
        alt=""
        className="size-14 rounded-2xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <StatusDot online={device.status === "online"} />
          {device.name}
        </p>
        <p className="mt-0.5 text-xs text-muted">
          {device.status === "online" ? "Conectado" : "Sin conexión"}
          {" · "}
          {device.os}
          {device.latencyMs != null ? ` · ${device.latencyMs} ms` : ` · ${device.lastSeenLabel}`}
        </p>
      </div>
    </button>
  );
}

const FILE_ICON = {
  doc: FileText,
  image: ImageIcon,
  video: Video,
  other: Folder,
} as const;

export function FileRow({ file }: { file: SyncedFile }) {
  const Icon = FILE_ICON[file.kind];
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="flex size-10 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted">
          {file.size} · {file.device} · {relativeLabel(file.minutesAgo)}
        </p>
      </div>
    </div>
  );
}
