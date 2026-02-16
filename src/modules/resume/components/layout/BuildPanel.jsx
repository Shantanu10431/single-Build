
import { useState, useEffect } from 'react';
import { Copy, ExternalLink, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';

// interface BuildPanelProps {
//     stepId: string;
//     stepContent: string;
//     lovableLink?: string;
// }

export default function BuildPanel({ stepId, stepContent, lovableLink = "https://lovable.dev/project/new" }) {
    const [status, setStatus] = useState < 'idle' | 'success' | 'error' > ('idle');
    const [screenshot, setScreenshot] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(`rb_step_${stepId}_artifact`);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                setStatus(data.status || 'idle');
                setScreenshot(data.screenshot || '');
            } catch (e) { console.error(e); }
        }
    }, [stepId]);

    useEffect(() => {
        if (status !== 'idle' || screenshot) {
            const data = { status, screenshot, timestamp: new Date().toISOString() };
            localStorage.setItem(`rb_step_${stepId}_artifact`, JSON.stringify(data));
            window.dispatchEvent(new Event('rb_artifact_update'));
        }
    }, [status, screenshot, stepId]);

    const handleCopy = () => {
        navigator.clipboard.writeText(stepContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <aside className="fixed right-0 border-l border-main bg-main flex flex-col" style={{ width: '30%', top: 'var(--header-height)', height: 'calc(100vh - var(--header-height) - var(--footer-height))' }}>
            <div className="p-4 border-b border-main bg-card">
                <h2 className="text-sm font-bold text-muted uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Build in Lovable</h2>

                <div className="relative mb-4">
                    <textarea
                        className="w-full bg-main border border-main rounded-sm p-3 text-xs font-mono text-muted resize-none focus:outline-none"
                        style={{ height: '128px', borderColor: copied ? 'var(--accent)' : 'var(--border)' }}
                        readOnly
                        value={stepContent}
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-1.5 bg-card border border-main rounded-sm text-accent"
                        title="Copy to clipboard"
                    >
                        {copied ? <CheckCircle size={14} color="gray" /> : <Copy size={14} />}
                    </button>
                </div>

                <a
                    href={lovableLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 bg-accent hover:opacity-90 text-white rounded-sm font-medium text-sm"
                >
                    <span>Build in Lovable</span>
                    <ExternalLink size={14} />
                </a>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-4 bg-main">
                <h3 className="text-xs font-bold text-muted uppercase tracking-wider">Status & Evidence</h3>

                <div className="grid grid-cols-2 gap-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <button
                        onClick={() => setStatus('success')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-sm border text-sm font-medium ${status === 'success'
                            ? 'bg-[#E8F5E9] border-[#2E7D32] text-[#2E7D32]'
                            : 'border-main bg-card text-muted'
                            }`}
                    >
                        <CheckCircle size={16} />
                        It Worked
                    </button>

                    <button
                        onClick={() => setStatus('error')}
                        className={`flex items-center justify-center gap-2 py-3 rounded-sm border text-sm font-medium ${status === 'error'
                            ? 'bg-[#FFEBEE] border-[#C62828] text-[#C62828]'
                            : 'border-main bg-card text-muted'
                            }`}
                    >
                        <XCircle size={16} />
                        Error
                    </button>
                </div>

                <div className="mt-2">
                    <label className="text-xs text-muted mb-1 block">Add Screenshot URL</label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={screenshot}
                            onChange={(e) => setScreenshot(e.target.value)}
                            placeholder="https://..."
                            className="input pl-8"
                            style={{ paddingLeft: '32px' }}
                        />
                        <ImageIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" style={{ top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                </div>
            </div>
        </aside>
    );
}
