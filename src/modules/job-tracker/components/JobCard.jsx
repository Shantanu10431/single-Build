
import React from 'react';

export default function JobCard({ job, onSave, isSaved, onView, matchScore, matchColor, status, onStatusChange }) {

    const getStatusColor = (s) => {
        switch (s) {
            case 'Applied': return '#007bff'; // Blue
            case 'Rejected': return '#dc3545'; // Red
            case 'Selected': return '#28a745'; // Green
            default: return 'var(--kn-text-muted)'; // Grey
        }
    };

    const currentStatus = status || 'Not Applied';

    return (
        <div className="kn-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 'var(--kn-space-2)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ paddingRight: '40px' }}>
                    <h3 style={{ fontSize: 'var(--kn-heading3-size)', marginBottom: '4px' }}>{job.title}</h3>
                    <p style={{ color: 'var(--kn-text-muted)', margin: 0, fontWeight: 500 }}>{job.company}</p>
                </div>

                {/* Match Score Badge */}
                {matchScore !== undefined && matchScore > 0 && (
                    <div style={{
                        position: 'absolute',
                        top: 'var(--kn-space-2)',
                        right: 'var(--kn-space-2)',
                        background: matchColor,
                        color: '#fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }} title={`Match Score: ${matchScore}%`}>
                        {matchScore}
                    </div>
                )}
            </div>

            <div className="kn-flex-wrap" style={{ gap: 'var(--kn-space-2)', fontSize: '14px', color: 'var(--kn-text-muted)', marginTop: '4px' }}>
                <span>📍 {job.location} ({job.mode})</span>
                <span>💼 {job.experience}</span>
                <span>💰 {job.salaryRange}</span>
                <span className="kn-status" style={{ fontSize: '11px', padding: '1px 6px' }}>{job.source}</span>
            </div>

            <div style={{
                display: 'flex',
                gap: 'var(--kn-space-1)',
                flexWrap: 'wrap',
                marginTop: 'auto',
                paddingTop: 'var(--kn-space-2)'
            }}>
                {job.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} style={{
                        background: 'var(--kn-background)',
                        border: '1px solid var(--kn-border)',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '12px'
                    }}>
                        {skill}
                    </span>
                ))}
                {job.skills.length > 3 && <span style={{ fontSize: '12px', color: 'var(--kn-text-muted)', alignSelf: 'center' }}>+{job.skills.length - 3}</span>}
            </div>

            {/* Status Control */}
            <div style={{ marginTop: 'var(--kn-space-2)', paddingTop: 'var(--kn-space-2)', borderTop: '1px solid var(--kn-border)' }}>
                <select
                    value={currentStatus}
                    onChange={(e) => onStatusChange && onStatusChange(job.id, e.target.value)}
                    className="kn-input"
                    style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        width: '100%',
                        marginBottom: 'var(--kn-space-2)',
                        borderColor: getStatusColor(currentStatus),
                        color: currentStatus === 'Not Applied' ? 'inherit' : getStatusColor(currentStatus),
                        fontWeight: currentStatus === 'Not Applied' ? 'normal' : 'bold'
                    }}
                >
                    <option value="Not Applied">Status: Not Applied</option>
                    <option value="Applied">Status: Applied</option>
                    <option value="Rejected">Status: Rejected</option>
                    <option value="Selected">Status: Selected</option>
                </select>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: 'var(--kn-text-muted)' }}>
                        {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
                    </span>

                    <div style={{ display: 'flex', gap: 'var(--kn-space-1)' }}>
                        <button
                            onClick={() => onView(job)}
                            className="kn-btn kn-btn--secondary"
                            style={{ padding: '4px 12px', fontSize: '14px' }}
                        >
                            View
                        </button>
                        <button
                            onClick={() => onSave(job.id)}
                            className={`kn-btn ${isSaved ? 'kn-btn--primary' : 'kn-btn--secondary'}`}
                            style={{ padding: '4px 12px', fontSize: '14px' }}
                        >
                            {isSaved ? 'Saved' : 'Save'}
                        </button>
                        <a
                            href={job.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="kn-btn kn-btn--primary"
                            style={{ padding: '4px 12px', fontSize: '14px', textDecoration: 'none' }}
                        >
                            Apply
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
