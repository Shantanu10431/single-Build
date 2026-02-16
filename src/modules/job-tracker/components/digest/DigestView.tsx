import { Job } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ScoreBadge } from "@/components/dashboard/ScoreBadge";
import { ExternalLink } from "lucide-react";

interface DigestViewProps {
    jobs: (Job & { score: number })[];
    date: string;
}

export function DigestView({ jobs, date }: DigestViewProps) {
    return (
        <div className="bg-white text-black border border-muted shadow-sm max-w-2xl mx-auto rounded-lg overflow-hidden">
            {/* Email Header */}
            <div className="bg-primary/5 border-b border-primary/10 p-8 text-center">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Your 9AM Job Digest
                </h2>
                <p className="text-muted-foreground uppercase tracking-widest text-xs font-medium">
                    {date}
                </p>
            </div>

            {/* Email Body */}
            <div className="p-6 md:p-8 space-y-8">
                {jobs.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No matching jobs found for today.
                    </div>
                ) : (
                    jobs.map((job, index) => (
                        <div key={job.id} className="border-b border-muted pb-6 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-lg text-foreground leading-snug">
                                        {index + 1}. {job.title}
                                    </h3>
                                    <div className="text-muted-foreground text-sm font-medium">
                                        {job.company} • {job.location} ({job.mode})
                                    </div>
                                </div>
                                <ScoreBadge score={job.score} />
                            </div>

                            <div className="text-sm text-foreground/80 mb-3 line-clamp-2">
                                {job.experience} • {job.salaryRange}
                            </div>

                            <a
                                href={job.applyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <span className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                                    Apply Now <ExternalLink className="w-3 h-3" />
                                </span>
                            </a>
                        </div>
                    ))
                )}
            </div>

            {/* Email Footer */}
            <div className="bg-muted/10 border-t border-muted p-6 text-center text-xs text-muted-foreground">
                <p>This digest was generated based on your preferences.</p>
                <p className="mt-1">© 2026 Job Notification Tracker</p>
            </div>
        </div>
    );
}
