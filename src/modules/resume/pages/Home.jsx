import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AppNavbar from '../components/layout/AppNavbar';

export default function Home() {
    return (
        <>
            <AppNavbar />
            <main className="min-h-screen bg-main flex flex-col items-center justify-center p-8 pt-24 text-main">
                <div className="max-w-3xl text-center space-y-8">
                    <h1 className="text-6xl font-bold tracking-tight mb-2" style={{ fontFamily: 'var(--font-serif)', lineHeight: '1.1' }}>
                        Build a Resume <br />
                        <span className="text-accent">That Gets Read.</span>
                    </h1>

                    <p className="text-xl text-muted max-w-xl mx-auto font-sans leading-relaxed">
                        Create professional, ATS-optimized resumes in minutes with our premium AI-powered builder. Minimalist design, maximum impact.
                    </p>

                    <div className="pt-8">
                        <Link
                            to="/resume/builder"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white hover:opacity-90 rounded-sm font-medium text-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            Start Building
                            <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-main pt-12">
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg">Smart Formatting</h3>
                            <p className="text-sm text-muted">Auto-layout engine ensures your resume always looks professional.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg">Live Preview</h3>
                            <p className="text-sm text-muted">See changes in real-time as you edit your content.</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-lg">Export Ready</h3>
                            <p className="text-sm text-muted">Download clean, ATS-friendly PDFs instantly.</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
