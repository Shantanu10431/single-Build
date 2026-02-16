import React, { useState } from 'react';
import { getCurrentAnalysis, updateHistoryEntry } from '../utils/analysisEngine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { FileCheck, BookOpen, BrainCircuit, Calendar, CheckSquare, Copy, Download, ArrowRight, TrendingUp } from 'lucide-react';

export default function JobAnalysisResult() {
    const [result, setResult] = useState(() => {
        const data = getCurrentAnalysis();
        if (data) {
            if (data.readinessScore && !data.finalScore) data.finalScore = data.readinessScore;
            if (data.plan && !data.plan7Days) data.plan7Days = data.plan;
            return data;
        }
        return null;
    });
    const [copied, setCopied] = useState(null);

    const toggleSkill = (skill) => {
        if (!result) return;

        const newMap = { ...result.skillConfidenceMap };
        newMap[skill] = newMap[skill] === 'know' ? 'practice' : 'know';

        // Recalculate Score logic (Base + Adjustments)
        let adjustment = 0;
        Object.values(newMap).forEach(status => {
            if (status === 'know') adjustment += 2;
            if (status === 'practice') adjustment -= 2;
        });

        const newScore = Math.min(100, Math.max(0, result.baseScore + adjustment));

        const updatedResult = {
            ...result,
            skillConfidenceMap: newMap,
            finalScore: newScore,
            updatedAt: new Date().toISOString()
        };

        setResult(updatedResult);
        updateHistoryEntry(updatedResult);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadReport = () => {
        if (!result) return;
        const text = `
PLACEMENT READINESS REPORT
Role: ${result.role || "N/A"}
Company: ${result.company || "N/A"}
Date: ${new Date(result.createdAt).toLocaleDateString()}
Score: ${result.finalScore}/100

--- SKILLS ASSESSMENT ---
${Object.entries(result.skillConfidenceMap || {}).map(([s, status]) => `- ${s}: ${status === 'know' ? 'Ready' : 'Needs Practice'}`).join('\n')}

--- 7-DAY PLAN ---
${(result.plan7Days || []).map(d => `${d.day} (${d.focus}):\n${d.tasks.map(t => `  - ${t}`).join('\n')}`).join('\n\n')}

--- ROUND CHECKLIST ---
${(Array.isArray(result.checklist) ? result.checklist : Object.entries(result.checklist)).map(item => {
            // If schema is array [{roundTitle, items}] vs old object {Round1: []}
            if (item.roundTitle) return `${item.roundTitle}:\n${item.items.map(i => `  [ ] ${i}`).join('\n')}`;
            return `${item[0]}:\n${item[1].map(i => `  [ ] ${i}`).join('\n')}`;
        }).join('\n\n')}

--- QUESTIONS ---
${result.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
        `;

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Placement_Report.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (!result) return <div className="p-10 text-center text-slate-500">Loading analysis...</div>;

    // Derived State
    const weakSkills = Object.entries(result.skillConfidenceMap || {})
        .filter(([, status]) => status === 'practice')
        .slice(0, 3)
        .map(([skill]) => skill);

    // Normalize Skills Display (Handle Object structure)
    // extractedSkills might be array (old) or object (new strict)
    const renderSkills = () => {
        if (!result.extractedSkills) return null;

        let categories = {};
        if (Array.isArray(result.extractedSkills)) {
            // Probably should not happen with new engine, but safety.
            categories['Detected'] = result.extractedSkills;
        } else {
            // Filter empty categories
            Object.entries(result.extractedSkills).forEach(([cat, skills]) => {
                if (skills && skills.length > 0) categories[cat] = skills;
            });
        }

        return Object.entries(categories).map(([category, skills]) => (
            <div key={category} className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">{category}</h4>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 
                                ${result.skillConfidenceMap[skill] === 'know'
                                    ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                                    : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                                }`}
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{result.role || "Job Analysis"}</h1>
                    <p className="text-xl text-slate-500">{result.company || "Unknown Company"}</p>
                    <p className="text-xs text-slate-400 mt-1">Analyzed: {new Date(result.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                    <div className={`text-5xl font-bold transition-all duration-300 ${result.finalScore > 70 ? 'text-green-600' : 'text-indigo-600'}`}>
                        {result.finalScore}
                    </div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Readiness Score</p>
                </div>
            </div>

            <div className="flex gap-2 justify-end">
                <button
                    onClick={downloadReport}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                    <Download className="w-4 h-4" /> Download Report
                </button>
            </div>

            {/* Company Intel Box */}
            {result.companyIntel && (
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="md:col-span-1 border-l-4 border-l-indigo-600">
                        <CardHeader>
                            <CardTitle className="text-lg">Company Intel</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div><h4 className="text-xs font-bold text-slate-400">Type</h4><p className="font-semibold">{result.companyIntel.type}</p></div>
                            <div><h4 className="text-xs font-bold text-slate-400">Size</h4><p className="font-semibold">{result.companyIntel.size}</p></div>
                            <div><h4 className="text-xs font-bold text-slate-400">Focus</h4><p className="text-sm italic">{result.companyIntel.focus}</p></div>
                            {result.companyIntel.type && <span className="inline-block px-2 py-1 bg-yellow-50 text-yellow-700 text-[10px] uppercase border border-yellow-200">Demo Mode: Heuristic</span>}
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2">
                        <CardHeader><CardTitle>Interview Rounds</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-6 relative border-l-2 border-indigo-100 ml-3 pl-8 py-2">
                                {(result.roundMapping || []).map((round, i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -left-[41px] top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm border-4 border-white shadow-sm">
                                            {i + 1}
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                            <h4 className="font-bold text-slate-900">{round.name || round.roundTitle}</h4>
                                            <p className="text-sm text-slate-600 mt-1">{round.desc || round.focusAreas?.join(", ")}</p>
                                            <div className="mt-2 text-xs text-slate-500 italic"><span className="font-semibold text-indigo-600">Why:</span> {round.why || round.whyItMatters}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Skills */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-indigo-600" /> Key Skills</CardTitle>
                    <CardDescription>Click tags to update data. Green = Ready.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        {renderSkills()}
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                {/* 7-Day Plan */}
                <Card className="h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-600" /> 7-Day Game Plan</CardTitle>
                        <button onClick={() => copyToClipboard('Plan Text...', 'plan')} className="text-slate-400 hover:text-indigo-600">
                            {copied === 'plan' ? <CheckSquare className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="space-y-6 relative border-l-2 border-slate-100 ml-3 pl-6">
                            {(result.plan7Days || []).map((day, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-600"></div>
                                    <h4 className="font-bold text-slate-900">{day.day}: {day.focus}</h4>
                                    <ul className="mt-2 space-y-1">
                                        {day.tasks.map((task, j) => (
                                            <li key={j} className="text-sm text-slate-600 flex items-start gap-2">
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 flex-shrink-0"></span>
                                                {task}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {/* Checklist */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Prep Checklist</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            {(Array.isArray(result.checklist) ? result.checklist : Object.entries(result.checklist).map(([k, v]) => ({ roundTitle: k, items: v }))).map((round, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-slate-800 mb-2">{round.roundTitle}</h4>
                                    <div className="space-y-2">
                                        {(round.items || []).map((item, k) => (
                                            <div key={k} className="flex items-center gap-2 text-sm text-slate-600">
                                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Questions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Likely Questions</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {result.questions.map((q, i) => (
                                    <li key={i} className="p-3 bg-white border border-slate-100 rounded-md shadow-sm text-sm text-slate-700">
                                        <span className="font-bold text-indigo-600 mr-2">Q{i + 1}.</span> {q}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Action Box */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg md:pl-64 z-20">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-slate-900 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-600" /> Action Next</h4>
                        <p className="text-sm text-slate-600">
                            {weakSkills.length > 0 ? <span>Focus on <span className="text-orange-600 font-medium">{weakSkills.join(", ")}</span>.</span> : "Ready for mocks!"} Start Day 1.
                        </p>
                    </div>
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition flex items-center gap-2">Start Plan <ArrowRight className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
}
