
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { CheckCircle, AlertTriangle, Copy, Link as LinkIcon, ExternalLink, Medal } from 'lucide-react';

const STEPS = [
    { id: 1, label: "Project Initialization & Setup" },
    { id: 2, label: "Landing Page & App Shell" },
    { id: 3, label: "Core Analysis Engine" },
    { id: 4, label: "Interactive Results UI" },
    { id: 5, label: "History & Persistence Layer" },
    { id: 6, label: "Company Intel & Round Mapping" },
    { id: 7, label: "Hardening & Schema validation" },
    { id: 8, label: "Test Checklist Verification" }
];

export default function Proof() {
    const [steps, setSteps] = useState(() => {
        const savedSteps = localStorage.getItem('prp_proof_steps');
        return savedSteps ? JSON.parse(savedSteps) : {};
    });
    const [urls, setUrls] = useState(() => {
        const savedUrls = localStorage.getItem('prp_final_submission');
        return savedUrls ? JSON.parse(savedUrls) : { lovable: '', github: '', deploy: '' };
    });
    const [checklistComplete] = useState(() => {
        const savedChecklist = localStorage.getItem('prp_test_checklist');
        if (savedChecklist) {
            const items = JSON.parse(savedChecklist);
            const passed = Object.values(items).filter(Boolean).length;
            return passed === 10;
        }
        return false;
    });
    const [copied, setCopied] = useState(false);

    const handleStepToggle = (id) => {
        const newSteps = { ...steps, [id]: !steps[id] };
        setSteps(newSteps);
        localStorage.setItem('prp_proof_steps', JSON.stringify(newSteps));
    };

    const handleUrlChange = (field, value) => {
        const newUrls = { ...urls, [field]: value };
        setUrls(newUrls);
        localStorage.setItem('prp_final_submission', JSON.stringify(newUrls));
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    // Shipped Logic
    const allStepsComplete = STEPS.every(s => steps[s.id]);
    const allUrlsValid = isValidUrl(urls.lovable) && isValidUrl(urls.github) && isValidUrl(urls.deploy);
    const isShipped = allStepsComplete && checklistComplete && allUrlsValid;

    const copySubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${urls.lovable}
GitHub Repository: ${urls.github}
Live Deployment: ${urls.deploy}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`;
        navigator.clipboard.writeText(text.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-20">
            {/* Header / Status */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Medal className={`w-8 h-8 ${isShipped ? 'text-amber-500' : 'text-slate-300'}`} />
                        Proof of Work
                    </h1>
                    <p className="text-slate-500 mt-1">Final verification and submission generation.</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${isShipped ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {isShipped ? "Shipped" : "In Progress"}
                </div>
            </div>

            {/* Shipped Message */}
            {isShipped && (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white shadow-xl transform transition-all hover:scale-[1.01]">
                    <h2 className="text-2xl font-bold mb-4">You built a real product.</h2>
                    <p className="text-indigo-100 text-lg leading-relaxed">
                        Not a tutorial. Not a clone. <br />
                        A structured tool that solves a real problem.
                    </p>
                    <p className="mt-4 font-semibold text-white/90">This is your proof of work.</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Steps Column */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Development Steps</CardTitle>
                            <CardDescription>Mark completed milestones.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {STEPS.map(step => (
                                <div key={step.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                        checked={!!steps[step.id]}
                                        onChange={() => handleStepToggle(step.id)}
                                    />
                                    <span className={`text-sm font-medium ${steps[step.id] ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>2. Quality Gate</CardTitle>
                            <CardDescription>Automated checks.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={`flex items-center gap-3 p-3 rounded-lg border ${checklistComplete ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                                {checklistComplete ? <CheckCircle className="w-5 h-5 text-green-600" /> : <AlertTriangle className="w-5 h-5 text-amber-600" />}
                                <div>
                                    <p className={`font-bold text-sm ${checklistComplete ? 'text-green-800' : 'text-amber-800'}`}>
                                        {checklistComplete ? "Test Checklist Passed (10/10)" : "Test Checklist Incomplete"}
                                    </p>
                                    {!checklistComplete && <p className="text-xs text-amber-700 mt-1">Visit /prp/07-test to complete.</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Submission Column */}
                <div className="space-y-6">
                    <Card className={isShipped ? "border-green-200 ring-4 ring-green-50" : ""}>
                        <CardHeader>
                            <CardTitle>3. Artifact Links</CardTitle>
                            <CardDescription>Required for final submission.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <button
                                onClick={() => setUrls({
                                    lovable: 'https://lovable.dev/project/demo-prp',
                                    github: 'https://github.com/username/demo-prp',
                                    deploy: 'https://demo-prp.vercel.app'
                                })}
                                className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-medium mb-2"
                            >
                                Fill with Demo Data
                            </button>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Lovable Project Link</label>
                                <input
                                    className={`w-full p-2 border rounded-md text-sm ${urls.lovable && !isValidUrl(urls.lovable) ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'}`}
                                    placeholder="https://lovable.dev/..."
                                    value={urls.lovable}
                                    onChange={e => handleUrlChange('lovable', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2"><ExternalLink className="w-4 h-4" /> GitHub Repository</label>
                                <input
                                    className={`w-full p-2 border rounded-md text-sm ${urls.github && !isValidUrl(urls.github) ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'}`}
                                    placeholder="https://github.com/..."
                                    value={urls.github}
                                    onChange={e => handleUrlChange('github', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Deployed URL</label>
                                <input
                                    className={`w-full p-2 border rounded-md text-sm ${urls.deploy && !isValidUrl(urls.deploy) ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'}`}
                                    placeholder="https://vercel.app/..."
                                    value={urls.deploy}
                                    onChange={e => handleUrlChange('deploy', e.target.value)}
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <button
                                    onClick={copySubmission}
                                    disabled={!isShipped}
                                    className={`w-full py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all
                                        ${isShipped
                                            ? 'bg-slate-900 text-white hover:bg-black shadow-lg hover:shadow-xl'
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copied to Clipboard!" : "Copy Final Submission"}
                                </button>
                                {!isShipped && <p className="text-xs text-center text-slate-400 mt-2">Complete all steps and fields to unlock.</p>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
