

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { FileText } from 'lucide-react';

export default function ProblemPage() {
    const stepId = '01';
    const prompt = `Goal: Create a clear problem statement for the AI Resume Builder project.
  
Context:
- Target Audience: Job seekers, students, professionals.
- Problem: Creating a resume is time-consuming, difficult to tailor to specific jobs, and often lacks professional formatting.
- Solution: An AI-powered resume builder that auto-generates content, optimizes for ATS, and provides modern templates.

Output Requirements:
1. Define the core problem clearly.
2. Identify user pain points.
3. Propose the value proposition.
4. List key success metrics.`;

    return (
        <>
            <div className="p-8 pb-24 space-y-8">
                <section className="space-y-4">
                    <div className="card p-6 gap-4 bg-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 className="text-lg font-bold flex items-center gap-2 text-main" style={{ fontFamily: 'var(--font-serif)' }}>
                            <FileText size={20} className="text-accent" />
                            Task Instructions
                        </h3>
                        <p className="text-sm text-muted leading-relaxed font-sans">
                            Use the text in the Build Panel to prompt Lovable (or your preferred LLM) to generate a comprehensive problem statement document.
                            This document will serve as the foundation for the entire project.
                        </p>
                        <ul className="list-disc list-inside text-sm text-muted space-y-1 font-sans">
                            <li>Identify the specific gap in the current market.</li>
                            <li>Explain why existing solutions fail.</li>
                            <li>Quantify the impact of the problem.</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
