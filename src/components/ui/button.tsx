import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,box-shadow,opacity,transform] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-fg shadow-sm hover:opacity-90",
        secondary:
          "bg-surface text-fg shadow-[var(--shadow-border)] hover:bg-primary-soft",
        soft: "bg-primary-soft text-primary hover:opacity-90",
        ghost: "text-muted hover:bg-primary-soft hover:text-fg",
        outline: "border border-border bg-surface text-fg hover:bg-primary-soft",
        sidebar:
          "text-sidebar-muted hover:bg-sidebar-fg/6 hover:text-sidebar-fg",
        danger: "bg-danger-soft text-danger hover:opacity-90",
      },
      size: {
        default: "h-11 rounded-[var(--radius-sm)] px-4 text-sm",
        sm: "h-9 rounded-[var(--radius-sm)] px-3 text-sm",
        lg: "h-12 rounded-[var(--radius-md)] px-5 text-sm",
        icon: "size-11 rounded-[var(--radius-sm)]",
        "icon-sm": "size-9 rounded-[var(--radius-sm)]",
        pill: "h-8 rounded-full px-3 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
