
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from '../data/jobs';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';

export default function Saved() {
    const [savedJobIds, setSavedJobIds] = useState(() => {
        return JSON.parse(localStorage.getItem('savedJobs') || '[]');
    });
    const [jobStatuses, setJobStatuses] = useState(() => {
        return JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
    });
    const [selectedJob, setSelectedJob] = useState(null);

    const handleSave = (jobId) => {
        let updatedSaved;
        if (savedJobIds.includes(jobId)) {
            updatedSaved = savedJobIds.filter(id => id !== jobId);
        } else {
            updatedSaved = [...savedJobIds, jobId];
        }
        setSavedJobIds(updatedSaved);
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
    };

    const savedJobsList = jobs.filter(job => savedJobIds.includes(job.id));

    return (
        <div className="kn-route-page" style={{ maxWidth: '100%' }}>
            <div style={{ maxWidth: 'var(--kn-text-measure)', margin: '0 auto' }}>
                <h1 className="kn-route-page__title">Saved Jobs</h1>
                <p className="kn-route-page__subtext" style={{ marginBottom: 'var(--kn-space-3)' }}>
                    {savedJobsList.length > 0
                        ? `You have saved ${savedJobsList.length} jobs.`
                        : 'Jobs you save will appear here.'}
                </p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {savedJobsList.length > 0 ? (
                    <div className="kn-layout-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 'var(--kn-space-3)'
                    }}>
                        {savedJobsList.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                isSaved={true}
                                onSave={handleSave}
                                onView={setSelectedJob}
                                status={jobStatuses[job.id]?.status}
                                onStatusChange={handleStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="kn-card" style={{ textAlign: 'center', padding: 'var(--kn-space-5)' }}>
                        <h3 style={{ fontSize: 'var(--kn-heading3-size)', color: 'var(--kn-text-muted)' }}>No saved jobs yet</h3>
                        <p><Link to="/dashboard" style={{ color: 'var(--kn-accent)', textDecoration: 'none', fontWeight: 600 }}>Go to the Dashboard</Link> to find and save opportunities.</p>
                    </div>
                )}
            </div>

            {selectedJob && (
                <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
            )}
        </div>
    );
}
