"use client";

import { Job } from "@/lib/data";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Bookmark, Building2, MapPin, Clock, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Dialog } from "../ui/Dialog";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "./ScoreBadge";

interface JobCardProps {
    job: Job;
    isSaved?: boolean;
    onToggleSave: (id: string) => void;
    matchScore?: number;
    status?: "Not Applied" | "Applied" | "Rejected" | "Selected";
    onStatusChange?: (id: string, newStatus: "Not Applied" | "Applied" | "Rejected" | "Selected") => void;
}

export function JobCard({ job, isSaved = false, onToggleSave, matchScore, status = "Not Applied", onStatusChange }: JobCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusColors = {
        "Not Applied": "bg-muted text-muted-foreground border-muted",
        "Applied": "bg-blue-100 text-blue-700 border-blue-200",
        "Rejected": "bg-red-100 text-red-700 border-red-200",
        "Selected": "bg-green-100 text-green-700 border-green-200"
    };

    return (
        <>
            <Card className="flex flex-col gap-4 hover:border-primary/20 transition-colors group relative">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                {job.title}
                            </h3>
                            {typeof matchScore === 'number' && matchScore > 0 && (
                                <ScoreBadge score={matchScore} />
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{job.company}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                    <span className="bg-muted/30 px-2 py-1 rounded flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location} ({job.mode})
                    </span>
                    <span className="bg-muted/30 px-2 py-1 rounded">
                        {job.experience}
                    </span>
                    <span className="bg-success/10 text-success px-2 py-1 rounded border border-success/20">
                        {job.salaryRange}
                    </span>
                </div>

                <div className="mt-auto pt-4 border-t border-muted flex items-center justify-between">
                    <select
                        value={status}
                        onChange={(e) => onStatusChange && onStatusChange(job.id, e.target.value as any)}
                        className={cn(
                            "h-8 px-2 rounded text-xs font-medium border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20",
                            statusColors[status] || statusColors["Not Applied"]
                        )}
                    >
                        <option value="Not Applied">Not Applied</option>
                        <option value="Applied">Applied</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Selected">Selected</option>
                    </select>

                    <div className="flex gap-2">
                        <button
                            onClick={() => onToggleSave(job.id)}
                            className={cn(
                                "p-1.5 rounded-full transition-colors border",
                                isSaved
                                    ? "text-primary bg-primary/10 border-primary/20"
                                    : "text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                            )}
                            title={isSaved ? "Unsave" : "Save"}
                        >
                            <Bookmark className={cn("w-4 h-4", isSaved && "fill-current")} />
                        </button>

                        <Button
                            variant="secondary"
                            className="h-8 px-4 text-xs"
                            onClick={() => setIsModalOpen(true)}
                        >
                            View
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Details Modal */}
            <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="space-y-6">
                    <div className="border-b border-muted pb-4">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-serif font-bold">{job.title}</h2>
                            {typeof matchScore === 'number' && <ScoreBadge score={matchScore} className="text-sm px-3 py-1" />}
                        </div>
                        <div className="text-lg text-muted-foreground">{job.company}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-muted-foreground block mb-1">Location</span>
                            <span className="font-medium">{job.location} ({job.mode})</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block mb-1">Salary</span>
                            <span className="font-medium text-success">{job.salaryRange}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block mb-1">Experience</span>
                            <span className="font-medium">{job.experience}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground block mb-1">Posted</span>
                            <span className="font-medium">{job.postedDaysAgo} days ago via {job.source}</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold mb-2">Description</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                            {job.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-serif font-bold mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-muted rounded-full text-xs text-foreground font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-muted flex justify-end gap-3">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                            <Button className="gap-2">
                                Apply Now <ExternalLink className="w-4 h-4" />
                            </Button>
                        </a>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
