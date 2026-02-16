import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/layout/ContextHeader';
import { Button } from '../components/ui/Button';
import { CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const TEST_ITEMS = [
    { id: "t1", label: "Preferences persist after refresh", help: "Set preferences in Settings, refresh page, verify they are still there." },
    { id: "t2", label: "Match score calculates correctly", help: "Check if jobs have scores based on your keywords." },
    { id: "t3", label: "\"Show only matches\" toggle works", help: "Toggle on dashboard, ensure low scores disappear." },
    { id: "t4", label: "Save job persists after refresh", help: "Save a job, refresh, check Saved tab." },
    { id: "t5", label: "Apply opens in new tab", help: "Click Apply button, ensure new tab opens." },
    { id: "t6", label: "Status update persists after refresh", help: "Change status (Applied), refresh, check status." },
    { id: "t7", label: "Status filter works correctly", help: "Filter by 'Applied', ensure only applied jobs show." },
    { id: "t8", label: "Digest generates top 10 by score", help: "Go to Digest, click Generate, count items." },
    { id: "t9", label: "Digest persists for the day", help: "Refresh Digest page, ensure same jobs show." },
    { id: "t10", label: "No console errors on main pages", help: "Open DevTools (F12) > Console. Check for red errors." },
];

export default function TestChecklistPage() {
    const [checkedItems, setCheckedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem("jobTrackerTests");
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Error parsing tests", e);
            }
        }
        setIsLoading(false);
    }, []);

    const toggleItem = (id) => {
        const newChecked = checkedItems.includes(id)
            ? checkedItems.filter(i => i !== id)
            : [...checkedItems, id];

        setCheckedItems(newChecked);
        localStorage.setItem("jobTrackerTests", JSON.stringify(newChecked));
    };

    const resetTests = () => {
        if (confirm("Reset all test progress?")) {
            setCheckedItems([]);
            localStorage.removeItem("jobTrackerTests");
        }
    };

    const isComplete = TEST_ITEMS.every(item => checkedItems.includes(item.id));
    const progress = Math.round((checkedItems.length / TEST_ITEMS.length) * 100);

    return (
        <div className="bg-background min-h-screen pb-20 job-tracker-layout">
            <ContextHeader
                title="System Verification"
                description="Pre-flight checklist before shipping."
            />

            <main className="max-w-3xl mx-auto px-6 py-10">

                {/* Status Card */}
                <div className={cn(
                    "mb-8 p-6 rounded-lg border flex flex-col md:flex-row justify-between items-center gap-6",
                    isComplete
                        ? "bg-green-50/50 border-green-200"
                        : "bg-amber-50/50 border-amber-200"
                )}>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            {isComplete ? (
                                <ShieldCheck className="w-8 h-8 text-green-600" />
                            ) : (
                                <AlertTriangle className="w-8 h-8 text-amber-600" />
                            )}
                            <h2 className={cn(
                                "text-2xl font-serif font-bold",
                                isComplete ? "text-green-800" : "text-amber-800"
                            )}>
                                {isComplete ? "Ready to Ship" : "Verification Pending"}
                            </h2>
                        </div>
                        <p className={cn(
                            "text-sm font-medium",
                            isComplete ? "text-green-700" : "text-amber-700"
                        )}>
                            {checkedItems.length} / {TEST_ITEMS.length} Tests Passed ({progress}%)
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={resetTests} title="Reset Progress">
                            <RefreshCw className="w-4 h-4 mr-2" /> Reset
                        </Button>

                        {isComplete ? (
                            <Link to="/jobs/prp/08-ship">
                                <Button className="bg-green-600 hover:bg-green-700 text-white border-transparent">
                                    Ship It <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        ) : (
                            <Button disabled className="opacity-50 cursor-not-allowed">
                                Resolve All Issues
                            </Button>
                        )}
                    </div>
                </div>

                {/* Checklist */}
                <div className="bg-card border rounded-lg shadow-sm">
                    {TEST_ITEMS.map((item, index) => {
                        const isChecked = checkedItems.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={cn(
                                    "flex items-start gap-4 p-4 border-b last:border-0 cursor-pointer transition-colors hover:bg-muted/30",
                                    isChecked && "bg-muted/5"
                                )}
                            >
                                <div className={cn(
                                    "mt-0.5 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors",
                                    isChecked
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "border-muted-foreground/30 bg-background"
                                )}>
                                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                                </div>

                                <div className="flex-1">
                                    <h4 className={cn(
                                        "font-medium text-sm transition-colors",
                                        isChecked ? "text-muted-foreground line-through" : "text-foreground"
                                    )}>
                                        {item.label}
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {item.help}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {!isComplete && (
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        <AlertTriangle className="w-4 h-4 inline mr-2 text-amber-500 mb-0.5" />
                        Please verify every item manually to unlock the shipping page.
                    </p>
                )}

            </main>
        </div>
    );
}
