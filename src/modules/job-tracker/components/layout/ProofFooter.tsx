import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProofFooterProps {
    checks: {
        uiBuilt: boolean;
        logicWorking: boolean;
        testPassed: boolean;
        deployed: boolean;
    };
}

export function ProofFooter({ checks }: ProofFooterProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-muted flex items-center justify-between px-10 z-50">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                System Verification
            </div>

            <div className="flex items-center gap-8">
                {Object.entries(checks).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                        <div className={cn(
                            "w-5 h-5 border rounded-sm flex items-center justify-center transition-colors duration-200",
                            value ? "bg-success border-success text-success-foreground" : "border-muted-foreground/30 bg-background"
                        )}>
                            {value && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
                        </div>
                        <span className="text-sm font-medium text-foreground capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
