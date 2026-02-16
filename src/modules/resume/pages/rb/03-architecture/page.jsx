

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { Database } from 'lucide-react';

export default function ArchitecturePage() {
    const stepId = '03';
    const prompt = `Goal: Design the High-Level Architecture for the AI Resume Builder.

Context:
- Frontend: Next.js (React), Tailwind CSS.
- Backend: Next.js API Routes (Serverless) or Node.js/Express.
- Database: PostgreSQL (Supabase) or MongoDB.
- AI Service: OpenAI API or Anthropic API for content generation.
- Auth: Clerk or NextAuth.

Output Requirements:
1. Create a system architecture diagram (Mermaid.js or text description).
2. Define the tech stack with justification.
3. Outline data flow between Client, Server, DB, and AI API.
4. identify potential bottlenecks.`;

    return (
        <>
            <div className="p-8 pb-24 space-y-8">
                <section className="space-y-4">
                    <div className="card p-6 space-y-4 bg-[var(--bg-card)]">
                        <h3 className="text-lg font-bold flex items-center gap-2 text-[var(--text-main)]" style={{ fontFamily: 'var(--font-serif)' }}>
                            <Database size={20} className="text-[var(--accent)]" />
                            Task Instructions
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans">
                            Generate the architectural blueprint. Identify which technologies will handle authentication, data storage, and AI processing.
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 font-sans">
                            <li>Choose your database (Relational vs NoSQL).</li>
                            <li>Decide on state management strategy.</li>
                            <li>Plan for API rate limiting and cost management.</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
