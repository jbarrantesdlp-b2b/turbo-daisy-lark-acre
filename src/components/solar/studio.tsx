import { useState } from "react";
import {
  CLOCK_MODES,
  DigitalOption1,
  DigitalOption2,
  DigitalOption3,
  DigitalSeconds,
} from "@/components/solar/clock-faces";
import { SolarHomeGrid } from "@/components/solar/home-grid";
import {
  VolumeTile2x2,
  VolumeTile3x3,
  VolumeTileWide,
} from "@/components/solar/volume-widgets";
import {
  MediaTile2x2,
  MediaTile3x3,
  MediaTileWide,
} from "@/components/solar/media-widgets";
import { PhoneFrame } from "@/components/phone-frame";
import { AnalogNumbered, AnalogPrecision } from "@/components/solar/clock-faces";
import { BatteryTile, OnlineTile } from "@/components/solar/home-grid";
import { WidgetShell } from "@/components/solar/resize-shell";
import { cn } from "@/lib/utils";

export function SolarStudio() {
  const [accent, setAccent] = useState<"amber" | "cyan">("amber");
  const [mode, setMode] = useState<(typeof CLOCK_MODES)[number]["id"]>("digital-1");

  return (
    <div className={cn("min-h-full bg-oled text-solar-fg", accent === "cyan" && "theme-cyan")}>
      <div className="px-4 py-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-solar">
          Barrantes Co. · Suite Solar
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight">
          Relojes y widgets.
        </h1>
        <p className="mt-2 max-w-xl text-sm text-solar-fg/55">
          Las cuatro caras de la referencia, vivas. Volumen y Spotify en el
          mismo cristal.
        </p>

        <div className="mt-5 inline-flex rounded-full bg-solar-fg/6 p-1">
          {(
            [
              ["amber", "Ámbar solar"],
              ["cyan", "Cyan OLED"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setAccent(id)}
              className={cn(
                "h-9 rounded-full px-4 text-sm font-medium",
                accent === id ? "bg-solar text-oled" : "text-solar-fg/60",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-sm font-semibold tracking-[0.16em] text-solar-fg/70">
            LAPTOP VOLUME
          </h2>
          <p className="mt-1 text-xs text-solar-fg/45">
            2×2 compacto · 4×2 barra ancha · 3×3 con medidor
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <VolumeTile2x2 className="aspect-square max-w-[260px]" />
            <VolumeTileWide className="min-h-[140px]" />
          </div>
          <VolumeTile3x3 className="mt-4 aspect-square max-w-[320px]" />
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold tracking-[0.16em] text-solar-fg/70">
            NOW PLAYING · SESIÓN DE MEDIOS
          </h2>
          <p className="mt-1 max-w-xl text-xs text-solar-fg/45">
            Play, pausa y salto. Toca el sello SPOTIFY para ciclar a YT Music o
            al reproductor del teléfono. En el móvil real usa la sesión de
            medios del sistema: no hace falta abrir Spotify.
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
            <MediaTile2x2 className="aspect-square" />
            <MediaTileWide className="min-h-[140px]" />
          </div>
          <MediaTile3x3 className="mt-4 aspect-square max-w-[320px]" />
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold tracking-[0.16em] text-solar-fg/70">
            TABLERO · REDIMENSIONA
          </h2>
          <p className="mt-1 max-w-xl text-xs text-solar-fg/45">
            Arrastra la esquina o toca 2×2 / 4×2 / 3×3 / 4×4. El widget rellena
            el hueco: la hora y el % crecen, lo secundario se oculta si no cabe.
          </p>
          <div className="mt-5 flex flex-wrap gap-8">
            <WidgetShell label="Digital Option 1" preset="2x2">
              <DigitalOption1 />
            </WidgetShell>
            <WidgetShell label="Digital Option 3" preset="3x3">
              <DigitalOption3 />
            </WidgetShell>
            <WidgetShell label="Analógico" preset="2x2">
              <AnalogPrecision />
            </WidgetShell>
            <WidgetShell label="Volumen" preset="2x2">
              <VolumeTile2x2 />
            </WidgetShell>
            <WidgetShell label="Volumen ancho" preset="4x2">
              <VolumeTileWide />
            </WidgetShell>
            <WidgetShell label="Spotify" preset="4x2">
              <MediaTileWide />
            </WidgetShell>
            <WidgetShell label="Now playing" preset="3x3">
              <MediaTile3x3 />
            </WidgetShell>
            <WidgetShell label="Batería" preset="2x2">
              <BatteryTile />
            </WidgetShell>
            <WidgetShell label="Online" preset="2x2">
              <OnlineTile />
            </WidgetShell>
            <WidgetShell label="Segundos" preset="3x3">
              <DigitalSeconds />
            </WidgetShell>
            <WidgetShell label="Analógico numerado" preset="4x4">
              <AnalogNumbered />
            </WidgetShell>
            <WidgetShell label="Digital Option 2" preset="2x2">
              <DigitalOption2 />
            </WidgetShell>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold tracking-[0.16em] text-solar-fg/70">
            DIGITAL CLOCK · 2×2
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {CLOCK_MODES.map(({ id, title, subtitle, Face }) => (
              <button key={id} type="button" onClick={() => setMode(id)} className="text-left">
                <p className="mb-2 text-center text-[11px] leading-tight text-solar-fg/50">
                  {title}
                  <span className="block">{subtitle}</span>
                </p>
                <Face
                  className={cn(
                    "aspect-square",
                    mode === id && "ring-2 ring-solar",
                  )}
                />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold tracking-[0.16em] text-solar-fg/70">
            DIGITAL CLOCK · 3×3
          </h2>
          <p className="mt-1 text-xs text-solar-fg/45">
            Misma cara, más aire: hora grande, fecha y marca.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DigitalOption1 size="3x3" className="aspect-square" />
            <DigitalOption2 size="3x3" className="aspect-square" />
            <DigitalOption3 size="3x3" className="aspect-square" />
            <DigitalSeconds className="aspect-square" />
          </div>
        </section>

        <section className="mt-12 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center">
          <figure>
            <PhoneFrame wallpaper="/media/oled.png" dim={false}>
              <div className="flex h-full flex-col gap-2 pt-1">
                <MediaTileWide className="min-h-[120px] shrink-0" />
                <VolumeTileWide className="shrink-0" />
                <div className="grid min-h-0 flex-1 grid-cols-2 gap-2">
                  <DigitalOption1 className="min-h-0" />
                  <MediaTile2x2 className="min-h-0" />
                </div>
              </div>
            </PhoneFrame>
            <figcaption className="mt-3 text-center text-xs tracking-[0.16em] text-solar-fg/45">
              INICIO · SPOTIFY + VOLUMEN
            </figcaption>
          </figure>
          <figure>
            <PhoneFrame wallpaper="/media/oled.png" dim={false}>
              <div className="flex h-full flex-col gap-2 pt-1">
                <MediaTile3x3 className="min-h-0 flex-[1.2]" />
                <VolumeTileWide className="shrink-0" />
              </div>
            </PhoneFrame>
            <figcaption className="mt-3 text-center text-xs tracking-[0.16em] text-solar-fg/45">
              3×3 NOW PLAYING
            </figcaption>
          </figure>
        </section>

        <section className="mt-12">
          <h2 className="text-sm font-semibold tracking-[0.16em] text-solar-fg/70">
            GRID ORIGINAL
          </h2>
          <div className="mt-4 max-w-[420px]">
            <SolarHomeGrid />
          </div>
        </section>
      </div>
    </div>
  );
}
