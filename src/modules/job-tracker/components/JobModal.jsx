
import React from 'react';

export default function JobModal({ job, onClose }) {
    if (!job) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(2px)'
        }} onClick={onClose}>
            <div
                className="kn-card"
                style={{
                    width: '90%',
                    maxWidth: '600px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--kn-space-3)' }}>
                    <h2 style={{ fontSize: 'var(--kn-heading2-size)', margin: 0 }}>{job.title}</h2>
                    <button
                        onClick={onClose}
                        className="kn-btn kn-btn--secondary"
                        style={{ padding: '4px 8px', fontSize: '20px', lineHeight: 1, border: 'none' }}
                    >
                        &times;
                    </button>
                </div>

                <p style={{ fontSize: 'var(--kn-heading4-size)', fontWeight: 600, color: 'var(--kn-text-muted)' }}>
                    {job.company} • {job.location} ({job.mode})
                </p>

                <div className="kn-stack kn-stack--3">
                    <div>
                        <h4 style={{ marginBottom: 'var(--kn-space-1)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--kn-text-muted)' }}>Description</h4>
                        <p style={{ lineHeight: '1.6' }}>{job.description}</p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: 'var(--kn-space-1)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--kn-text-muted)' }}>Skills</h4>
                        <div className="kn-flex-wrap">
                            {job.skills.map((skill, idx) => (
                                <span key={idx} className="kn-status">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--kn-space-3)', borderTop: '1px solid var(--kn-border)' }}>
                        <a
                            href={job.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="kn-btn kn-btn--primary"
                            style={{ width: '100%', textAlign: 'center' }}
                        >
                            Apply Now on {job.source}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
