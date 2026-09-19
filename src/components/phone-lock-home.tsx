import {
  Camera,
  Globe,
  MessageCircle,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PhoneFrame } from "@/components/phone-frame";
import {
  ActionsWidget,
  DeviceWidget,
  LockWidget,
  StatsWidget,
} from "@/components/widgets";
import { capitalize } from "@/lib/utils";
import { useNow } from "@/hooks/use-now";

const DOCK = [
  { label: "Teléfono", Icon: Phone },
  { label: "Mensajes", Icon: MessageCircle },
  { label: "Navegador", Icon: Globe },
  { label: "Cámara", Icon: Camera },
] as const;

export function LockPhone() {
  const now = useNow();
  const date = capitalize(format(now, "EEEE d MMMM", { locale: es }));
  const time = format(now, "H:mm");

  return (
    <PhoneFrame wallpaper="/media/lock-barrantes.png" dim={false}>
      <div className="flex h-full flex-col">
        <div className="pt-6 text-center text-widget-fg">
          <p className="text-[13px] font-medium tracking-[0.18em] text-widget-muted">
            {date}
          </p>
          <p className="mt-1 font-sans text-[64px] font-semibold leading-none tracking-tight tabular-nums">
            {time}
          </p>
        </div>
        <div className="flex-1" />
        <LockWidget style="dark" className="w-full max-w-none shadow-none" />
      </div>
    </PhoneFrame>
  );
}

export function HomePhone() {
  return (
    <PhoneFrame wallpaper="/media/home-barrantes.png" dim={false}>
      <div className="flex h-full flex-col gap-2 pt-2">
        <StatsWidget style="dark" className="w-full max-w-none shadow-none" />
        <div className="grid grid-cols-2 gap-2">
          <DeviceWidget style="dark" className="w-full max-w-none shadow-none" />
          <ActionsWidget style="dark" className="w-full max-w-none shadow-none" />
        </div>
        <div className="flex-1" />
        <div className="mx-auto mb-1 flex w-[92%] items-center justify-around rounded-[22px] bg-widget-fg/10 px-2 py-2.5 backdrop-blur-md">
          {DOCK.map(({ label, Icon }) => (
            <span
              key={label}
              className="flex size-10 items-center justify-center rounded-[12px] bg-widget-fg/10 text-widget-fg"
            >
              <Icon className="size-4" />
              <span className="sr-only">{label}</span>
            </span>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
