import { cn } from "@/lib/utils";

export function ScoreBadge({ score }: { score: number }) {
    let colorClass = "bg-red-100 text-red-700 border-red-200";
    if (score >= 80) colorClass = "bg-green-100 text-green-700 border-green-200";
    else if (score >= 50) colorClass = "bg-orange-100 text-orange-700 border-orange-200";

    return (
        <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
            colorClass
        )}>
            {score}% Match
        </span>
    );
}
