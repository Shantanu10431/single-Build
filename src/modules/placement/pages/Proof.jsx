import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { cn } from '../lib/utils';
import { CheckCircle2, Circle, Copy, ExternalLink, ShieldCheck, Lock, Trophy } from 'lucide-react';

// 1. Build Steps (8 Steps)
const BUILD_STEPS = [
    { id: 1, label: "Project Setup & Pivot" },
    { id: 2, label: "Landing Page Implementation" },
    { id: 3, label: "Dashboard Architecture" },
    { id: 4, label: "Analysis Logic & Heuristics" },
    { id: 5, label: "Results Interactivity" },
    { id: 6, label: "Company Intel Engine" },
    { id: 7, label: "Platform Hardening" },
    { id: 8, label: "Test Checklist & Guards" }
];

const CHECKLIST_STORAGE_KEY = "prp_checklist_status";
const SUBMISSION_STORAGE_KEY = "prp_final_submission";
const STEPS_STORAGE_KEY = "prp_build_steps_status";

export default function ProofPage() {
    const [mounted, setMounted] = useState(false);

    // State
    const [completedSteps, setCompletedSteps] = useState({});
    const [checklistPassed, setChecklistPassed] = useState(false);

    const [artifacts, setArtifacts] = useState({
        lovableLink: "",
        githubLink: "",
        deployedLink: ""
    });

    // Load Data
    useEffect(() => {
        // Load Checklist Status
        const checklistStored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
        if (checklistStored) {
            try {
                const parsed = JSON.parse(checklistStored); // Corrected 'stored' to 'checklistStored'
                // Assuming 10 tests from previous task
                const passedCount = Object.values(parsed).filter(Boolean).length;
                // eslint-disable-next-line
                setChecklistPassed(passedCount >= 10);
            } catch {
                console.error("Failed to parse checklist");
            }
        }

        // Load Build Steps
        const stepsStored = localStorage.getItem(STEPS_STORAGE_KEY);
        if (stepsStored) {
            try {
                setCompletedSteps(JSON.parse(stepsStored));
            } catch { /* ignore */ }
        }

        // Load Artifacts
        const artifactsStored = localStorage.getItem("rb_proof_artifacts");
        if (artifactsStored) {
            try {
                setArtifacts(JSON.parse(artifactsStored));
            } catch { /* ignore */ }
        }

        setMounted(true);
    }, []);

    // Persistence Helpers
    const toggleStep = (id) => {
        const createNew = { ...completedSteps, [id]: !completedSteps[id] };
        setCompletedSteps(createNew);
        localStorage.setItem(STEPS_STORAGE_KEY, JSON.stringify(createNew));
    };

    const updateArtifact = (field, value) => {
        const createNew = { ...artifacts, [field]: value };
        setArtifacts(createNew);
        localStorage.setItem(SUBMISSION_STORAGE_KEY, JSON.stringify(createNew));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url.trim().length > 0;
        } catch (_) {
            return false;
        }
    };

    // Derived Status
    const stepsComplete = BUILD_STEPS.every(s => completedSteps[s.id]);
    const artifactsValid = isValidUrl(artifacts.lovableLink) && isValidUrl(artifacts.githubLink) && isValidUrl(artifacts.deployedLink);
    const isShipped = stepsComplete && checklistPassed && artifactsValid;

    const copySubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${artifacts.lovableLink}
GitHub Repository: ${artifacts.githubLink}
Live Deployment: ${artifacts.deployedLink}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`.trim();
        navigator.clipboard.writeText(text);
        alert("Submission text copied to clipboard!");
    };

    if (!mounted) return <div className="p-10 text-center">Loading proof...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header & Status */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Proof of Work</h1>
                        <p className="text-gray-500">Final verification and submission.</p>
                    </div>
                    <div className={cn(
                        "px-6 py-2 rounded-full font-bold text-lg flex items-center gap-2 shadow-sm border",
                        isShipped
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                    )}>
                        {isShipped ? (
                            <>
                                <Trophy className="w-5 h-5" /> Shipped
                            </>
                        ) : (
                            <>
                                <Circle className="w-5 h-5" /> In Progress
                            </>
                        )}
                    </div>
                </div>

                {isShipped && (
                    <Card className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white border-none shadow-xl">
                        <CardContent className="p-8 text-center space-y-4">
                            <h2 className="text-3xl font-bold">You built a real product.</h2>
                            <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                                Not a tutorial. Not a clone. <br />
                                A structured tool that solves a real problem.
                            </p>
                            <div className="pt-4">
                                <span className="inline-block px-4 py-2 bg-white/10 rounded-lg text-sm font-medium tracking-wide">
                                    THIS IS YOUR PROOF OF WORK
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* A) Step Completion */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                Build Steps ({Object.values(completedSteps).filter(Boolean).length}/8)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {BUILD_STEPS.map(step => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex items-center p-3 rounded-lg cursor-pointer transition-all border",
                                        completedSteps[step.id] ? "bg-green-50 border-green-100" : "hover:bg-gray-50 border-transparent"
                                    )}
                                    onClick={() => toggleStep(step.id)}
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors",
                                        completedSteps[step.id] ? "bg-green-500 border-green-500 text-white" : "border-gray-300"
                                    )}>
                                        {completedSteps[step.id] && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    </div>
                                    <span className={cn("text-sm font-medium", completedSteps[step.id] ? "text-green-800" : "text-gray-600")}>
                                        {step.id}. {step.label}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Prerequisites */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    Validation Gates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Test Checklist (10 items)</span>
                                    {checklistPassed ? (
                                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">PASSED</span>
                                    ) : (
                                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">PENDING</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Build Steps (8 items)</span>
                                    {stepsComplete ? (
                                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">COMPLETE</span>
                                    ) : (
                                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">INCOMPLETE</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">Artifact Links (3 items)</span>
                                    {artifactsValid ? (
                                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">VALID</span>
                                    ) : (
                                        <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded">INVALID</span>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* B) Artifact Inputs */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <ExternalLink className="w-5 h-5 text-primary" />
                                    Artifact Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Lovable Project Link</label>
                                    <Input
                                        placeholder="https://lovable.dev/..."
                                        value={artifacts.lovableLink}
                                        onChange={(e) => updateArtifact("lovableLink", e.target.value)}
                                        className={cn(!isValidUrl(artifacts.lovableLink) && artifacts.lovableLink.length > 0 && "border-red-300 focus:ring-red-200")}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">GitHub Repository</label>
                                    <Input
                                        placeholder="https://github.com/..."
                                        value={artifacts.githubLink}
                                        onChange={(e) => updateArtifact("githubLink", e.target.value)}
                                        className={cn(!isValidUrl(artifacts.githubLink) && artifacts.githubLink.length > 0 && "border-red-300 focus:ring-red-200")}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Deployed Application</label>
                                    <Input
                                        placeholder="https://vercel.app/..."
                                        value={artifacts.deployedLink}
                                        onChange={(e) => updateArtifact("deployedLink", e.target.value)}
                                        className={cn(!isValidUrl(artifacts.deployedLink) && artifacts.deployedLink.length > 0 && "border-red-300 focus:ring-red-200")}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* 2) Final Submission Export */}
                <div className="pt-4 border-t flex justify-end">
                    <Button
                        size="lg"
                        onClick={copySubmission}
                        disabled={!isShipped}
                        className={cn("w-full md:w-auto font-bold", !isShipped && "opacity-50")}
                    >
                        {!isShipped && <Lock className="w-4 h-4 mr-2" />}
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Final Submission
                    </Button>
                </div>
            </div>
        </div>
    );
}
