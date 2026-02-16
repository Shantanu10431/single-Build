import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/layout/ContextHeader';
import { Button } from '../components/ui/Button';
import { DigestView } from '../components/digest/DigestView';
import { JOBS } from '../lib/data';
import { calculateMatchScore } from '../lib/scoring';
import { Mail, Copy, Loader2, Sparkles, RefreshCw, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { cn } from '../lib/utils';

export default function DigestPage() {
    const [digest, setDigest] = useState(null);
    const [prefs, setPrefs] = useState(null);
    const [recentUpdates, setRecentUpdates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const todayDate = format(new Date(), "yyyy-MM-dd");
    const displayDate = format(new Date(), "EEEE, MMMM do, yyyy");

    useEffect(() => {
        // 1. Load Prefs
        const prefString = localStorage.getItem("jobTrackerPreferences");
        if (prefString) {
            try {
                setPrefs(JSON.parse(prefString));
            } catch (e) {
                console.error("Error parsing prefs", e);
            }
        }

        // 2. Load Existing Digest
        const savedDigest = localStorage.getItem(`jobTrackerDigest_${todayDate}`);
        if (savedDigest) {
            try {
                setDigest(JSON.parse(savedDigest));
            } catch (e) {
                console.error("Error parsing saved digest", e);
            }
        }

        // 3. Load Recent Status Updates
        const statusData = localStorage.getItem("jobTrackerStatus");
        if (statusData) {
            try {
                const statusMap = JSON.parse(statusData);
                const updates = Object.entries(statusMap)
                    .map(([id, record]) => {
                        const job = JOBS.find(j => j.id === id);
                        if (!job) return null;
                        return { ...job, ...record };
                    })
                    .filter(item => item !== null)
                    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                    .slice(0, 5); // Take top 5 recent

                setRecentUpdates(updates);
            } catch (e) {
                console.error("Error parsing status updates", e);
            }
        }

        setIsLoading(false);
    }, [todayDate]);

    const generateDigest = () => {
        if (!prefs) return;

        setIsGenerating(true);

        // Simulate API delay
        setTimeout(() => {
            let scoredJobs = JOBS.map(job => ({
                ...job,
                score: calculateMatchScore(job, prefs)
            }));

            // Filter non-zero matches (optional, but good for quality)
            // keeping strict rules: Sort Score Desc -> Posted Asc
            scoredJobs.sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return a.postedDaysAgo - b.postedDaysAgo;
            });

            const top10 = scoredJobs.slice(0, 10);

            setDigest(top10);
            localStorage.setItem(`jobTrackerDigest_${todayDate}`, JSON.stringify(top10));
            setIsGenerating(false);
        }, 1500);
    };

    const copyToClipboard = () => {
        if (!digest) return;

        const text = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company}\n` +
            `   Score: ${job.score} | ${job.location}\n` +
            `   Link: ${job.applyUrl}\n`
        ).join("\n");

        const header = `My 9AM Job Digest - ${displayDate}\n\n`;

        navigator.clipboard.writeText(header + text).then(() => {
            alert("Digest copied to clipboard!");
        });
    };

    const emailDraft = () => {
        if (!digest) return;

        const subject = encodeURIComponent(`My 9AM Job Digest - ${displayDate}`);
        const body = digest.map((job, i) =>
            `${i + 1}. ${job.title} at ${job.company}%0D%0A` +
            `   Score: ${job.score} | ${job.location}%0D%0A` +
            `   Link: ${job.applyUrl}%0D%0A`
        ).join("%0D%0A");

        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    return (
        <div className="bg-background min-h-screen pb-20 job-tracker-layout">
            <ContextHeader
                title="Daily Digest"
                description="Your morning briefing of the best matches."
            />

            <main className="max-w-[1600px] mx-auto px-6 py-10">

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center p-20">
                        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    </div>
                )}

                {/* State 1: No Prefs */}
                {!isLoading && !prefs && (
                    <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-muted rounded-lg bg-muted/5">
                        <h3 className="text-xl font-serif font-bold mb-2">Personalization Required</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            We cannot generate a personalized digest without knowing your preferences.
                        </p>
                        <Link to="/jobs/settings">
                            <Button>Set Preferences</Button>
                        </Link>
                    </div>
                )}

                {/* State 2: No Digest Yet */}
                {!isLoading && prefs && !digest && (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8 text-muted-foreground" />
                        </div>

                        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                            Ready for your briefing?
                        </h3>

                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-8">
                            Generate your personalized top 10 list for today.
                            <br />
                            <span className="text-xs text-muted-foreground/70">(Demo: Daily 9AM trigger simulated manually)</span>
                        </p>

                        <Button onClick={generateDigest} disabled={isGenerating} className="min-w-[200px]">
                            {isGenerating ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing 60 Jobs...</>
                            ) : (
                                <><Sparkles className="w-4 h-4 mr-2" /> Generate 9AM Digest</>
                            )}
                        </Button>
                    </div>
                )}

                {/* State 3: Digest View */}
                {!isLoading && digest && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid md:grid-cols-[1fr_300px] gap-8 items-start">

                        {/* Left: Main Digest */}
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-sm text-muted-foreground font-medium">
                                    Matches found: {digest.length}
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                                        <Copy className="w-4 h-4 mr-2" /> Copy
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={emailDraft}>
                                        <Mail className="w-4 h-4 mr-2" /> Email
                                    </Button>
                                    <Button variant="secondary" size="sm" onClick={generateDigest} title="Regenerate">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <DigestView jobs={digest} date={displayDate} />
                        </div>

                        {/* Right: Recent Updates */}
                        <div className="bg-white border border-muted rounded-lg p-6 shadow-sm sticky top-20">
                            <div className="flex items-center gap-2 mb-4 text-foreground font-serif font-bold text-lg">
                                <Activity className="w-5 h-5 text-primary" />
                                Recent Updates
                            </div>

                            {recentUpdates.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-8">
                                    No recent status updates. Start tracking your applications!
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {recentUpdates.map(job => (
                                        <div key={job.id} className="text-sm border-b border-muted pb-3 last:border-0">
                                            <div className="font-medium text-foreground">{job.title}</div>
                                            <div className="text-xs text-muted-foreground mb-2">{job.company}</div>
                                            <div className="flex justify-between items-center">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                                    job.status === "Applied" && "bg-blue-100 text-blue-700",
                                                    job.status === "Rejected" && "bg-red-100 text-red-700",
                                                    job.status === "Selected" && "bg-green-100 text-green-700",
                                                    job.status === "Not Applied" && "bg-muted text-muted-foreground"
                                                )}>
                                                    {job.status}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {format(parseISO(job.updatedAt), "MMM d")}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                )
                }

            </main >
        </div >
    );
}
