

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { GitBranch } from 'lucide-react';

export default function LLDPage() {
    const stepId = '05';
    const prompt = `Goal: Create the Low-Level Design (LLD) document for the project.

Context:
- Component Tree: Header, ResumePreview, EditorPanel, AIControl.
- State Management: React Context or Zustand for resuming data.
- API Intefaces: Complete TypeScript interfaces for request/response bodies.

Output Requirements:
1. React Component hierarchy diagram.
2. Hook definitions (e.g., useResume, useAI).
3. detailed API signatures (Swagger/OpenAPI style).
4. Error handling strategies (Client vs Server).`;

    return (
        <>
            <div className="p-8 pb-24 space-y-8">
                <section className="space-y-4">
                    <div className="card p-6 space-y-4 bg-[var(--bg-card)]">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            <GitBranch size={20} className="text-[var(--accent)]" />
                            Task Instructions
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans">
                            Define the exact function signatures and component props. This blueprint ensures that when you start coding, you know exactly what to type.
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 font-sans">
                            <li>Define the `Resume` interface in TypeScript.</li>
                            <li>List pros and cons of Client-Side Rendering vs Server-Side Rendering for the editor.</li>
                            <li>Plan the folder structure (e.g., `components/editor`, `lib/ai`).</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
