
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Lock, CheckCircle, Package, ArrowLeft } from 'lucide-react';

export default function Ship() {
    const navigate = useNavigate();
    const [isUnlocked] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            const items = JSON.parse(saved);
            const passedCount = Object.values(items).filter(Boolean).length;
            return passedCount === 10;
        }
        return false;
    });

    if (!isUnlocked) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                    <Lock className="w-10 h-10 text-slate-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Ship Page Locked</h1>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                        You must complete all verification steps in the Test Checklist before accessing the Ship page.
                    </p>
                </div>
                <button
                    onClick={() => navigate('/prp/07-test')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition"
                >
                    Go to Checklist
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
            <div className="text-center py-10">
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Package className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-slate-900">Ready to Ship!</h1>
                <p className="text-xl text-slate-600 mt-2">
                    All tests passed. The Placement Readiness Platform is robust and ready for deployment.
                </p>
            </div>

            <Card className="border-green-200 bg-green-50/50">
                <CardContent className="p-8 text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                    <h3 className="text-xl font-semibold text-green-800">Verification Complete</h3>
                    <p className="text-green-700">
                        The Analysis Engine, Persistence Layer, and UI Components have been verified against the premium standard.
                    </p>
                </CardContent>
            </Card>

            <div className="text-center">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-2 mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
            </div>
        </div>
    );
}
