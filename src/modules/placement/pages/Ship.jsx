import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Lock, Rocket, CheckCircle, ArrowLeft } from 'lucide-react';
// import { cn } from '../lib/utils'; // Not used in this file but standard

const TESTS_COUNT = 10;
const STORAGE_KEY = "prp_checklist_status";

export default function ShipPage() {
    const [isLocked] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const checkedItems = JSON.parse(stored);
                const passedCount = Object.values(checkedItems).filter(Boolean).length;
                return passedCount !== TESTS_COUNT;
            }
            return true;
        } catch {
            return true;
        }
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Checking status...</div>;

    if (isLocked) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="max-w-md w-full border-red-200 shadow-xl">
                    <CardHeader className="text-center pb-2">
                        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-red-600" />
                        </div>
                        <CardTitle className="text-2xl text-red-700">Shipment Locked</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6">
                        <p className="text-gray-600">
                            You cannot ship until all <strong>{TESTS_COUNT} tests</strong> are passed. Please complete the pre-ship checklist first.
                        </p>
                        <Link to="/placement/prp/07-test" className="block">
                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                                <ArrowLeft className="mr-2 w-4 h-4" /> Go to Checklist
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 p-4">
            <Card className="max-w-lg w-full border-none shadow-2xl bg-white/10 backdrop-blur-md text-white">
                <CardContent className="text-center py-12 px-6 space-y-8">
                    <div className="relative">
                        <div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                            <Rocket className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute top-0 right-1/3">
                            <CheckCircle className="w-8 h-8 text-green-400 bg-white rounded-full border-2 border-white" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight">Ready to Ship!</h1>
                        <p className="text-indigo-200 text-lg">
                            All {TESTS_COUNT} tests passed. The platform is hardened, verified, and ready for deployment.
                        </p>
                    </div>

                    <div className="bg-white/10 rounded-lg p-6 text-left space-y-3 text-sm text-indigo-100">
                        <p>✓ Strict Schema Enforced</p>
                        <p>✓ Input Validation Active</p>
                        <p>✓ Robust Error Handling</p>
                        <p>✓ Premium UI Polished</p>
                    </div>

                    <Button
                        size="lg"
                        className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-lg h-14"
                        onClick={() => alert("🚀 Initiating Launch Sequence...")}
                    >
                        LAUNCH PLATFORM
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
