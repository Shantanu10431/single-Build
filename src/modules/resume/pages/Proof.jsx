
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Copy, ShieldCheck, AlertCircle } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import TestChecklist from '../components/TestChecklist';

export default function Proof() {
    const { resumeData, score, template, themeColor } = useResume();
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('rb_final_submission');
        return saved ? JSON.parse(saved) : {
            lovable: '',
            github: '',
            deploy: ''
        };
    });
    const [copied, setCopied] = useState(false);
    const [checksPassed, setChecksPassed] = useState(false);

    // 1. Calculate Step Completion (8 Steps)
    const steps = [
        { id: 1, label: 'Personal Info', status: resumeData.personal.fullName && resumeData.personal.email ? 'complete' : 'pending' },
        { id: 2, label: 'Professional Summary', status: resumeData.summary.length > 50 ? 'complete' : 'pending' },
        { id: 3, label: 'Experience Added', status: resumeData.experience.length > 0 ? 'complete' : 'pending' },
        { id: 4, label: 'Education Added', status: resumeData.education.length > 0 ? 'complete' : 'pending' },
        { id: 5, label: 'Projects Added', status: resumeData.projects.length > 0 ? 'complete' : 'pending' },
        { id: 6, label: 'Skills Categorized', status: (resumeData.skills.technical?.length + resumeData.skills.soft?.length + resumeData.skills.tools?.length) > 0 ? 'complete' : 'pending' },
        { id: 7, label: 'Design Selected', status: template && themeColor ? 'complete' : 'pending' },
        { id: 8, label: 'ATS Score > 60', status: score > 60 ? 'complete' : 'pending' },
    ];

    const allStepsComplete = steps.every(s => s.status === 'complete');
    const allLinksProvided = links.lovable && links.github && links.deploy;
    const isShipped = allStepsComplete && checksPassed && allLinksProvided;

    // Link loading handled in initial state
    // useEffect(() => {
    //     const saved = localStorage.getItem('rb_final_submission');
    //     if (saved) setLinks(JSON.parse(saved));
    // }, []);

    const handleChange = (field, value) => {
        const newLinks = { ...links, [field]: value };
        setLinks(newLinks);
        localStorage.setItem('rb_final_submission', JSON.stringify(newLinks));
    };

    const handleCopy = () => {
        const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deploy}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;
        navigator.clipboard.writeText(text.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Link to="/builder" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Builder
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${isShipped ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {isShipped ? 'Shipped' : 'In Progress'}
                        </span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Final Proof & Submission</h1>
                        <p className="text-gray-500">Complete all steps, pass system checks, and provide artifact links to ship.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left Column: steps & Checks */}
                        <div className="p-8 border-r border-gray-100 bg-gray-50/50">

                            {/* 8 Steps Overview */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-brand-600" /> Builder Steps ({steps.filter(s => s.status === 'complete').length}/8)
                                </h3>
                                <div className="space-y-2">
                                    {steps.map(step => (
                                        <div key={step.id} className="flex items-center justify-between text-sm">
                                            <span className={step.status === 'complete' ? 'text-gray-700' : 'text-gray-400'}>{step.label}</span>
                                            {step.status === 'complete' ?
                                                <CheckCircle size={14} className="text-green-500" /> :
                                                <div className="w-3 h-3 rounded-full border-2 border-gray-300" />
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Checks */}
                            <TestChecklist onComplete={setChecksPassed} />

                        </div>

                        {/* Right Column: Artifacts & Export */}
                        <div className="p-8">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Artifact Collection</h3>

                            <div className="space-y-5 mb-8">
                                <Input
                                    label="Lovable Project Link"
                                    placeholder="https://lovable.dev/..."
                                    value={links.lovable}
                                    onChange={(e) => handleChange('lovable', e.target.value)}
                                />
                                <Input
                                    label="GitHub Repository Link"
                                    placeholder="https://github.com/..."
                                    value={links.github}
                                    onChange={(e) => handleChange('github', e.target.value)}
                                />
                                <Input
                                    label="Deployed URL"
                                    placeholder="https://vercel.app/..."
                                    value={links.deploy}
                                    onChange={(e) => handleChange('deploy', e.target.value)}
                                />
                            </div>

                            {isShipped ? (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                                        <p className="text-green-800 font-medium">Project 3 Shipped Successfully.</p>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 hover:bg-black text-white rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                                        {copied ? 'Copied to Clipboard' : 'Copy Final Submission'}
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                                    <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                                    <div className="text-sm text-amber-800">
                                        <p className="font-bold mb-1">Submission Locked</p>
                                        <p>Please complete all 8 builder steps, pass all 10 system checks, and provide all 3 artifact links.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Input = ({ label, value, onChange, placeholder }) => (
    <div>
        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">{label}</label>
        <input
            type="text"
            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-gray-300"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
);
