
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Copy, CheckCircle, Play, AlertCircle, ArrowRight, UploadCloud } from 'lucide-react';
import { RESUME_STEPS } from '../data/steps';

// This component handles the logic for a single build step
// It renders the Content in the Main Area (passed via children or props)
// And typically renders the Build Panel logic (which we will actually inline here for the split view)

export default function BuildStep({ stepId }) {
    const navigate = useNavigate();
    const stepData = RESUME_STEPS.find(s => s.id === stepId);
    const stepIndex = RESUME_STEPS.findIndex(s => s.id === stepId);
    const nextStep = RESUME_STEPS[stepIndex + 1];

    const [artifact, setArtifact] = useState(() => {
        return localStorage.getItem(`rb_step_${stepId}_artifact`) || '';
    });
    const [status, setStatus] = useState(() => {
        return localStorage.getItem(`rb_step_${stepId}_status`) || 'pending';
    });
    const [copied, setCopied] = useState(false);

    // Effect to update state if stepId changes (since lazy init only runs on mount)
    useEffect(() => {
        setArtifact(localStorage.getItem(`rb_step_${stepId}_artifact`) || ''); // eslint-disable-line react-hooks/set-state-in-effect
        setStatus(localStorage.getItem(`rb_step_${stepId}_status`) || 'pending');
    }, [stepId]);

    const handleArtifactChange = (e) => {
        const val = e.target.value;
        setArtifact(val);
        localStorage.setItem(`rb_step_${stepId}_artifact`, val);

        if (val.trim().length > 5) {
            setStatus('completed');
            localStorage.setItem(`rb_step_${stepId}_status`, 'completed');
        } else {
            setStatus('pending');
            localStorage.setItem(`rb_step_${stepId}_status`, 'pending');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(stepData.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNext = () => {
        if (status === 'completed' && nextStep) {
            navigate(nextStep.route);
        } else if (status === 'completed' && !nextStep) {
            navigate('/rb/proof');
        }
    };

    if (!stepData) return <div>Step not found</div>;

    return (
        <div className="flex h-full gap-8">
            {/* Main Workspace (70%) */}
            <div className="flex-1 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{stepData.title}</h1>
                    <p className="text-slate-500">
                        Detailed instructions and context for this build step.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Task Instructions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-slate-700 leading-relaxed">
                            {/* Placeholder for detailed rich text instructions */}
                            In this step, you will focus on <strong>{stepData.title}</strong>.
                            Use the prompt on the right to generate the code or design using Lovable or your preferred LLM.
                            Once generated, paste the result or a screenshot link below to verify completion.
                        </p>
                        <div className="bg-slate-100 p-4 rounded-md border border-slate-200 font-mono text-sm text-slate-600">
                            Expected Output: A working component or document for {stepData.id}.
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Secondary Build Panel (30%) */}
            <div className="w-[350px] flex-shrink-0 flex flex-col gap-6">

                {/* 1. Prompt Card */}
                <Card className="border-indigo-100 shadow-sm">
                    <CardHeader className="bg-indigo-50/50 pb-3">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
                            <Play className="w-4 h-4" /> Copy This Into Lovable
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        <div className="bg-white p-3 rounded border border-slate-200 text-xs font-mono text-slate-600 h-32 overflow-y-auto">
                            {stepData.prompt}
                        </div>
                        <button
                            onClick={handleCopy}
                            className="w-full flex items-center justify-center gap-2 py-2 bg-white border border-indigo-200 text-indigo-700 rounded hover:bg-indigo-50 transition font-medium text-sm"
                        >
                            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? "Copied!" : "Copy Prompt"}
                        </button>
                    </CardContent>
                </Card>

                {/* 2. Build Status / Artifact Input */}
                <Card className={status === 'completed' ? 'border-green-200' : 'border-amber-200'}>
                    <CardHeader className={status === 'completed' ? 'bg-green-50/50 pb-3' : 'bg-amber-50/50 pb-3'}>
                        <CardTitle className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${status === 'completed' ? 'text-green-700' : 'text-amber-700'}`}>
                            {status === 'completed' ? <CheckCircle className="w-4 h-4" /> : <UploadCloud className="w-4 h-4" />}
                            {status === 'completed' ? "Build Verified" : "Verification Required"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        <textarea
                            value={artifact}
                            onChange={handleArtifactChange}
                            placeholder="Paste your code snippet, screenshot URL, or confirmation message here..."
                            className="w-full p-3 border border-slate-200 rounded text-sm min-h-[100px] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={status !== 'completed'}
                                className={`flex items-center gap-2 px-4 py-2 rounded font-bold text-sm transition-all
                                    ${status === 'completed'
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                    }`}
                            >
                                Next Step <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        {status !== 'completed' && (
                            <p className="text-xs text-center text-slate-400">
                                Artifact required to proceed.
                            </p>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
