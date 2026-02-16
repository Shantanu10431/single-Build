import { cn } from "@/lib/utils";

interface TopBarProps {
    projectName?: string;
    stepCurrent: number;
    stepTotal: number;
    status: "Not Started" | "In Progress" | "Shipped";
}

export function TopBar({
    projectName = "KodNest Build",
    stepCurrent,
    stepTotal,
    status
}: TopBarProps) {
    return (
        <header className="h-16 border-b border-muted flex items-center justify-between px-6 bg-background">
            {/* Left: Project Name */}
            <div className="text-sm font-medium tracking-wide text-foreground">
                {projectName}
            </div>

            {/* Center: Progress */}
            <div className="absolute left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-medium">
                Step {stepCurrent} <span className="text-muted-foreground/50">/</span> {stepTotal}
            </div>

            {/* Right: Status Badge */}
            <div className="flex items-center gap-2">
                <span className={cn(
                    "px-3 py-1 bg-muted rounded-full text-xs font-semibold uppercase tracking-wider",
                    status === "In Progress" && "bg-warning/20 text-warning",
                    status === "Shipped" && "bg-success/20 text-success",
                    status === "Not Started" && "text-muted-foreground"
                )}>
                    {status}
                </span>
            </div>
        </header>
    );
}
