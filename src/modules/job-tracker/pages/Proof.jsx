import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/layout/ContextHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card } from '../components/ui/Card';
import { CheckCircle2, Copy, ExternalLink, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const STEPS = [
    { id: 1, label: "Design System Setup", status: "completed" },
    { id: 2, label: "Global Layout Implementation", status: "completed" },
    { id: 3, label: "Core Components", status: "completed" },
    { id: 4, label: "Job Notification Tracker Routes", status: "completed" },
    { id: 5, label: "App Skeleton Implementation", status: "completed" },
    { id: 6, label: "Data Integration & Dashboard", status: "completed" },
    { id: 7, label: "Preference Logic & Scoring Engine", status: "completed" },
    { id: 8, label: "Daily Digest Engine", status: "completed" },
];

export default function ProofPage() {
    const [links, setLinks] = useState({
        lovable: "",
        github: "",
        deployed: ""
    });
    const [testsPassed, setTestsPassed] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load Links
        const savedLinks = localStorage.getItem("jobTrackerSubmission");
        if (savedLinks) {
            try {
                setLinks(JSON.parse(savedLinks));
            } catch (e) {
                console.error(e);
            }
        }

        // Load Test Status
        const savedTests = localStorage.getItem("jobTrackerTests");
        if (savedTests) {
            try {
                const checked = JSON.parse(savedTests);
                setTestsPassed(checked.length);
            } catch (e) {
                console.error(e);
            }
        }
        setIsLoading(false);
    }, []);

    const updateLink = (key, value) => {
        const newLinks = { ...links, [key]: value };
        setLinks(newLinks);
        localStorage.setItem("jobTrackerSubmission", JSON.stringify(newLinks));
    };

    const isShippable = testsPassed >= 10 && links.lovable && links.github && links.deployed;

    const copySubmission = () => {
        const text = `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`;

        navigator.clipboard.writeText(text).then(() => {
            alert("Submission copied to clipboard!");
        });
    };

    return (
        <div className="bg-background min-h-screen pb-20 job-tracker-layout">
            <ContextHeader
                title="Final Proof"
                description="Project 1 — Job Notification Tracker"
            />

            <main className="max-w-[1200px] mx-auto px-6 py-10 grid md:grid-cols-[1fr_400px] gap-10">

                <div className="space-y-10">
                    {/* 1. Step Summary */}
                    <section>
                        <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            Development Steps
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {STEPS.map((step) => (
                                <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                                        ✓
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 2. Artifact Collection */}
                    <section>
                        <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                            <ExternalLink className="w-5 h-5 text-primary" />
                            Artifact Collection
                        </h2>
                        <Card className="p-6 space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="lovable">Lovable Project Link</Label>
                                <Input
                                    id="lovable"
                                    placeholder="https://lovable.dev/..."
                                    value={links.lovable}
                                    onChange={(e) => updateLink("lovable", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="github">GitHub Repository Link</Label>
                                <Input
                                    id="github"
                                    placeholder="https://github.com/..."
                                    value={links.github}
                                    onChange={(e) => updateLink("github", e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deployed">Live Deployment URL</Label>
                                <Input
                                    id="deployed"
                                    placeholder="https://vercel.app/..."
                                    value={links.deployed}
                                    onChange={(e) => updateLink("deployed", e.target.value)}
                                />
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Sidebar: Status & Action */}
                <div className="space-y-6">
                    <Card className={cn(
                        "p-6 border-2",
                        isShippable ? "border-green-100 bg-green-50/30" : "border-muted bg-muted/5"
                    )}>
                        <h3 className="font-serif font-bold text-lg mb-2">Project Status</h3>

                        <div className="flex items-center gap-2 mb-6">
                            {isShippable ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-600 text-white text-sm font-bold shadow-sm">
                                    <ShieldCheck className="w-4 h-4" /> Shipped
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-bold">
                                    <Clock className="w-4 h-4" /> In Progress
                                </span>
                            )}
                        </div>

                        <div className="space-y-4 text-sm text-muted-foreground mb-6">
                            <div className="flex justify-between items-center">
                                <span>Test Checklist</span>
                                <span className={cn(
                                    "font-medium",
                                    testsPassed >= 10 ? "text-green-600" : "text-amber-600"
                                )}>
                                    {testsPassed}/10 Passed
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Artifact Links</span>
                                <span className={cn(
                                    "font-medium",
                                    (links.lovable && links.github && links.deployed) ? "text-green-600" : "text-amber-600"
                                )}>
                                    {Number(!!links.lovable) + Number(!!links.github) + Number(!!links.deployed)}/3 Ready
                                </span>
                            </div>
                        </div>

                        {isShippable ? (
                            <div className="space-y-4">
                                <div className="p-3 bg-green-100/50 rounded text-green-800 text-sm font-medium text-center border border-green-200">
                                    Project 1 Shipped Successfully.
                                </div>
                                <Button className="w-full gap-2" onClick={copySubmission}>
                                    <Copy className="w-4 h-4" /> Copy Final Submission
                                </Button>
                            </div>
                        ) : (
                            <div className="p-3 bg-amber-100/50 rounded text-amber-800 text-sm font-medium text-center border border-amber-200">
                                <AlertTriangle className="w-4 h-4 inline mr-1 mb-0.5" />
                                Please complete all requirements to ship.
                            </div>
                        )}
                    </Card>

                    <div className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
                        Ensure all links are publicly accessible before copying the final submission.
                    </div>
                </div>

            </main>
        </div>
    );
}
