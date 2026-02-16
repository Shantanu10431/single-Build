import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Play } from "lucide-react";

export const PracticeCard = () => {
    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">Last Topic</span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">DSA</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Dynamic Programming</h4>
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">3/10</span>
                    </div>
                    <Progress value={30} className="h-2" />
                </div>
            </div>
            <Button className="w-full flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Continue Practice
            </Button>
        </div>
    );
};
