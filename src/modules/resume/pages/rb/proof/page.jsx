

import { useState, useEffect } from 'react';
import { Check, Copy, ExternalLink, Github, Globe, AlertCircle, ShieldCheck } from 'lucide-react';

const CHECKLIST_ITEMS = [
    "All form sections save to localStorage",
    "Live preview updates in real-time",
    "Template switching preserves data",
    "Color theme persists after refresh",
    "ATS score calculates correctly",
    "Score updates live on edit",
    "Export buttons work (copy/print)",
    "Empty states handled gracefully",
    "Mobile responsive layout works",
    "No console errors on any page"
];

export default function ProofPage() {
    const [steps, setSteps] = useState([]);
    const [checklist, setChecklist] = useState(new Array(10).fill(false));

    // Artifact Links
    const [lovableLink, setLovableLink] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [deployLink, setDeployLink] = useState('');

    const [copied, setCopied] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    // Load Data
    useEffect(() => {
        // Steps
        const loadedSteps = [];
        for (let i = 1; i <= 8; i++) {
            const key = `rb_step_${i.toString().padStart(2, '0')}_artifact`;
            const saved = localStorage.getItem(key);
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    loadedSteps.push({ id: i, ...data });
                } catch (e) { loadedSteps.push({ id: i, status: 'idle' }); }
            } else {
                loadedSteps.push({ id: i, status: 'idle' });
            }
        }
        setSteps(loadedSteps);

        // Checklist
        const savedChecklist = localStorage.getItem('rb_proof_checklist');
        if (savedChecklist) {
            try { setChecklist(JSON.parse(savedChecklist)); } catch (e) { }
        }

        // Links
        const savedSubmission = localStorage.getItem('rb_final_submission');
        if (savedSubmission) {
            try {
                const data = JSON.parse(savedSubmission);
                setLovableLink(data.lovable || '');
                setGithubLink(data.github || '');
                setDeployLink(data.deploy || '');
            } catch (e) { }
        }
    }, []);

    // Save Data & Check Shipped Status
    useEffect(() => {
        localStorage.setItem('rb_proof_checklist', JSON.stringify(checklist));
        localStorage.setItem('rb_final_submission', JSON.stringify({
            lovable: lovableLink,
            github: githubLink,
            deploy: deployLink
        }));

        const allStepsDone = steps.every(s => s.status === 'success');
        const allChecklistDone = checklist.every(Boolean);
        const linksValid = isValidUrl(lovableLink) && isValidUrl(githubLink) && isValidUrl(deployLink);

        setIsShipped(allStepsDone && allChecklistDone && linksValid);

    }, [checklist, lovableLink, githubLink, deployLink, steps]);

    const isValidUrl = (url) => {
        try { return url.length > 8 && (url.startsWith('http') || url.startsWith('https')); }
        catch { return false; }
    };

    const toggleChecklist = (index) => {
        const newChecklist = [...checklist];
        newChecklist[index] = !newChecklist[index];
        setChecklist(newChecklist);
    };

    const generateSubmissionText = () => {
        return `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${lovableLink}
GitHub Repository: ${githubLink}
Live Deployment: ${deployLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateSubmissionText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex min-h-full items-center justify-center p-8 pb-32">
            <div className="w-full max-w-5xl space-y-10">

                {/* Header */}
                <header className="space-y-4 text-center">
                    <h2 className="text-4xl font-bold uppercase tracking-wide text-[var(--accent)] font-serif">
                        Final Proof Submission
                    </h2>
                    <p className="text-muted text-lg font-sans max-w-2xl mx-auto">
                        Verify your build, validate functionality, and ship your project to production.
                    </p>
                </header>

                {/* Shipped Banner */}
                {isShipped && (
                    <div className="bg-[#E8F5E9] border border-[#C8E6C9] p-6 rounded-sm flex items-center justify-center gap-4 animate-in fade-in duration-700">
                        <div className="bg-[#2E7D32] text-white p-2 rounded-full">
                            <ShieldCheck size={32} />
                        </div>
                        <div className="text-[#1B5E20]">
                            <h3 className="text-xl font-bold font-serif">Project 3 Shipped Successfully.</h3>
                            <p className="font-sans text-sm opacity-90">Ready for final submission.</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* LEFT COLUMN: Verification */}
                    <div className="space-y-8">
                        {/* 1. Step Completion */}
                        <div className="card p-8 space-y-6 bg-[var(--bg-card)] border-[var(--border)]">
                            <h3 className="text-xl font-bold text-[var(--text-main)] font-serif flex items-center gap-2">
                                1. Build Verification
                            </h3>
                            <div className="space-y-2">
                                {steps.map((step) => (
                                    <div key={step.id} className="flex items-center justify-between p-3 bg-[var(--bg-main)] rounded-sm border border-[var(--border)]">
                                        <span className="font-medium text-sm text-[var(--text-main)] font-sans">Step {step.id} Artifact</span>
                                        {step.status === 'success' ? (
                                            <div className="flex items-center gap-2 text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
                                                <Check size={14} /> Complete
                                            </div>
                                        ) : (
                                            <span className="text-muted text-xs font-sans uppercase tracking-wider">Pending</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. QA Checklist */}
                        <div className="card p-8 space-y-6 bg-[var(--bg-card)] border-[var(--border)]">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-[var(--text-main)] font-serif flex items-center gap-2">
                                    2. Quality Assurance
                                </h3>
                                <span className="text-xs font-bold bg-[var(--bg-main)] px-2 py-1 rounded-sm text-[var(--accent)] border border-[var(--border)]">
                                    {checklist.filter(Boolean).length}/10 Verified
                                </span>
                            </div>

                            <div className="space-y-3">
                                {CHECKLIST_ITEMS.map((item, i) => (
                                    <label key={i} className="flex items-start gap-3 p-3 hover:bg-[var(--bg-main)] rounded-sm cursor-pointer transition-colors border border-transparent hover:border-[var(--border)]">
                                        <div className={`mt-0.5 w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${checklist[i] ? 'bg-[#2E7D32] border-[#2E7D32]' : 'border-gray-300 bg-white'
                                            }`}>
                                            {checklist[i] && <Check size={14} className="text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={checklist[i]}
                                            onChange={() => toggleChecklist(i)}
                                        />
                                        <span className={`text-sm ${checklist[i] ? 'text-[var(--text-main)]' : 'text-muted'}`}>
                                            {item}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Submission */}
                    <div className="space-y-8">
                        {/* 3. Artifact Collection */}
                        <div className="card p-8 space-y-6 bg-[var(--bg-card)] border-[var(--border)] h-fit">
                            <h3 className="text-xl font-bold text-[var(--text-main)] font-serif flex items-center gap-2">
                                3. Final Artifacts
                            </h3>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-muted font-sans">
                                        Lovable Project URL
                                    </label>
                                    <div className="relative">
                                        <ExternalLink size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            value={lovableLink}
                                            onChange={(e) => setLovableLink(e.target.value)}
                                            placeholder="https://lovable.dev/..."
                                            className="input pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-muted font-sans">
                                        GitHub Repository
                                    </label>
                                    <div className="relative">
                                        <Github size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            value={githubLink}
                                            onChange={(e) => setGithubLink(e.target.value)}
                                            placeholder="https://github.com/..."
                                            className="input pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold uppercase tracking-wider mb-2 block text-muted font-sans">
                                        Live Deployment
                                    </label>
                                    <div className="relative">
                                        <Globe size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            value={deployLink}
                                            onChange={(e) => setDeployLink(e.target.value)}
                                            placeholder="https://..."
                                            className="input pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Shipping Gate */}
                        <div className={`card p-8 space-y-6 border transition-all duration-500 ${isShipped ? 'bg-[var(--accent)] border-[var(--accent)] text-white' : 'bg-gray-100 border-gray-200 opacity-90'}`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className={`text-2xl font-bold font-serif mb-1 ${isShipped ? 'text-white' : 'text-gray-400'}`}>
                                        {isShipped ? 'Shipped' : 'In Progress'}
                                    </h3>
                                    <p className={`text-sm font-sans ${isShipped ? 'text-white/80' : 'text-gray-400'}`}>
                                        {isShipped ? 'All systems go. Ready for launch.' : 'Complete all checks to ship.'}
                                    </p>
                                </div>
                                {isShipped ? <ShieldCheck size={32} className="text-white" /> : <AlertCircle size={32} className="text-gray-300" />}
                            </div>

                            <div className="pt-6 border-t border-white/20">
                                <button
                                    onClick={handleCopy}
                                    disabled={!isShipped}
                                    className={`w-full py-4 rounded-sm font-bold text-lg flex items-center justify-center gap-3 transition-transform active:scale-95 ${isShipped
                                        ? 'bg-white text-[var(--accent)] shadow-lg hover:bg-gray-50'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {copied ? <Check size={20} /> : <Copy size={20} />}
                                    {copied ? 'Copied to Clipboard' : 'Copy Final Submission'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
