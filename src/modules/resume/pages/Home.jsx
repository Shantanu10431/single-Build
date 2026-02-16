
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="max-w-3xl text-center space-y-8">
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                        <FileText size={32} />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
                    Build a Resume <br />
                    <span className="text-brand-600">That Gets Read.</span>
                </h1>

                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Professional, ATS-friendly, and designed for impact.
                    Create your premium resume in minutes.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/builder"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-full text-lg font-semibold hover:bg-brand-700 transition-all hover:scale-105 shadow-lg shadow-brand-100"
                    >
                        Start Building
                        <ArrowRight size={20} />
                    </Link>
                    <Link
                        to="/builder?demo=true"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105"
                    >
                        View Demo
                    </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-400 font-medium">POWERED BY KODNEST PREMIUM DESIGN SYSTEM</p>
                </div>
            </div>
        </div>
    );
}
