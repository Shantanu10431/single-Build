import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    size?: "default" | "sm" | "lg" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
                    // Size variations
                    size === "default" && "h-10 px-6 py-2",
                    size === "sm" && "h-8 px-3 text-xs",
                    size === "lg" && "h-12 px-8",
                    size === "icon" && "h-9 w-9",

                    variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
                    variant === "secondary" && "border border-primary text-primary hover:bg-primary/5",
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
