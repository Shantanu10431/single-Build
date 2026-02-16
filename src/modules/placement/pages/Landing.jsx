
import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Video, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Nav */}
            <nav className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
                        <Code className="w-6 h-6" />
                        <span>Placement Prep</span>
                    </div>
                    <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-indigo-600">
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                    Ace Your <span className="text-indigo-600">Placement</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                    Master coding interviews, practice aptitude, and track your readiness with our all-in-one placement preparation platform.
                </p>
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Get Started <ArrowRight className="w-5 h-5" />
                </Link>
            </section>

            {/* Features */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Code className="w-8 h-8 text-indigo-600" />}
                            title="Practice Problems"
                            desc="Curated list of DSA problems from top product companies."
                        />
                        <FeatureCard
                            icon={<Video className="w-8 h-8 text-indigo-600" />}
                            title="Mock Interviews"
                            desc="Real-world interview simulations with AI feedback."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="w-8 h-8 text-indigo-600" />}
                            title="Track Progress"
                            desc="Visualize your growth and identify weak areas."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
                    <p>&copy; 2026 Placement Readiness Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

const FeatureCard = ({ icon, title, desc }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 hover:shadow-md transition-all">
        <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
);
