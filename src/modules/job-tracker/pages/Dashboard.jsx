import React, { useState, useEffect, useMemo } from 'react';
import { ContextHeader } from '../components/layout/ContextHeader';
import { FilterBar } from '../components/dashboard/FilterBar';
import { JobCard } from '../components/dashboard/JobCard';
import { JOBS } from '../lib/data';
import { Input } from '../components/ui/Input';
import { calculateMatchScore } from '../lib/scoring';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { AlertTriangle, FolderSearch } from 'lucide-react';

export default function DashboardPage() {
    const [savedIds, setSavedIds] = useState([]);
    const [statusMap, setStatusMap] = useState({});
    const [prefs, setPrefs] = useState(null);
    // const [isLoading, setIsLoading] = useState(true); // Unused

    // Filter States
    const [search, setSearch] = useState("");
    const [showMatchesOnly, setShowMatchesOnly] = useState(false);
    const [filters, setFilters] = useState({
        location: "",
        experience: "",
        source: "",
        sort: "latest",
        status: ""
    });

    // Load Initial Data
    useEffect(() => {
        const saved = localStorage.getItem("kodnest_saved_jobs");
        if (saved) {
            const parsed = JSON.parse(saved);
            setTimeout(() => setSavedIds(parsed), 0);
        }

        const statusData = localStorage.getItem("jobTrackerStatus");
        if (statusData) {
            const parsed = JSON.parse(statusData);
            setTimeout(() => setStatusMap(parsed), 0);
        }

        const prefString = localStorage.getItem("jobTrackerPreferences");
        if (prefString) {
            try {
                const parsed = JSON.parse(prefString);
                setTimeout(() => setPrefs(parsed), 0);
            } catch (e) {
                console.error("Error parsing prefs", e);
            }
        }
    }, []);

    const toggleSave = (id) => {
        const newSaved = savedIds.includes(id)
            ? savedIds.filter(savedId => savedId !== id)
            : [...savedIds, id];
        setSavedIds(newSaved);
        localStorage.setItem("kodnest_saved_jobs", JSON.stringify(newSaved));
    };

    const handleStatusChange = (id, newStatus) => {
        const updatedMap = {
            ...statusMap,
            [id]: {
                status: newStatus,
                updatedAt: new Date().toISOString()
            }
        };
        setStatusMap(updatedMap);
        localStorage.setItem("jobTrackerStatus", JSON.stringify(updatedMap));

        // Simple toast simulation
        console.log(`Status for job ${id} updated to ${newStatus}`);
    };

    // Compute Scores & Filter
    const filteredJobs = useMemo(() => {
        let result = JOBS.map(job => ({
            ...job,
            score: prefs ? calculateMatchScore(job, prefs) : 0,
            status: statusMap[job.id]?.status || "Not Applied"
        }));

        // 1. Matches Only Toggle
        if (showMatchesOnly && prefs) {
            result = result.filter(j => j.score >= prefs.minMatchScore);
        }

        // 2. Keyword Search
        if (search) {
            const q = search.toLowerCase();
            result = result.filter(j =>
                j.title.toLowerCase().includes(q) ||
                j.company.toLowerCase().includes(q) ||
                j.skills.some(s => s.toLowerCase().includes(q))
            );
        }

        // 3. Dropdown Filters
        if (filters.location) {
            result = result.filter(j => j.location === filters.location);
        }
        if (filters.experience) {
            result = result.filter(j => j.experience === filters.experience);
        }
        if (filters.source) {
            result = result.filter(j => j.source === filters.source);
        }
        if (filters.status) {
            result = result.filter(j => j.status === filters.status);
        }

        // 4. Sorting
        result.sort((a, b) => {
            if (filters.sort === "score") {
                return b.score - a.score; // Descending
            }
            return a.postedDaysAgo - b.postedDaysAgo; // Ascending (Latest first)
        });

        return result;
    }, [prefs, search, showMatchesOnly, filters, statusMap]);


    return (
        <div className="bg-background min-h-screen pb-20 job-tracker-layout">
            <ContextHeader
                title="Dashboard"
                description="Tracking your active job search progress."
            />

            <FilterBar
                onSearchChange={setSearch}
                onFilterChange={(k, v) => setFilters(prev => ({ ...prev, [k]: v }))}
                filters={filters}
                showMatchesOnly={showMatchesOnly}
                onToggleMatches={() => setShowMatchesOnly(!showMatchesOnly)}
            />

            {/* Preface Banner */}
            {!prefs && (
                <div className="mx-6 mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        <span className="text-sm font-medium text-warning-foreground">
                            Intelligent matching is inactive. Set your preferences to see match scores.
                        </span>
                    </div>
                    <Link to="/jobs/settings">
                        <Button size="sm" variant="secondary" className="h-8">Set Preferences</Button>
                    </Link>
                </div>
            )}

            <main className="max-w-[1600px] mx-auto px-6 py-8">
                <div className="mb-6 text-sm text-muted-foreground font-medium flex justify-between items-center">
                    <span>Showing {filteredJobs.length} relevant opportunities</span>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-6">
                            <FolderSearch className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-foreground mb-2">
                            No matches found
                        </h3>
                        <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
                            Try adjusting your filters or lowering your match threshold in settings.
                        </p>
                        <Button variant="secondary" onClick={() => {
                            setSearch("");
                            setFilters({ location: "", experience: "", source: "", sort: "latest", status: "" });
                            setShowMatchesOnly(false);
                        }}>
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={savedIds.includes(job.id)}
                                onToggleSave={toggleSave}
                                matchScore={prefs ? job.score : undefined}
                                status={statusMap[job.id]?.status || "Not Applied"}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
