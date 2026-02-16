import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ReadinessChart } from '../components/dashboard/ReadinessChart';
import { CheckCircle, BarChart2, Briefcase, ArrowRight, BookOpen, AlertTriangle, Download, Map, Lightbulb, Calendar, FileQuestion, Copy, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

function ResultsContent() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { getAnalysis, updateAnalysis, history } = useAnalysisHistory();
    const [result, setResult] = useState(null);

    // Interactive State
    const [skillConfidence, setSkillConfidence] = useState({});
    const [liveScore, setLiveScore] = useState(0);

    // Initial Load
    useEffect(() => {
        if (id) {
            const data = getAnalysis(id);
            if (data) {
                setTimeout(() => setResult(data), 0);

                // Setup initial confidence
                const initialConfidenceMap = data.skillConfidenceMap || {};

                // If empty (e.g. migration case or new), populate from extracted
                if (Object.keys(initialConfidenceMap).length === 0) {
                    Object.values(data.extractedSkills).flat().forEach(skill => {
                        initialConfidenceMap[skill] = "practice";
                    });
                }

                setTimeout(() => {
                    setSkillConfidence(initialConfidenceMap);
                    setLiveScore(data.finalScore || data.baseScore);
                }, 0);
            }
        }
    }, [id, history.length, getAnalysis]);

    // Score Calculation & Persistence
    useEffect(() => {
        if (!result || !id) return;

        // Strict Rule: Base score is immutable.
        const baseScore = result.baseScore;

        let scoreModifier = 0;
        // Only count modifiers if we have confidence data
        if (Object.keys(skillConfidence).length > 0) {
            Object.values(skillConfidence).forEach(status => {
                if (status === "know") scoreModifier += 2;
                if (status === "practice") scoreModifier -= 2;
            });
        }

        const newScore = Math.min(100, Math.max(0, baseScore + scoreModifier));

        // Update local visual state
        // eslint-disable-next-line
        setLiveScore(newScore);

        // Persist only if changed
        if (newScore !== result.finalScore || JSON.stringify(skillConfidence) !== JSON.stringify(result.skillConfidenceMap)) {
            const timer = setTimeout(() => {
                updateAnalysis(id, {
                    skillConfidenceMap: skillConfidence,
                    finalScore: newScore,
                    updatedAt: new Date().toISOString()
                });
            }, 500);
            return () => clearTimeout(timer);
        }

    }, [skillConfidence, result, id, updateAnalysis]);


    const toggleSkill = (skill) => {
        setSkillConfidence(prev => ({
            ...prev,
            [skill]: prev[skill] === "know" ? "practice" : "know"
        }));
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`Copied ${label} to clipboard!`);
    };

    const downloadReport = () => {
        if (!result) return;

        // Helper to format skills from the new object structure
        const skillsText = Object.entries(result.extractedSkills)
            .map(([category, skills]) => `${category.toUpperCase()}: ${skills.join(", ")}`)
            .join("\n");

        const content = `
PLACEMENT READINESS REPORT
--------------------------
Role: ${result.role}
Company: ${result.company}
Date: ${new Date(result.createdAt).toLocaleDateString()}
Readiness Score: ${liveScore}/100

DETECTED SKILLS
${skillsText}

COMPANY INTEL
Name: ${result.companyIntel?.name || "N/A"}
Industry: ${result.companyIntel?.industry || "N/A"}
Size: ${result.companyIntel?.size || "N/A"}
Focus: ${result.companyIntel?.focus || "N/A"}

PREPARATION PLAN
${result.plan7Days.map(d => `[${d.day}] ${d.focus}\n${d.tasks.map(t => `  - ${t}`).join("\n")}`).join("\n\n")}

ROUND MAPPING
${result.roundMapping?.map(r => `[${r.roundTitle}]\nFocus: ${r.focusAreas.join(", ")}\nWhy it matters: ${r.whyItMatters}`).join("\n\n") || "N/A"}

CHECKLIST
${result.checklist.map(r => `[${r.roundTitle}]\n${r.items.map(i => `  [ ] ${i}`).join("\n")}`).join("\n\n")}

INTERVIEW QUESTIONS
${result.questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}
    `;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Placement_Report_${result.company || "General"}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <p className="text-gray-500">Loading result...</p>
                <Link to="/placement/analysis/new">
                    <Button variant="secondary">Go back</Button>
                </Link>
            </div>
        );
    }

    const practiceSkills = Object.entries(skillConfidence)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, status]) => status === "practice")
        .map(([skill]) => skill)
        .slice(0, 3);

    // Flatten skills for display since new structure is categorized
    const flatSkillsDisplay = Object.entries(result.extractedSkills).filter(([, skills]) => skills.length > 0);

    return (
        <div className="space-y-8 max-w-6xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <Link to="/placement/analysis/history" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Analysis Results</h1>
                        <p className="text-gray-500">
                            {result.role || "Unknown Role"} {result.company ? `at ${result.company}` : ""}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={downloadReport}>
                        <Download className="w-4 h-4 mr-2" /> Download Report
                    </Button>
                </div>
            </div>

            {/* Company Intel Card */}
            {result.companyIntel && result.companyIntel.name !== "Unknown Company" && (
                <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Building2 className="w-24 h-24" />
                    </div>
                    <div className="relative z-10 grid md:grid-cols-2 gap-6">
                        <div>
                            <div className="flex items-center gap-2 text-indigo-200 mb-1">
                                <Building2 className="w-4 h-4" /> Company Profile
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{result.companyIntel.name}</h2>
                            <div className="flex gap-2">
                                <span className="bg-white/20 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                    {result.companyIntel.industry}
                                </span>
                                <span className={cn(
                                    "px-2 py-1 rounded text-xs font-medium backdrop-blur-sm",
                                    result.companyIntel.size === "Enterprise" ? "bg-blue-500/30 text-blue-100" : "bg-green-500/30 text-green-100"
                                )}>
                                    {result.companyIntel.size}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                            <h3 className="text-sm font-semibold text-indigo-100 mb-1">Hiring Focus</h3>
                            <p className="text-sm text-gray-200 leading-relaxed">
                                {result.companyIntel.focus}
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-2 right-4 text-[10px] text-white/30">
                        *Demo Mode: Generated heuristically
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Card */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Readiness Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ReadinessChart score={liveScore} />
                        <p className="text-center text-xs text-gray-500 mt-2">
                            Update skills to see this change in real-time.
                        </p>
                    </CardContent>
                </Card>

                {/* Extracted Skills */}
                <Card className="col-span-1 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Interactive Skill Assessment</CardTitle>
                        <p className="text-sm text-gray-500">Click to toggle: <span className="text-green-600 font-medium">I know this</span> vs <span className="text-orange-500 font-medium">Need practice</span></p>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {flatSkillsDisplay.map(([category, skills]) => (
                                <div key={category}>
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill) => {
                                            const status = skillConfidence[skill] || "practice";
                                            return (
                                                <button
                                                    key={skill}
                                                    onClick={() => toggleSkill(skill)}
                                                    className={cn(
                                                        "px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200",
                                                        status === "know"
                                                            ? "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                                            : "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                                                    )}
                                                >
                                                    {skill} {status === "know" ? "✓" : "?"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Box */}
            {practiceSkills.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" /> Recommended Action
                        </h3>
                        <p className="text-indigo-700">
                            Focus on improving <strong>{practiceSkills.join(", ")}</strong>.
                        </p>
                    </div>
                </div>
            )}

            {/* Round Mapping Engine */}
            {result.roundMapping && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Map className="w-6 h-6 text-primary" />
                        Projected Interview Flow
                    </h2>
                    <div className="relative border-l-2 border-dashed border-gray-300 ml-4 space-y-8 pl-8 py-2">
                        {result.roundMapping.map((round, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[41px] top-1 bg-white border-2 border-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                    {idx + 1}
                                </div>
                                <Card className="hover:shadow-md transition-all">
                                    <CardContent className="p-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{round.roundTitle}</h3>
                                            <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
                                                Typically 45-60 mins
                                            </span>
                                        </div>
                                        <div className="flex gap-2 mb-3 flex-wrap">
                                            {round.focusAreas.map(f => (
                                                <span key={f} className="text-xs border px-2 py-0.5 rounded-full bg-gray-50 text-gray-600">
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="bg-blue-50 border border-blue-100 rounded p-3 flex gap-3">
                                            <Lightbulb className="w-5 h-5 text-blue-600 shrink-0" />
                                            <div>
                                                <span className="text-xs font-bold text-blue-700 block mb-0.5">WHY THIS ROUND MATTERS</span>
                                                <p className="text-xs text-blue-800 leading-relaxed">
                                                    {round.whyItMatters}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Preparation Plan */}
            <div className="flex items-center justify-between mt-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    7-Day Preparation Plan
                </h2>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(result.plan7Days.map(d => `${d.day}: ${d.focus}`).join("\n"), "Plan")}>
                    <Copy className="w-4 h-4 mr-2" /> Copy Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.plan7Days.map((day, idx) => (
                    <Card key={idx} className="border-l-4 border-l-primary/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base text-primary">{day.day}</CardTitle>
                            <p className="text-sm font-medium text-gray-700">{day.focus}</p>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {day.tasks.map((task, i) => (
                                    <li key={i}>{task}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Checklist */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                            Round-wise Checklist
                        </h2>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(result.checklist.map(r => r.items.join("\n")).join("\n"), "Checklist")}>
                            <Copy className="w-4 h-4 mr-2" /> Copy
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {result.checklist.map((round, idx) => (
                            <Card key={idx}>
                                <CardHeader className="py-4">
                                    <CardTitle className="text-base">{round.roundTitle}</CardTitle>
                                </CardHeader>
                                <CardContent className="pb-4 pt-0">
                                    <ul className="space-y-2">
                                        {round.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                <input type="checkbox" className="mt-1 rounded border-gray-300 text-primary focus:ring-primary" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Questions */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <FileQuestion className="w-6 h-6 text-primary" />
                            Likely Interview Questions
                        </h2>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(result.questions.join("\n"), "Questions")}>
                            <Copy className="w-4 h-4 mr-2" /> Copy
                        </Button>
                    </div>
                    <Card>
                        <CardContent className="pt-6">
                            <ul className="space-y-4">
                                {result.questions.map((q, i) => (
                                    <li key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm font-medium text-gray-800">
                                        {i + 1}. {q}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading analysis...</div>}>
            <ResultsContent />
        </Suspense>
    );
}
