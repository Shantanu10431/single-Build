import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
    score: number;
    className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
    let colorClass = "bg-muted text-muted-foreground"; // Default < 40

    if (score >= 80) {
        colorClass = "bg-success/15 text-success border-success/20";
    } else if (score >= 60) {
        colorClass = "bg-warning/15 text-warning border-warning/20";
    } else if (score >= 40) {
        colorClass = "bg-foreground/5 text-foreground/70 border-foreground/10";
    }

    return (
        <span className={cn(
            "px-2 py-0.5 rounded textxs font-bold border",
            colorClass,
            className
        )}>
            {score}% Match
        </span>
    );
}
