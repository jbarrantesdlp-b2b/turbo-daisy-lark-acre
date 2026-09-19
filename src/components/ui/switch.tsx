import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex h-7 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-[var(--motion-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 data-[state=checked]:bg-primary data-[state=unchecked]:bg-border",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitive.Thumb
      className="pointer-events-none block size-5 translate-x-0.5 rounded-full bg-surface shadow-sm transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out)] data-[state=checked]:translate-x-[22px]"
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
