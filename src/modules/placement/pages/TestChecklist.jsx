
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { CheckSquare, AlertTriangle, Ship, RefreshCw, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CHECKLIST_ITEMS = [
    { id: 1, label: "JD required validation works", hint: "Try submitting empty JD" },
    { id: 2, label: "Short JD warning shows for <200 chars", hint: "Paste short text, check warning" },
    { id: 3, label: "Skills extraction groups correctly", hint: "Verify Core CS vs Web vs Data tags" },
    { id: 4, label: "Round mapping changes based on company + skills", hint: "Compare Google vs Startup results" },
    { id: 5, label: "Score calculation is deterministic", hint: "Refresh shouldn't change base score" },
    { id: 6, label: "Skill toggles update score live", hint: "Toggle skills, watch score change" },
    { id: 7, label: "Changes persist after refresh", hint: "Reload page, check toggles" },
    { id: 8, label: "History saves and loads correctly", hint: "Check History tab" },
    { id: 9, label: "Export buttons copy the correct content", hint: "Try Copy/Download actions" },
    { id: 10, label: "No console errors on core pages", hint: "Check DevTools Console" }
];

export default function TestChecklist() {
    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    const toggleCheck = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('prp_test_checklist', JSON.stringify(newChecked));
    };

    const resetChecklist = () => {
        if (confirm("Reset all test progress?")) {
            setCheckedItems({});
            localStorage.removeItem('prp_test_checklist');
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const isComplete = passedCount === CHECKLIST_ITEMS.length;

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <CheckSquare className="w-8 h-8 text-indigo-600" /> Test Checklist
                    </h1>
                    <p className="text-slate-500 mt-1">Verify all features before shipping.</p>
                </div>
                <div className="text-right">
                    <div className={`text-4xl font-bold ${isComplete ? 'text-green-600' : 'text-slate-900'}`}>
                        {passedCount} <span className="text-lg text-slate-400 font-normal">/ {CHECKLIST_ITEMS.length}</span>
                    </div>
                </div>
            </div>

            {!isComplete && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-amber-800">Ship Locked</h4>
                        <p className="text-sm text-amber-700">Fix issues and check all items before shipping.</p>
                    </div>
                </div>
            )}

            <Card>
                <CardContent className="p-0 divide-y divide-slate-100">
                    {CHECKLIST_ITEMS.map((item) => (
                        <div key={item.id} className="p-4 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                            <input
                                type="checkbox"
                                className="mt-1 w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                checked={!!checkedItems[item.id]}
                                onChange={() => toggleCheck(item.id)}
                            />
                            <div className="flex-1">
                                <label className="font-medium text-slate-900 block cursor-pointer" onClick={() => toggleCheck(item.id)}>
                                    {item.label}
                                </label>
                                <p className="text-xs text-slate-500 mt-1">Hint: {item.hint}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex justify-between items-center pt-6 border-t border-slate-200">
                <button
                    onClick={resetChecklist}
                    className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors text-sm font-medium"
                >
                    <RefreshCw className="w-4 h-4" /> Reset Checklist
                </button>

                <button
                    onClick={() => navigate('/prp/08-ship')}
                    disabled={!isComplete}
                    className={`nav-btn px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all
                        ${isComplete
                            ? 'bg-green-600 text-white hover:bg-green-700 hover:scale-105'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                >
                    {isComplete ? <Ship className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    {isComplete ? "Go to Ship" : "Locked"}
                </button>
            </div>
        </div>
    );
}
