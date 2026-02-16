import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
                    "p-6", // Default balanced padding
                    className
                )}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

export { Card };
