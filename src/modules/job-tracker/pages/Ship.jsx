import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/layout/ContextHeader';
import { Button } from '../components/ui/Button';
import { Rocket, Lock, CheckCircle2, PartyPopper } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ShipPage() {
    const [isLocked, setIsLocked] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const saved = localStorage.getItem("jobTrackerTests");
        let passed = 0;
        if (saved) {
            try {
                const checkedItems = JSON.parse(saved);
                passed = checkedItems.length;
            } catch (e) {
                console.error(e);
            }
        }

        if (passed >= 10) {
            setIsLocked(false);
        } else {
            setIsLocked(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) return null;

    if (isLocked) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-background job-tracker-layout">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Access Denied</h1>
                <p className="text-muted-foreground max-w-md mb-8">
                    You cannot ship the product until all 10 verification tests have passed.
                    Please complete the checklist first.
                </p>
                <Link to="/jobs/prp/07-test">
                    <Button>Go to Verification Checklist</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen job-tracker-layout">
            <ContextHeader
                title="Ship It!"
                description="Deployment ready."
            />

            <main className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
                    <Rocket className="w-12 h-12 text-green-600" />
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                    All Systems Go!
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                    Congratulations! The Job Notification Tracker has passed all verification checks.
                    <br />
                    The codebase is stable, features are persistent, and the UI is locked in.
                </p>

                <div className="bg-muted/30 p-8 rounded-lg border border-dashed border-muted max-w-md w-full mb-10">
                    <h3 className="font-bold mb-4 flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Pre-flight Summary
                    </h3>
                    <ul className="text-sm text-left space-y-2 text-muted-foreground">
                        <li>✓ Design System adhered to strictly</li>
                        <li>✓ 60 Integration-ready data points</li>
                        <li>✓ 10/10 Test cases passed</li>
                        <li>✓ Zero critical bugs found</li>
                    </ul>
                </div>

                <div className="flex gap-4">
                    <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                        <PartyPopper className="w-5 h-5 mr-2" />
                        Deploy Now (Simulated)
                    </Button>
                    <Link to="/jobs/dashboard">
                        <Button variant="secondary" size="lg">
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
