import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          
          // Variants
          variant === "default" && "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white shadow-lg hover:shadow-primary/20",
          variant === "primary" && "bg-primary/80 hover:bg-primary backdrop-blur-md border border-primary/50 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40",
          variant === "secondary" && "bg-secondary/80 hover:bg-secondary backdrop-blur-md border border-secondary/50 text-black shadow-lg shadow-secondary/20 hover:shadow-secondary/40",
          variant === "ghost" && "hover:bg-white/10 text-white/70 hover:text-white",
          
          // Sizes
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-11 px-6 text-base",
          size === "lg" && "h-14 px-8 text-lg",
          size === "icon" && "h-11 w-11",
          
          className
        )}
        {...props}
      />
    );
  }
);

GlassButton.displayName = "GlassButton";

export { GlassButton };
