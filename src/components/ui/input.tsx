import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface px-3 text-sm text-fg shadow-none outline-none transition-[box-shadow,border-color] duration-[var(--motion-quick)] placeholder:text-subtle focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/25",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
