import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils'; // Adjust path to lib

const TESTS = [
    { id: 1, label: "JD required validation works", hint: "Go to Analyze -> Leave empty -> Click Analyze. Should block." },
    { id: 2, label: "Short JD warning shows for <200 chars", hint: "Paste short text -> Check for orange warning under textarea." },
    { id: 3, label: "Skills extraction groups correctly", hint: "Paste JD with 'React, Python, SQL' -> Check Results page skill groups." },
    { id: 4, label: "Round mapping changes based on company + skills", hint: "Compare 'Google' (Enterprise) vs 'Startup' outputs." },
    { id: 5, label: "Score calculation is deterministic", hint: "Re-analyze same JD -> Score should be identical." },
    { id: 6, label: "Skill toggles update score live", hint: "Results page -> Click 'I know this' -> Score increases." },
    { id: 7, label: "Changes persist after refresh", hint: "Toggle skills -> Refresh page -> Score remains updated." },
    { id: 8, label: "History saves and loads correctly", hint: "Check History tab -> Click previous entry -> Loads data." },
    { id: 9, label: "Export buttons copy the correct content", hint: "Click 'Copy Plan' -> Paste in notepad to verify." },
    { id: 10, label: "No console errors on core pages", hint: "Open DevTools -> Check Console while navigating." },
];

const STORAGE_KEY = "prp_checklist_status";

export default function TestChecklistPage() {
    const [checkedItems, setCheckedItems] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error("Failed to parse checklist", e);
            return {};
        }
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    const toggleItem = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newChecked));
    };

    const resetChecklist = () => {
        if (confirm("Reset all test progress?")) {
            setCheckedItems({});
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const allPassed = passedCount === TESTS.length;

    if (!mounted) return <div className="p-10 text-center">Loading checklist...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Pre-Ship Checklist</h1>
                    <p className="text-gray-500">Verify all functionalities before shipping.</p>
                </div>

                <Card className={cn("border-l-4", allPassed ? "border-l-green-500" : "border-l-orange-500")}>
                    <CardContent className="pt-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                {allPassed ? <CheckCircle2 className="text-green-600" /> : <AlertTriangle className="text-orange-500" />}
                                Tests Passed: {passedCount} / {TESTS.length}
                            </h2>
                            {!allPassed && (
                                <p className="text-sm text-orange-600 mt-1">Fix issues before shipping.</p>
                            )}
                        </div>
                        <Button variant="outline" size="sm" onClick={resetChecklist} className="text-gray-500 hover:text-red-600">
                            <RotateCcw className="w-4 h-4 mr-2" /> Reset
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    {TESTS.map((test) => (
                        <div
                            key={test.id}
                            className={cn(
                                "flex items-start gap-4 p-4 bg-white rounded-lg border transition-all hover:shadow-sm cursor-pointer",
                                checkedItems[test.id] ? "border-green-200 bg-green-50/30" : "border-gray-200"
                            )}
                            onClick={() => toggleItem(test.id)}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                                checkedItems[test.id] ? "bg-green-500 border-green-500 text-white" : "border-gray-300 bg-white"
                            )}>
                                {checkedItems[test.id] && <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div>
                                <h3 className={cn("font-medium text-gray-900", checkedItems[test.id] && "line-through text-gray-400")}>
                                    {test.label}
                                </h3>
                                {test.hint && (
                                    <p className="text-xs text-gray-500 mt-1">💡 {test.hint}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <Link to="/placement/prp/08-ship">
                        <Button
                            className={cn("w-full sm:w-auto", !allPassed && "opacity-50 cursor-not-allowed")}
                            variant={allPassed ? "primary" : "secondary"}
                        >
                            Ship It <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
