export type ScreenId =
  | "home"
  | "devices"
  | "activity"
  | "files"
  | "ai"
  | "automations"
  | "settings"
  | "widgets"
  | "pantallas"
  | "solar";

export type DeviceKind = "laptop" | "phone" | "tablet" | "desktop";
export type Platform = "Windows" | "Android" | "Apple";
export type DeviceStatus = "online" | "offline";
export type DeviceFilter = "all" | Platform;

export type ActivityKind = "clipboard" | "ai" | "device" | "file" | "automation";

export interface Device {
  id: string;
  name: string;
  kind: DeviceKind;
  os: string;
  platform: Platform;
  status: DeviceStatus;
  latencyMs: number | null;
  lastSeenLabel: string;
  image: string;
  current?: boolean;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  kind: ActivityKind;
  minutesAgo: number;
}

export interface SyncedFile {
  id: string;
  name: string;
  kind: "doc" | "image" | "video" | "other";
  size: string;
  device: string;
  minutesAgo: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  when: string;
  action: string;
  enabled: boolean;
}

export interface WidgetLayout {
  style: "dark" | "light";
  wallpaper: string;
  lock: boolean;
  stats: boolean;
  device: boolean;
  actions: boolean;
}

export const WALLPAPERS = [
  { id: "lock", src: "/media/lock-barrantes.png", label: "Bloqueo" },
  { id: "home", src: "/media/home-barrantes.png", label: "Inicio" },
  { id: "silk", src: "/media/silk-tall.jpg", label: "Seda" },
  { id: "mist", src: "/media/wall-mist.jpg", label: "Niebla" },
  { id: "leaves", src: "/media/wall-leaves.jpg", label: "Hojas" },
  { id: "dunes", src: "/media/wall-dunes.jpg", label: "Dunas" },
  { id: "linen", src: "/media/wall-linen.jpg", label: "Lino" },
] as const;

export const NAV: { id: ScreenId; label: string; desktop?: boolean }[] = [
  { id: "home", label: "Inicio" },
  { id: "solar", label: "Relojes" },
  { id: "pantallas", label: "Pantallas" },
  { id: "settings", label: "Ajustes" },
];

export const MOBILE_TABS = ["home", "solar", "pantallas", "settings"] as const;

export function seedDevices(): Device[] {
  return [
    {
      id: "xiaomi-2312",
      name: "Xiaomi 2312",
      kind: "laptop",
      os: "Windows 11",
      platform: "Windows",
      status: "online",
      latencyMs: 12,
      lastSeenLabel: "Este dispositivo",
      image: "/media/device-laptop.jpg",
      current: true,
    },
    {
      id: "galaxy-s24",
      name: "Galaxy S24",
      kind: "phone",
      os: "Android 14",
      platform: "Android",
      status: "online",
      latencyMs: 28,
      lastSeenLabel: "Hace un momento",
      image: "/media/device-phone.jpg",
    },
    {
      id: "ipad-pro",
      name: "iPad Pro",
      kind: "tablet",
      os: "iPadOS 17",
      platform: "Apple",
      status: "offline",
      latencyMs: null,
      lastSeenLabel: "Hace 3 h",
      image: "/media/device-tablet.jpg",
    },
    {
      id: "oficina-desktop",
      name: "Oficina · Desktop",
      kind: "desktop",
      os: "Windows 11",
      platform: "Windows",
      status: "online",
      latencyMs: 16,
      lastSeenLabel: "En la oficina",
      image: "/media/device-desktop.jpg",
    },
  ];
}

export function seedActivity(): ActivityItem[] {
  return [
    {
      id: "a1",
      title: "Mensaje enviado al portapapeles",
      detail: "Xiaomi 2312",
      kind: "clipboard",
      minutesAgo: 2,
    },
    {
      id: "a2",
      title: "Resumen generado con IA",
      detail: "Notas de reunión",
      kind: "ai",
      minutesAgo: 12,
    },
    {
      id: "a3",
      title: "Dispositivo conectado",
      detail: "Galaxy S24",
      kind: "device",
      minutesAgo: 28,
    },
    {
      id: "a4",
      title: "Archivo sincronizado",
      detail: "Presentación_v3.pptx",
      kind: "file",
      minutesAgo: 60,
    },
    {
      id: "a5",
      title: "Regla de automatización ejecutada",
      detail: "Backup diario",
      kind: "automation",
      minutesAgo: 180,
    },
  ];
}

export function seedFiles(): SyncedFile[] {
  return [
    {
      id: "f1",
      name: "Presentación_v3.pptx",
      kind: "doc",
      size: "18 MB",
      device: "Xiaomi 2312",
      minutesAgo: 60,
    },
    {
      id: "f2",
      name: "Notas de reunión.md",
      kind: "doc",
      size: "24 KB",
      device: "Xiaomi 2312",
      minutesAgo: 12,
    },
    {
      id: "f3",
      name: "Malecón-dron.mov",
      kind: "video",
      size: "240 MB",
      device: "Galaxy S24",
      minutesAgo: 90,
    },
    {
      id: "f4",
      name: "Mockups-widgets.png",
      kind: "image",
      size: "4.2 MB",
      device: "iPad Pro",
      minutesAgo: 200,
    },
    {
      id: "f5",
      name: "Backup diario.zip",
      kind: "other",
      size: "816 MB",
      device: "Oficina · Desktop",
      minutesAgo: 180,
    },
  ];
}

export function seedAutomations(): AutomationRule[] {
  return [
    {
      id: "r1",
      name: "Portapapeles universal",
      when: "Al copiar texto",
      action: "Enviar a todos los dispositivos",
      enabled: true,
    },
    {
      id: "r2",
      name: "Aviso de desconexión",
      when: "Si un dispositivo se desconecta",
      action: "Notificar en el actual",
      enabled: true,
    },
    {
      id: "r3",
      name: "Backup nocturno",
      when: "Cada día a las 03:00",
      action: "Copiar cambios al escritorio",
      enabled: true,
    },
    {
      id: "r4",
      name: "Foco en reuniones",
      when: "Si el calendario marca ocupado",
      action: "Silenciar avisos no urgentes",
      enabled: false,
    },
  ];
}

export const EVENT_BARS = [4, 6, 5, 8, 7, 9, 11];
export const FILE_SPARK = [12, 14, 13, 18, 16, 21, 19, 24, 22, 28, 26, 31];
export const LATENCY_SPARK = [18, 16, 14, 15, 13, 12, 14, 11, 12, 10, 12, 12];
export const USAGE_BREAKDOWN = [
  { label: "Documentos", value: 42, color: "var(--color-primary)" },
  { label: "Imágenes", value: 28, color: "var(--color-ok)" },
  { label: "Vídeos", value: 20, color: "var(--color-warn)" },
  { label: "Otros", value: 10, color: "#64748b" },
];

export function kindLabel(kind: DeviceKind): string {
  switch (kind) {
    case "laptop":
      return "Portátil";
    case "phone":
      return "Móvil";
    case "tablet":
      return "Tablet";
    case "desktop":
      return "Escritorio";
  }
}

export function relativeLabel(minutesAgo: number): string {
  if (minutesAgo < 1) return "ahora";
  if (minutesAgo < 60) return `hace ${minutesAgo} min`;
  const hours = Math.round(minutesAgo / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.round(hours / 24);
  return `hace ${days} d`;
}
