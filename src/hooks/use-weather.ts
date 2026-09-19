import { useEffect, useState } from "react";

const CALLAO = { lat: -12.0566, lon: -77.1181, city: "Callao" };
const CACHE_KEY = "sync-weather-v1";
const CACHE_MS = 15 * 60 * 1000;

export interface WeatherNow {
  temp: number;
  humidity: number;
  code: number;
  city: string;
  label: string;
}

function labelFor(code: number) {
  if (code === 0) return "Despejado";
  if (code <= 3) return "Parcial";
  if (code <= 48) return "Niebla";
  if (code <= 57) return "Llovizna";
  if (code <= 67) return "Lluvia";
  if (code <= 77) return "Nieve";
  if (code <= 82) return "Chubascos";
  return "Tormenta";
}

function readCache(): WeatherNow | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at: number; data: WeatherNow };
    if (Date.now() - parsed.at > CACHE_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data: WeatherNow) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* ignore */
  }
}

export function useWeather() {
  const [data, setData] = useState<WeatherNow | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cached = readCache();
    if (cached) setData(cached);

    async function load(lat: number, lon: number, city: string) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) return;
      const json = (await res.json()) as {
        current?: { temperature_2m: number; weather_code: number; relative_humidity_2m: number };
      };
      const current = json.current;
      if (!current || cancelled) return;
      const next: WeatherNow = {
        temp: Math.round(current.temperature_2m),
        humidity: Math.round(current.relative_humidity_2m),
        code: current.weather_code,
        city,
        label: labelFor(current.weather_code),
      };
      writeCache(next);
      setData(next);
    }

    void load(CALLAO.lat, CALLAO.lon, CALLAO.city);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          void load(pos.coords.latitude, pos.coords.longitude, "Local");
        },
        () => undefined,
        { timeout: 3500, maximumAge: 600000 },
      );
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
