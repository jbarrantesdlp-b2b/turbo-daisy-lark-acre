import type { ReactNode } from "react";
import { format } from "date-fns";
import { Signal, Wifi, Battery } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNow } from "@/hooks/use-now";

export function PhoneFrame({
  children,
  wallpaper,
  className,
  lock = false,
  dim = true,
}: {
  children: ReactNode;
  wallpaper: string;
  className?: string;
  lock?: boolean;
  dim?: boolean;
}) {
  const now = useNow();
  return (
    <div
      className={cn(
        "relative mx-auto w-[280px] shrink-0 rounded-[42px] bg-sidebar p-[10px] shadow-[var(--shadow-widget)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[32px] bg-sidebar">
        <img
          src={wallpaper}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        {dim ? <div className="absolute inset-0 bg-sidebar/25" /> : null}
        <div className="relative flex h-[580px] flex-col">
          <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-medium text-widget-fg">
            <span className="tabular-nums">{format(now, "H:mm")}</span>
            <span className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-sidebar" />
            <span className="flex items-center gap-1">
              <Signal className="size-3" />
              <Wifi className="size-3" />
              <Battery className="size-3" />
            </span>
          </div>
          <div
            className={cn(
              "flex flex-1 flex-col px-3 pb-4",
              lock && "justify-end",
            )}
          >
            {children}
          </div>
          <div className="mx-auto mb-2 h-1 w-28 rounded-full bg-widget-fg/70" />
        </div>
      </div>
    </div>
  );
}
