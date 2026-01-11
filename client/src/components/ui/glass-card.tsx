import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  gradientBorder?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, gradientBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300",
          hoverEffect && "hover:bg-white/10 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 cursor-pointer",
          gradientBorder && "before:absolute before:inset-0 before:p-[1px] before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:content-[''] before:-z-10",
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
