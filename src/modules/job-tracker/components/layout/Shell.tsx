import { ReactNode } from "react";

interface ShellProps {
    children: ReactNode; // Expected to contain TopBar, ContextHeader, Main Grid
}

export function Shell({ children }: ShellProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col pb-20 font-sans text-foreground selection:bg-primary/20">
            {children}
        </div>
    );
}
