import { useEffect, useState } from "react";
import { Clock, House, Menu, Settings, Smartphone, X } from "lucide-react";
import { Wordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  HomeScreen,
  NotificationsPanel,
  PantallasScreen,
  SettingsScreen,
} from "@/components/screens";
import { PosterWidgets } from "@/components/suite/poster-widgets";
import { SolarStudio } from "@/components/solar/studio";
import { NAV, MOBILE_TABS, type ScreenId } from "@/lib/sync/model";
import { useSyncStore } from "@/lib/sync/store";
import { cn } from "@/lib/utils";

const TAB_ICON = {
  home: House,
  solar: Clock,
  pantallas: Smartphone,
  settings: Settings,
} as const;

function ScreenBody({ variant }: { variant: "mobile" | "desktop" }) {
  const screen = useSyncStore((s) => s.screen);
  switch (screen) {
    case "home":
    case "devices":
    case "activity":
    case "files":
    case "ai":
    case "automations":
    case "widgets":
      return <HomeScreen variant={variant} />;
    case "settings":
      return <SettingsScreen />;
    case "pantallas":
      return <PantallasScreen />;
    case "solar":
      return <SolarStudio />;
    default:
      return <HomeScreen variant={variant} />;
  }
}

export function App() {
  useEffect(() => {
    const vista = new URLSearchParams(window.location.search).get("vista");
    const allowed: ScreenId[] = ["home", "solar", "pantallas", "settings"];
    if (vista && allowed.includes(vista as ScreenId)) {
      useSyncStore.getState().setScreen(vista as ScreenId);
    } else {
      useSyncStore.getState().setScreen("home");
    }
  }, []);

  const screen = useSyncStore((s) => s.screen);
  if (screen === "home" || screen === "widgets") {
    return <PosterWidgets />;
  }

  return (
    <>
      <div className="hidden min-h-dvh w-full lg:flex">
        <DesktopShell />
      </div>
      <div className="flex min-h-dvh w-full flex-col lg:hidden">
        <MobileShell />
      </div>
    </>
  );
}

function DesktopShell() {
  const screen = useSyncStore((s) => s.screen);
  const setScreen = useSyncStore((s) => s.setScreen);

  return (
    <div className="flex min-h-dvh w-full bg-oled text-solar-fg">
      <aside className="flex w-[220px] shrink-0 flex-col border-r border-solar/15 bg-sidebar px-3 py-5">
        <div className="px-2">
          <Wordmark inverted />
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setScreen(item.id)}
              className={cn(
                "flex h-11 items-center rounded-[14px] px-3 text-sm font-medium",
                screen === item.id
                  ? "bg-solar text-oled"
                  : "text-solar-fg/55 hover:bg-solar/10 hover:text-solar-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="rounded-2xl border border-solar/25 p-3">
          <p className="flex items-center gap-2 text-xs font-medium text-solar">
            <span className="size-2 rounded-full bg-solar" />
            Sincronización activa
          </p>
        </div>
        <p className="mt-4 px-2 text-[11px] tracking-[0.14em] text-solar-fg/35">
          SUITE SOLAR
        </p>
      </aside>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <NotificationsPanel />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <ScreenBody variant="desktop" />
        </main>
      </div>
    </div>
  );
}

function MobileShell() {
  const screen = useSyncStore((s) => s.screen);
  const setScreen = useSyncStore((s) => s.setScreen);
  const [menu, setMenu] = useState(false);

  return (
    <div className="relative flex min-h-dvh w-full flex-col bg-oled text-solar-fg">
      <header className="relative z-10 flex items-center justify-between px-2 pt-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Menú"
          className="text-solar-fg"
          onClick={() => setMenu(true)}
        >
          <Menu className="size-5" />
        </Button>
        <Wordmark inverted />
        <span className="w-10" />
        <NotificationsPanel />
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto pb-24">
        <ScreenBody variant="mobile" />
      </main>
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-solar/20 bg-oled/95 px-2 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md">
        <ul className="grid grid-cols-4">
          {MOBILE_TABS.map((id) => {
            const Icon = TAB_ICON[id];
            const label = NAV.find((n) => n.id === id)?.label ?? id;
            const active = screen === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => setScreen(id)}
                  className={cn(
                    "flex h-14 w-full flex-col items-center justify-center gap-1 text-[11px] font-medium",
                    active ? "text-solar" : "text-solar-fg/45",
                  )}
                >
                  <Icon className="size-5" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {menu ? (
        <div className="fixed inset-0 z-40 bg-oled/80">
          <div className="flex h-full max-w-sm flex-col bg-oled p-4">
            <div className="flex items-center justify-between">
              <Wordmark inverted />
              <Button
                variant="ghost"
                size="icon"
                className="text-solar-fg"
                aria-label="Cerrar menú"
                onClick={() => setMenu(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <div className="mt-8 space-y-1">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex h-12 w-full items-center rounded-2xl px-3 text-left text-sm font-medium text-solar-fg hover:bg-solar/10"
                  onClick={() => {
                    setScreen(item.id);
                    setMenu(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
