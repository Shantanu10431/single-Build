
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { CheckCircle, ExternalLink, Link as LinkIcon, AlertTriangle, Copy, Medal } from 'lucide-react';
import { RESUME_STEPS } from '../data/steps';

// Duplicate of general Proof page logic but specific to Resume Builder flows
// Keeping it separate as requested "/rb/proof"

export default function ResumeProof() {
    const [stepsStatus] = useState(() => {
        const statuses = {};
        RESUME_STEPS.forEach(step => {
            const status = localStorage.getItem(`rb_step_${step.id}_status`);
            statuses[step.id] = status === 'completed';
        });
        return statuses;
    });

    const [urls, setUrls] = useState(() => {
        const savedUrls = localStorage.getItem('rb_proof_submission');
        return savedUrls ? JSON.parse(savedUrls) : { lovable: '', github: '', deploy: '' };
    });
    const [copied, setCopied] = useState(false);

    const handleUrlChange = (field, value) => {
        const newUrls = { ...urls, [field]: value };
        setUrls(newUrls);
        localStorage.setItem('rb_proof_submission', JSON.stringify(newUrls));
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    };

    const allStepsComplete = RESUME_STEPS.every(s => stepsStatus[s.id]);
    const allUrlsValid = isValidUrl(urls.lovable) && isValidUrl(urls.github) && isValidUrl(urls.deploy);
    const isShipped = allStepsComplete && allUrlsValid;

    const copySubmission = () => {
        const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${urls.lovable}
GitHub Repository: ${urls.github}
Live Deployment: ${urls.deploy}

Track Completion: 8/8 Steps verified.
Status: Shipped
------------------------------------------
`;
        navigator.clipboard.writeText(text.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in pb-20">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Medal className={`w-8 h-8 ${isShipped ? 'text-amber-500' : 'text-slate-300'}`} />
                        Project 3: Proof of Work
                    </h1>
                    <p className="text-slate-500 mt-1">Verify your AI Resume Builder delivery.</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${isShipped ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {isShipped ? "Shipped" : "In Progress"}
                </div>
            </div>

            {isShipped && (
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white shadow-xl">
                    <h2 className="text-2xl font-bold mb-2">Build Track Completed.</h2>
                    <p className="text-green-50 text-lg">
                        You have successfully architected, built, and shipped the AI Resume Builder.
                    </p>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Build Steps</CardTitle>
                            <CardDescription>Track verification status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {RESUME_STEPS.map(step => (
                                <div key={step.id} className="flex items-center gap-3 p-2 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                                    {stepsStatus[step.id] ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                                    )}
                                    <div>
                                        <p className={`text-sm font-medium ${stepsStatus[step.id] ? 'text-slate-900' : 'text-slate-500'}`}>
                                            {step.stepNumber}. {step.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className={isShipped ? "border-green-200 ring-4 ring-green-50" : ""}>
                        <CardHeader>
                            <CardTitle>Artifact Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <button
                                onClick={() => setUrls({
                                    lovable: 'https://lovable.dev/project/demo',
                                    github: 'https://github.com/username/demo-repo',
                                    deploy: 'https://demo-project.vercel.app'
                                })}
                                className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline font-medium mb-2"
                            >
                                Fill with Demo Data
                            </button>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Lovable Project</label>
                                <input
                                    className={`w-full p-2 border rounded-md text-sm ${urls.lovable && !isValidUrl(urls.lovable) ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'}`}
                                    placeholder="https://"
                                    value={urls.lovable}
                                    onChange={e => handleUrlChange('lovable', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2"><ExternalLink className="w-4 h-4" /> GitHub Repo</label>
                                <input
                                    className={`w-full p-2 border rounded-md text-sm ${urls.github && !isValidUrl(urls.github) ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'}`}
                                    placeholder="https://"
                                    value={urls.github}
                                    onChange={e => handleUrlChange('github', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Deployed URL</label>
                                <input
                                    className={`w-full p-2 border rounded-md text-sm ${urls.deploy && !isValidUrl(urls.deploy) ? 'border-red-300 focus:ring-red-200' : 'border-slate-200'}`}
                                    placeholder="https://"
                                    value={urls.deploy}
                                    onChange={e => handleUrlChange('deploy', e.target.value)}
                                />
                            </div>

                            <button
                                onClick={copySubmission}
                                disabled={!isShipped}
                                className={`w-full py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all mt-4
                                    ${isShipped
                                        ? 'bg-slate-900 text-white hover:bg-black'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied!" : "Copy Final Submission"}
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
