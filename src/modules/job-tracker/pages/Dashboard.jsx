
import React, { useState, useMemo } from 'react';
import { jobs } from '../data/jobs';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import FilterBar from '../components/FilterBar';
import { calculateMatchScore } from '../utils/scoring';

export default function Dashboard() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobs, setSavedJobs] = useState(() => {
        return JSON.parse(localStorage.getItem('savedJobs') || '[]');
    });
    const [jobStatuses, setJobStatuses] = useState(() => {
        return JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
    });
    const [preferences] = useState(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        return savedPrefs ? JSON.parse(savedPrefs) : null;
    });
    const [showMatchesOnly, setShowMatchesOnly] = useState(false);
    const [toast, setToast] = useState(null);
    const [filters, setFilters] = useState({
        keyword: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        status: '',
        sort: 'Latest'
    });

    const handleSave = (jobId) => {
        let updatedSaved;
        if (savedJobs.includes(jobId)) {
            updatedSaved = savedJobs.filter(id => id !== jobId);
        } else {
            updatedSaved = [...savedJobs, jobId];
        }
        setSavedJobs(updatedSaved);
        localStorage.setItem('savedJobs', JSON.stringify(updatedSaved));
    };

    const handleStatusChange = (jobId, newStatus) => {
        const updatedStatuses = {
            ...jobStatuses,
            [jobId]: {
                status: newStatus,
                date: new Date().toISOString()
            }
        };
        setJobStatuses(updatedStatuses);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(updatedStatuses));

        // Toast
        setToast(`Status updated: ${newStatus}`);
        setTimeout(() => setToast(null), 3000);
    };

    // Compute Scored Jobs
    const scoredJobs = useMemo(() => {
        return jobs.map(job => {
            const { score, color } = calculateMatchScore(job, preferences);
            return { ...job, matchScore: score, matchColor: color };
        });
    }, [preferences]);

    // Filter & Sort
    const displayedJobs = useMemo(() => {
        let result = scoredJobs;

        // 1. Matches Only Toggle
        if (showMatchesOnly && preferences) {
            result = result.filter(job => job.matchScore >= (preferences.minMatchScore || 40));
        }

        // 2. Filter Bar Logic (AND)
        if (filters.keyword) {
            const k = filters.keyword.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(k) ||
                job.company.toLowerCase().includes(k)
            );
        }
        if (filters.location) {
            result = result.filter(job => job.location === filters.location);
        }
        if (filters.mode) {
            result = result.filter(job => job.mode === filters.mode);
        }
        if (filters.experience) {
            result = result.filter(job => job.experience === filters.experience);
        }
        if (filters.source) {
            result = result.filter(job => job.source === filters.source);
        }

        // Status Filter
        if (filters.status) {
            result = result.filter(job => {
                const currentStatus = jobStatuses[job.id]?.status || 'Not Applied';
                return currentStatus === filters.status;
            });
        }

        // 3. Sorting
        result = [...result].sort((a, b) => {
            if (filters.sort === 'Match Score') {
                return b.matchScore - a.matchScore;
            }
            if (filters.sort === 'Salary') {
                const getSalaryVal = (s) => parseInt(s.replace(/[^0-9]/g, '')) || 0;
                return getSalaryVal(b.salaryRange) - getSalaryVal(a.salaryRange);
            }
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        return result;
    }, [scoredJobs, showMatchesOnly, filters, preferences, jobStatuses]);

    return (
        <div className="kn-route-page" style={{ maxWidth: '100%' }}>

            {/* Toast Notification */}
            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: '#333',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    zIndex: 2000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    {toast}
                </div>
            )}

            <div style={{ maxWidth: 'var(--kn-text-measure)', margin: '0 auto' }}>
                <h1 className="kn-route-page__title">Dashboard</h1>
                <p className="kn-route-page__subtext" style={{ marginBottom: 'var(--kn-space-3)' }}>
                    {preferences ? (
                        `Found ${displayedJobs.length} jobs based on your criteria.`
                    ) : (
                        <span style={{ color: 'var(--kn-accent)', fontWeight: 600 }}>
                            Set your preferences in Settings to activate intelligent matching.
                        </span>
                    )}
                </p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Toggle & Filter Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kn-space-2)' }}>
                    <FilterBar filters={filters} setFilters={setFilters} />

                    {preferences && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--kn-space-3)' }}>
                            <input
                                type="checkbox"
                                id="matchesToggle"
                                checked={showMatchesOnly}
                                onChange={(e) => setShowMatchesOnly(e.target.checked)}
                                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                            <label htmlFor="matchesToggle" style={{ fontSize: '14px', cursor: 'pointer', fontWeight: 500 }}>
                                Show only jobs above my threshold ({preferences.minMatchScore}%)
                            </label>
                        </div>
                    )}
                </div>

                {/* Results Grid */}
                {displayedJobs.length > 0 ? (
                    <div className="kn-layout-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 'var(--kn-space-3)'
                    }}>
                        {displayedJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={savedJobs.includes(job.id)}
                                onSave={handleSave}
                                onView={setSelectedJob}
                                matchScore={preferences ? job.matchScore : undefined}
                                matchColor={preferences ? job.matchColor : undefined}
                                status={jobStatuses[job.id]?.status}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="kn-card" style={{ textAlign: 'center', padding: 'var(--kn-space-5)' }}>
                        <h3 style={{ fontSize: 'var(--kn-heading3-size)', color: 'var(--kn-text-muted)' }}>No matches found</h3>
                        <p>Try adjusting your filters or lowering your match threshold in Settings.</p>
                    </div>
                )}
            </div>

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
}
