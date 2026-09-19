import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { HomePhone, LockPhone } from "@/components/phone-lock-home";
import { WALLPAPERS } from "@/lib/sync/model";
import { PosterWidgets } from "@/components/suite/poster-widgets";
import { SolarDashboard, SolarMobileHome } from "@/components/solar/dashboard";
import { useSyncStore } from "@/lib/sync/store";
import { cn } from "@/lib/utils";

export function HomeScreen(_props?: { variant?: "mobile" | "desktop" }) {
  return <PosterWidgets />;
}

export function DevicesScreen() {
  return <SolarDashboard />;
}

export function ActivityScreen() {
  return null;
}

export function FilesScreen() {
  return null;
}

export function AiScreen() {
  return null;
}

export function AutomationsScreen() {
  const automations = useSyncStore((s) => s.automations);
  const toggle = useSyncStore((s) => s.toggleAutomation);
  return (
    <div className="px-4 py-4 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Automatizaciones</h1>
      <p className="mt-1 text-sm text-muted">
        Reglas que corren entre portátil, móvil y escritorio.
      </p>
      <ul className="mt-4 space-y-3">
        {automations.map((rule) => (
          <li
            key={rule.id}
            className="flex items-center gap-3 rounded-[24px] bg-surface p-4 shadow-[var(--shadow-border)]"
          >
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{rule.name}</p>
              <p className="text-sm text-muted">
                {rule.when} · {rule.action}
              </p>
            </div>
            <Switch
              checked={rule.enabled}
              onCheckedChange={() => toggle(rule.id)}
              aria-label={`Activar ${rule.name}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SettingsScreen() {
  const name = useSyncStore((s) => s.displayName);
  const setName = useSyncStore((s) => s.setName);
  const resetDemo = useSyncStore((s) => s.resetDemo);
  return (
    <div className="px-4 py-4 text-solar-fg lg:max-w-xl lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Ajustes</h1>
      <label className="mt-6 block text-sm font-medium">
        Cómo te llamamos
        <Input
          className="mt-1.5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <Button variant="secondary" className="mt-8" onClick={resetDemo}>
        Restablecer demo
      </Button>
    </div>
  );
}

export function WidgetsScreen() {
  return <PantallasScreen />;
}

export function PantallasScreen() {
  const setScreen = useSyncStore((s) => s.setScreen);
  const widget = useSyncStore((s) => s.widget);
  const setWidget = useSyncStore((s) => s.setWidget);

  return (
    <div className="min-h-full bg-oled text-solar-fg">
      <div className="px-4 py-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-solar">
          Barrantes Co.
        </p>
        <h1 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight">
          Pantalla de bloqueo e inicio
        </h1>
        <p className="mt-2 max-w-lg text-sm text-solar-fg/50">
          Fondos OLED y el acceso a los widgets.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {(["dark", "light"] as const).map((item) => (
            <Button
              key={item}
              variant={widget.style === item ? "default" : "secondary"}
              onClick={() => setWidget({ style: item })}
            >
              {item === "dark" ? "Cristal oscuro" : "Cristal claro"}
            </Button>
          ))}
          <Button variant="secondary" onClick={() => setScreen("home")}>
            Widgets
          </Button>
        </div>
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {WALLPAPERS.map((paper) => (
            <button
              key={paper.id}
              type="button"
              onClick={() => setWidget({ wallpaper: paper.src })}
              className={cn(
                "shrink-0 overflow-hidden rounded-2xl ring-2 ring-transparent",
                widget.wallpaper === paper.src && "ring-primary",
              )}
            >
              <img src={paper.src} alt={paper.label} className="h-24 w-16 object-cover" />
            </button>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
          <figure>
            <LockPhone />
            <figcaption className="mt-3 text-center text-xs tracking-[0.16em] text-solar-fg/45">
              BLOQUEO
            </figcaption>
          </figure>
          <figure>
            <HomePhone />
            <figcaption className="mt-3 text-center text-xs tracking-[0.16em] text-solar-fg/45">
              INICIO
            </figcaption>
          </figure>
        </div>
        <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
          <a
            href="/media/lock-barrantes.png"
            download="sync-engine-bloqueo-barrantes.png"
            className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-solar text-sm font-semibold text-oled"
          >
            Descargar bloqueo
          </a>
          <a
            href="/media/home-barrantes.png"
            download="sync-engine-inicio-barrantes.png"
            className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-sidebar-line text-sm font-semibold"
          >
            Descargar inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export function NotificationsPanel() {
  const open = useSyncStore((s) => s.notifyOpen);
  const setOpen = useSyncStore((s) => s.setNotifyOpen);
  if (!open) return null;
  return (
    <div className="absolute right-4 top-16 z-30 w-80 rounded-[24px] bg-surface p-3 shadow-[var(--shadow-border)]">
      <div className="mb-2 flex items-center justify-between px-1">
        <p className="text-sm font-semibold">Avisos</p>
        <button type="button" className="text-xs text-muted" onClick={() => setOpen(false)}>
          Cerrar
        </button>
      </div>
      <p className="rounded-2xl bg-ok-soft p-3 text-sm text-fg">Sincronización activa.</p>
    </div>
  );
}

export function HeaderActions() {
  const notifyOpen = useSyncStore((s) => s.notifyOpen);
  const setNotifyOpen = useSyncStore((s) => s.setNotifyOpen);
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Notificaciones"
        onClick={() => setNotifyOpen(!notifyOpen)}
      >
        <Bell className="size-5" />
      </Button>
    </div>
  );
}

export function SearchBar() {
  const search = useSyncStore((s) => s.search);
  const setSearch = useSyncStore((s) => s.setSearch);
  return (
    <label className="relative hidden min-w-64 flex-1 lg:block">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar…"
        className="h-11 rounded-full border-transparent bg-surface pl-10 shadow-[var(--shadow-border)]"
      />
    </label>
  );
}
