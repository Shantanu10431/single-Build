

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { Globe } from 'lucide-react';

export default function MarketPage() {
    const stepId = '02';
    const prompt = `Goal: Conduct a market analysis for the AI Resume Builder.

Context:
- Competitors: LinkedIn Resume Builder, Canva, Novoresume, Rezi.
- Differentiators: AI-tailoring to specific job descriptions, real-time ATS scoring, one-click template switching.
- Trends: Remote work, skills-based hiring, automated recruitment systems (ATS).

Output Requirements:
1. Analyze top 3 competitors.
2. SWOT Analysis (Strengths, Weaknesses, Opportunities, Threats).
3. Define the Unique Selling Proposition (USP).
4. Identify target market segments.`;

    return (
        <>
            <div className="p-8 pb-24 space-y-8">
                <section className="space-y-4">
                    <div className="card p-6 space-y-4 bg-[var(--bg-card)]">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            <Globe size={20} className="text-[var(--accent)]" />
                            Task Instructions
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans">
                            Use the prompt to generate a detailed market research report. Focus on finding gaps in competitors' offerings that your AI Resume Builder can fill.
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 font-sans">
                            <li>Who are the direct and indirect competitors?</li>
                            <li>What features are standard, and what are premium?</li>
                            <li>How will you price or position your product?</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
