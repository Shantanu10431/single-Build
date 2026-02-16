
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function ProofFooter({ currentStep }) {
    const [steps, setSteps] = useState([]);

    const checkSteps = () => {
        const completed = [];
        for (let i = 1; i <= 8; i++) {
            const key = `rb_step_${i.toString().padStart(2, '0')}_artifact`;
            const saved = localStorage.getItem(key);
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    if (data.status === 'success') {
                        completed.push(i);
                    }
                } catch (e) { }
            }
        }
        setSteps(completed);
    };

    useEffect(() => {
        checkSteps();
        window.addEventListener('rb_artifact_update', checkSteps);
        return () => window.removeEventListener('rb_artifact_update', checkSteps);
    }, []);

    const isCurrentComplete = steps.includes(currentStep);
    const nextStep = currentStep < 8 ? currentStep + 1 : null;
    const nextStepPath = nextStep ? `/rb/${nextStep.toString().padStart(2, '0')}-${getStepName(nextStep)}` : '/rb/proof';

    function getStepName(num) {
        const names = ['problem', 'market', 'architecture', 'hld', 'lld', 'build', 'test', 'ship'];
        return names[num - 1];
    }

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-main px-6 flex items-center justify-between z-50" style={{ height: 'var(--footer-height)' }}>
            {/* Progress Dots */}
            <div className="flex items-center gap-2">
                <span className="text-xs text-muted uppercase tracking-wider mr-2">Progress</span>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <div
                        key={s}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-colors
              ${s === currentStep
                                ? 'border-accent bg-accent text-white'
                                : steps.includes(s)
                                    ? 'border-[#2E7D32] bg-[#E8F5E9] text-[#2E7D32]'
                                    : 'border-main bg-main text-muted'
                            }`}
                    >
                        {steps.includes(s) ? <Check size={14} /> : s}
                    </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-4">
                {nextStep && (
                    <Link
                        to={isCurrentComplete ? nextStepPath : '#'}
                        className={`flex items-center gap-2 px-6 py-2 rounded-sm font-medium transition-all ${isCurrentComplete
                            ? 'bg-main text-main border border-main hover:opacity-90'
                            : 'bg-main text-muted cursor-not-allowed opacity-50 border border-main'
                            }`}
                        onClick={(e) => !isCurrentComplete && e.preventDefault()}
                    >
                        <span>Next: {getStepName(nextStep)?.toUpperCase()}</span>
                        <ArrowRight size={16} />
                    </Link>
                )}
                {!nextStep && (
                    <Link
                        to="/rb/proof"
                        className={`flex items-center gap-2 px-6 py-2 rounded-sm font-medium transition-all ${isCurrentComplete
                            ? 'bg-accent text-white hover:opacity-90'
                            : 'bg-main text-muted cursor-not-allowed opacity-50 border border-main'
                            }`}
                    >
                        <span>Final Proof</span>
                        <ArrowRight size={16} />
                    </Link>
                )}
            </div>
        </footer>
    );
}
