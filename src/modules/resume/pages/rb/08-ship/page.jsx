

import BuildPanel from '@/modules/resume/components/layout/BuildPanel';
import { Globe } from 'lucide-react';

export default function ShipPage() {
    const stepId = '08';
    const prompt = `Goal: Deploy and Ship the AI Resume Builder.

Context:
- Deployment Platform: Vercel or Netlify.
- Pre-launch checklist: Environment variables, SEO tags, Analytics.

Output Requirements:
1. Deploy the application to production.
2. Verify the live URL.
3. Update README.md with setup instructions using \`git push\`.
4. Capture the final deployed link.`;

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
                            Push your code to GitHub and deploy to Vercel (or Lovable's built-in hosting). Verify the live link works and share it.
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-500 space-y-1 font-sans">
                            <li>Configure custom domain (optional).</li>
                            <li>Check Lighthouse score for performance.</li>
                            <li>Prepare the final submission links.</li>
                        </ul>
                    </div>
                </section>
            </div>

            <BuildPanel stepId={stepId} stepContent={prompt} />
        </>
    );
}
