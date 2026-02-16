

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { Terminal } from 'lucide-react';

export default function BuildPage() {
    const stepId = '06';
    const prompt = `Goal: Implement the Core Features of the AI Resume Builder using Lovable.

Context:
- Tech Stack: React, Supabase, Tailwind, OpenAI API.
- Focus: MVP features first (Resume Form, Preview, One AI generation feature).

Output Requirements:
1. Generate the initial codebase prompt for Lovable.
2. Setup database tables in Supabase.
3. Connect the frontend form to state.
4. Implement the PDF export functionality.`;

    return (
        <>
            <div className="p-8 pb-24 space-y-8">
                <section className="space-y-4">
                    <div className="card p-6 space-y-4 bg-[var(--bg-card)]">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            <Terminal size={20} className="text-[var(--accent)]" />
                            Task Instructions
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans">
                            Use the Build Panel to instruct Lovable to generate the code. Iterate screen by screen or feature by feature.
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 font-sans">
                            <li>Build the Resume Builder Form first.</li>
                            <li>Implement the Live Preview split-screen.</li>
                            <li>Connect the "Generate with AI" button to the API.</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
