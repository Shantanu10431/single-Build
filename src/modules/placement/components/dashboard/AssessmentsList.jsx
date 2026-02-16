import { Calendar, Clock } from "lucide-react";

export const AssessmentsList = ({ items = [] }) => {
    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 text-sm">
                No upcoming assessments.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{item.title}</span>
                        <div className="flex items-center text-xs text-gray-500 mt-1 gap-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {item.time}
                            </span>
                        </div>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                        {item.type}
                    </span>
                </div>
            ))}
        </div>
    );
};
