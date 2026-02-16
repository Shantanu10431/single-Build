
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { RESUME_STEPS } from '../data/steps';
import { ArrowLeft, ArrowRight, CheckCircle, Lock } from 'lucide-react';
import { Card } from '../../components/ui/card';

export default function ResumeLayout() {
    const location = useLocation();
    const currentStep = RESUME_STEPS.find(step => location.pathname.includes(step.route));
    // Context Header Data
    const stepLabel = currentStep ? `Project 3 — Step ${currentStep.stepNumber} of 8` : "Project 3 — Final Verification";

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Top Bar (Context Header) */}
            <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-900">AI Resume Builder</span>
                    <span className="h-4 w-px bg-slate-300"></span>
                    <span className="text-slate-500 font-medium">{stepLabel}</span>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="http://localhost:5173"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <span>View Final Output</span>
                        <ArrowRight size={16} />
                    </a>
                    {/* Dynamic Status Badge could go here */}
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
                        Build Track
                    </span>
                </div>
            </div>

            {/* Main Content Area - Split View */}
            <div className="flex-1 flex overflow-hidden">
                {/* Main Workspace (70%) */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-8 border-r border-slate-200">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
