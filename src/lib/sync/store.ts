import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { uid } from "@/lib/utils";
import {
  seedActivity,
  seedAutomations,
  seedDevices,
  seedFiles,
  type ActivityItem,
  type AutomationRule,
  type Device,
  type DeviceFilter,
  type DeviceKind,
  type ScreenId,
  type SyncedFile,
  type WidgetLayout,
} from "@/lib/sync/model";

export type MediaSource = "spotify" | "ytmusic" | "local";

export interface MediaTrack {
  title: string;
  artist: string;
  durationMs: number;
  hue: number;
}

export const MEDIA_QUEUE: MediaTrack[] = [
  { title: "Midnight City", artist: "M83", durationMs: 241000, hue: 28 },
  { title: "Blinding Lights", artist: "The Weeknd", durationMs: 200000, hue: 350 },
  { title: "Nude", artist: "Radiohead", durationMs: 255000, hue: 42 },
  { title: "Electric Feel", artist: "MGMT", durationMs: 229000, hue: 168 },
];

export const MEDIA_SOURCES: { id: MediaSource; label: string }[] = [
  { id: "spotify", label: "Spotify" },
  { id: "ytmusic", label: "YT Music" },
  { id: "local", label: "Teléfono" },
];

const KIND_DEFAULTS: Record<
  DeviceKind,
  { os: string; platform: Device["platform"]; image: string }
> = {
  laptop: { os: "Windows 11", platform: "Windows", image: "/media/device-laptop.jpg" },
  phone: { os: "Android 14", platform: "Android", image: "/media/device-phone.jpg" },
  tablet: { os: "iPadOS 17", platform: "Apple", image: "/media/device-tablet.jpg" },
  desktop: { os: "Windows 11", platform: "Windows", image: "/media/device-desktop.jpg" },
};

export interface SyncState {
  displayName: string;
  screen: ScreenId;
  search: string;
  deviceFilter: DeviceFilter;
  selectedDeviceId: string | null;
  devices: Device[];
  activity: ActivityItem[];
  files: SyncedFile[];
  automations: AutomationRule[];
  health: number;
  filesSynced: number;
  eventsToday: number;
  usageMb: number;
  syncing: boolean;
  lastSyncAt: number;
  widget: WidgetLayout;
  notifyOpen: boolean;
  laptopVolume: number;
  laptopMuted: boolean;
  mediaSource: MediaSource;
  mediaIndex: number;
  mediaPlaying: boolean;
  mediaPositionMs: number;
  mediaStartedAt: number;
  phoneSteps: number | null;
  phoneTemp: number | null;
  setScreen: (screen: ScreenId) => void;
  setSearch: (search: string) => void;
  setDeviceFilter: (filter: DeviceFilter) => void;
  selectDevice: (id: string | null) => void;
  setName: (displayName: string) => void;
  setWidget: (patch: Partial<WidgetLayout>) => void;
  setNotifyOpen: (open: boolean) => void;
  toggleAutomation: (id: string) => void;
  addDevice: (name: string, kind: DeviceKind) => void;
  removeDevice: (id: string) => void;
  copyClipboard: () => Promise<void>;
  syncNow: () => void;
  askAi: (prompt?: string) => void;
  setVolume: (laptopVolume: number) => void;
  toggleMute: () => void;
  setMediaSource: (mediaSource: MediaSource) => void;
  togglePlay: () => void;
  skipTrack: (dir: 1 | -1) => void;
  seekMedia: (mediaPositionMs: number) => void;
  setPhoneSteps: (phoneSteps: number | null) => void;
  setPhoneTemp: (phoneTemp: number | null) => void;
  resetDemo: () => void;
}

const initial = {
  displayName: "Jose",
  screen: "home" as ScreenId,
  search: "",
  deviceFilter: "all" as DeviceFilter,
  selectedDeviceId: "xiaomi-2312",
  devices: seedDevices(),
  activity: seedActivity(),
  files: seedFiles(),
  automations: seedAutomations(),
  health: 99.8,
  filesSynced: 1842,
  eventsToday: 24,
  usageMb: 816,
  syncing: false,
  lastSyncAt: Date.now() - 2 * 60 * 1000,
  widget: {
    style: "dark" as const,
    wallpaper: "/media/lock-barrantes.png",
    lock: true,
    stats: true,
    device: true,
    actions: true,
  },
  notifyOpen: false,
  laptopVolume: 72,
  laptopMuted: false,
  mediaSource: "spotify" as MediaSource,
  mediaIndex: 0,
  mediaPlaying: false,
  mediaPositionMs: 42000,
  mediaStartedAt: Date.now(),
  phoneSteps: null as number | null,
  phoneTemp: null as number | null,
};

function pushActivity(
  list: ActivityItem[],
  item: Omit<ActivityItem, "id" | "minutesAgo">,
): ActivityItem[] {
  return [
    { ...item, id: uid("act"), minutesAgo: 0 },
    ...list,
  ].slice(0, 20);
}

function wrapIndex(i: number) {
  const n = MEDIA_QUEUE.length;
  return ((i % n) + n) % n;
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set, get) => ({
      ...initial,
      setScreen: (screen) => set({ screen, notifyOpen: false }),
      setSearch: (search) => set({ search }),
      setDeviceFilter: (deviceFilter) => set({ deviceFilter }),
      selectDevice: (selectedDeviceId) => set({ selectedDeviceId }),
      setName: (displayName) => set({ displayName }),
      setWidget: (patch) => set({ widget: { ...get().widget, ...patch } }),
      setNotifyOpen: (notifyOpen) => set({ notifyOpen }),
      toggleAutomation: (id) =>
        set({
          automations: get().automations.map((rule) =>
            rule.id === id ? { ...rule, enabled: !rule.enabled } : rule,
          ),
        }),
      addDevice: (name, kind) => {
        const defaults = KIND_DEFAULTS[kind];
        const device: Device = {
          id: uid("dev"),
          name: name.trim() || `Nuevo ${kind}`,
          kind,
          os: defaults.os,
          platform: defaults.platform,
          status: "online",
          latencyMs: 18,
          lastSeenLabel: "Recién añadido",
          image: defaults.image,
        };
        set({
          devices: [device, ...get().devices],
          selectedDeviceId: device.id,
          activity: pushActivity(get().activity, {
            title: "Dispositivo conectado",
            detail: device.name,
            kind: "device",
          }),
        });
        toast.success(`${device.name} está en línea`);
      },
      removeDevice: (id) => {
        set({
          devices: get().devices.filter((d) => d.id !== id),
          selectedDeviceId:
            get().selectedDeviceId === id
              ? (get().devices.find((d) => d.id !== id)?.id ?? null)
              : get().selectedDeviceId,
        });
      },
      copyClipboard: async () => {
        const text = "Sync Engine · Barrantes Co.";
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          /* preview may block clipboard */
        }
        set({
          activity: pushActivity(get().activity, {
            title: "Mensaje enviado al portapapeles",
            detail: get().devices.find((d) => d.current)?.name ?? "Este dispositivo",
            kind: "clipboard",
          }),
        });
        toast.success("Copiado al portapapeles");
      },
      syncNow: () => {
        if (get().syncing) return;
        set({ syncing: true });
        window.setTimeout(() => {
          set({
            syncing: false,
            lastSyncAt: Date.now(),
            filesSynced: get().filesSynced + 3,
            activity: pushActivity(get().activity, {
              title: "Archivo sincronizado",
              detail: "3 archivos",
              kind: "file",
            }),
          });
          toast.success("Sincronización completa");
        }, 1100);
      },
      askAi: (prompt) => {
        set({
          screen: "ai",
          activity: pushActivity(get().activity, {
            title: "Resumen generado con IA",
            detail: prompt?.slice(0, 42) || "Estado de la flota",
            kind: "ai",
          }),
        });
      },
      setVolume: (raw) => {
        const laptopVolume = Math.max(0, Math.min(100, Math.round(raw)));
        set({
          laptopVolume,
          laptopMuted: laptopVolume === 0,
        });
      },
      toggleMute: () => {
        set({ laptopMuted: !get().laptopMuted });
      },
      setMediaSource: (mediaSource) => set({ mediaSource }),
      togglePlay: () => {
        const { mediaPlaying, mediaPositionMs, mediaStartedAt } = get();
        if (mediaPlaying) {
          set({
            mediaPlaying: false,
            mediaPositionMs: mediaPositionMs + (Date.now() - mediaStartedAt),
          });
        } else {
          set({ mediaPlaying: true, mediaStartedAt: Date.now() });
        }
      },
      skipTrack: (dir) => {
        set({
          mediaIndex: wrapIndex(get().mediaIndex + dir),
          mediaPositionMs: 0,
          mediaStartedAt: Date.now(),
        });
      },
      seekMedia: (mediaPositionMs) =>
        set({
          mediaPositionMs: Math.max(0, mediaPositionMs),
          mediaStartedAt: Date.now(),
        }),
      setPhoneSteps: (phoneSteps) => set({ phoneSteps }),
      setPhoneTemp: (phoneTemp) => set({ phoneTemp }),
      resetDemo: () => {
        set({ ...initial, lastSyncAt: Date.now() });
        toast("Demo restablecida");
      },
    }),
    {
      name: "sync-engine-v3",
      partialize: (state) => ({
        displayName: state.displayName,
        devices: state.devices,
        automations: state.automations,
        widget: state.widget,
        laptopVolume: state.laptopVolume,
        laptopMuted: state.laptopMuted,
        mediaSource: state.mediaSource,
        mediaIndex: state.mediaIndex,
        phoneSteps: state.phoneSteps,
        phoneTemp: state.phoneTemp,
        health: state.health,
        filesSynced: state.filesSynced,
        eventsToday: state.eventsToday,
        usageMb: state.usageMb,
      }),
    },
  ),
);
