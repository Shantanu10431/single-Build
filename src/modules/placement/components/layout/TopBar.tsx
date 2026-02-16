import { Badge } from '@/components/ui/Badge';

export const TopBar = () => {
    return (
        <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50">
            <div className="font-serif font-bold text-lg tracking-tight text-foreground">
                KodNest Premium Build System
            </div>
            <div className="text-sm font-medium text-gray-500">
                Step 1 / 5
            </div>
            <div>
                <Badge variant="neutral">Not Started</Badge>
            </div>
        </nav>
    );
};
