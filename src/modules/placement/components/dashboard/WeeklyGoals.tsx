import { Progress } from "@/components/ui/Progress";

export const WeeklyGoals = () => {
    const days = [
        { name: "M", active: true },
        { name: "T", active: true },
        { name: "W", active: false },
        { name: "T", active: true },
        { name: "F", active: true },
        { name: "S", active: false },
        { name: "S", active: false },
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Problems Solved</span>
                    <span className="text-gray-900 font-bold">12/20</span>
                </div>
                <Progress value={60} className="h-2.5" />
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                {days.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${day.active
                                    ? "bg-primary text-white shadow-sm"
                                    : "bg-white text-gray-400 border border-gray-200"
                                }`}
                        >
                            {day.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
