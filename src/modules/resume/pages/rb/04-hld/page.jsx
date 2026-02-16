

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { Box } from 'lucide-react';

export default function HLDPage() {
    const stepId = '04';
    const prompt = `Goal: Create the High-Level Design (HLD) document.

Context:
- Modules: User Management, Resume Editor, AI Generator, Job Tracker, PDF Exporter.
- External Integrations: LinkedIn Import, GitHub Application (optional).

Output Requirements:
1. Define the major modules and their responsibilities.
2. Outline the API endpoints (RESTful or T3 stack procedures).
3. Design the initial Database Schema (ER Diagram).
4. Define security policies (Rigor, GDPR compliance basics).`;

    return (
        <>
            <div className="p-8 pb-24 space-y-8">
                <section className="space-y-4">
                    <div className="card p-6 space-y-4 bg-[var(--bg-card)]">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            <Box size={20} className="text-[var(--accent)]" />
                            Task Instructions
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans">
                            Focus on the "what" and "where". Define your database entities (Users, Resumes, Jobs) and how they relate. Design your API surface.
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 font-sans">
                            <li>Draft the User and Resume tables.</li>
                            <li>List the key API routes (e.g., POST /api/generate).</li>
                            <li>Define the component hierarchy (high level).</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
