import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand-kit/mark-512.png"
      alt=""
      className={cn("size-9 rounded-lg object-contain bg-[#050811]", className)}
      aria-hidden="true"
    />
  );
}

export function Wordmark({
  stacked = false,
  inverted = false,
}: {
  stacked?: boolean;
  inverted?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", stacked && "items-start")}>
      <LogoMark className="size-9 shrink-0" />
      <div className="leading-tight">
        <p
          className={cn(
            "text-[13px] font-semibold tracking-tight",
            inverted ? "text-sidebar-fg" : "text-fg",
          )}
        >
          SYNC ENGINE
        </p>
        <p
          className={cn(
            "text-[11px]",
            inverted ? "text-sidebar-muted" : "text-muted",
          )}
        >
          BY BARRANTES CO.
        </p>
      </div>
    </div>
  );
}
