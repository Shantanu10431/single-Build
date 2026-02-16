

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { Bug } from 'lucide-react';

export default function TestPage() {
    const stepId = '07';
    const prompt = `Goal: Comprehensive Testing of the AI Resume Builder.

Context:
- Types of testing: Unit Tests, Integration Tests, User Acceptance Testing (Manual).
- Key Flows: Sign Up -> Create Resume -> AI Edit -> PDF Download.

Output Requirements:
1. Create a Test Plan with at least 10 test cases.
2. Execute the test cases and log results.
3. Fix critical bugs (e.g., PDF formatting issues, AI timeouts).
4. Verify mobile responsiveness.`;

    return (
        <>
            <div className="p-8 pb-24 space-y-8">
                <section className="space-y-4">
                    <div className="card p-6 space-y-4 bg-[var(--bg-card)]">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            <Bug size={20} className="text-[var(--accent)]" />
                            Task Instructions
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans">
                            Run through the application as a new user. Try to break it. Note down every issue and fix them before shipping.
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 font-sans">
                            <li>Does the PDF download look exactly like the preview?</li>
                            <li>What happens if the AI request fails? (Error states).</li>
                            <li>Is the mobile experience usable?</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
