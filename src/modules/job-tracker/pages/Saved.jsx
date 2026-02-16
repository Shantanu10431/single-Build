import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/layout/ContextHeader';
import { JobCard } from '../components/dashboard/JobCard';
import { JOBS } from '../lib/data';
import { Bookmark } from 'lucide-react';

export default function SavedPage() {
    const [savedJobs, setSavedJobs] = useState([]);
    const [savedIds, setSavedIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load IDs
        const saved = localStorage.getItem("kodnest_saved_jobs");
        const ids = saved ? JSON.parse(saved) : [];
        setSavedIds(ids);

        // Filter JOBS
        const filtered = JOBS.filter(job => ids.includes(job.id));
        setSavedJobs(filtered);
        setIsLoading(false);
    }, []);

    const toggleSave = (id) => {
        const newSavedIds = savedIds.filter(savedId => savedId !== id);
        setSavedIds(newSavedIds);
        localStorage.setItem("kodnest_saved_jobs", JSON.stringify(newSavedIds));

        // Update local list
        setSavedJobs(prev => prev.filter(job => job.id !== id));
    };

    if (isLoading) {
        return null; // Or skeleton
    }

    return (
        <div className="bg-background min-h-screen pb-20 job-tracker-layout">
            <ContextHeader
                title="Saved Jobs"
                description="Your curated list of potential opportunities."
            />

            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {savedJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-6">
                            <Bookmark className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                            Your collection is empty
                        </h3>
                        <p className="text-muted-foreground max-w-sm leading-relaxed">
                            Jobs you bookmark from the dashboard will appear here for safe keeping.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={true}
                                onToggleSave={toggleSave}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
