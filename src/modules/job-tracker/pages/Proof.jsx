
import React, { useState } from 'react';

export default function Proof() {
    const [links, setLinks] = useState(() => {
        const savedLinks = localStorage.getItem('jobTrackerProofLinks');
        return savedLinks ? JSON.parse(savedLinks) : {
            lovable: '',
            github: '',
            deploy: ''
        };
    });
    const [checklistComplete] = useState(() => {
        const savedChecklist = localStorage.getItem('jobTrackerTestChecklist');
        if (savedChecklist) {
            const parsed = JSON.parse(savedChecklist);
            return Object.values(parsed).every(Boolean) && Object.keys(parsed).length >= 10;
        }
        return false;
    });
    // Derived state for shipped
    const linksValid = links.lovable && links.github && links.deploy;
    const shipped = linksValid && checklistComplete;

    const handleLinkChange = (field, value) => {
        const updated = { ...links, [field]: value };
        setLinks(updated);
        localStorage.setItem('jobTrackerProofLinks', JSON.stringify(updated));
    };

    const steps = [
        { id: 1, label: 'Init & Setup', status: 'Completed' },
        { id: 2, label: 'Dashboard & Jobs', status: 'Completed' },
        { id: 3, label: 'Scoring Engine', status: 'Completed' },
        { id: 4, label: 'Digest Engine', status: 'Completed' },
        { id: 5, label: 'Job Status Tracking', status: 'Completed' },
        { id: 6, label: 'Test Checklist', status: checklistComplete ? 'Completed' : 'Pending' },
        { id: 7, label: 'Ship Guard', status: checklistComplete ? 'Completed' : 'Pending' },
        { id: 8, label: 'Final Proof', status: shipped ? 'Completed' : 'Pending' }
    ];

    const getSubmissionText = () => {
        return `Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deploy}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(getSubmissionText());
        alert("Submission copied to clipboard!");
    };

    return (
        <div className="kn-route-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--kn-space-4)' }}>
                <h1 className="kn-route-page__title">Project 1 — Job Notification Tracker</h1>
                <div style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    background: shipped ? '#d4edda' : '#fff3cd',
                    color: shipped ? '#155724' : '#856404',
                    marginTop: 'var(--kn-space-2)'
                }}>
                    Status: {shipped ? 'Shipped' : 'In Progress'}
                </div>
            </div>

            <div className="kn-layout-grid" style={{ gridTemplateColumns: '1fr 1.5fr', gap: 'var(--kn-space-4)', alignItems: 'start' }}>

                {/* A) Step Completion Summary */}
                <div className="kn-card">
                    <h3 style={{ fontSize: '18px', marginBottom: 'var(--kn-space-3)' }}>Step Summary</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {steps.map(step => (
                            <li key={step.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '12px',
                                fontSize: '14px',
                                color: step.status === 'Completed' ? 'var(--kn-text-color)' : 'var(--kn-text-muted)'
                            }}>
                                <span>{step.id}. {step.label}</span>
                                <span style={{
                                    color: step.status === 'Completed' ? '#28a745' : '#ffc107',
                                    fontWeight: 600
                                }}>
                                    {step.status === 'Completed' ? '✓' : '○'}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* B) Artifact Collection */}
                <div className="kn-card">
                    <h3 style={{ fontSize: '18px', marginBottom: 'var(--kn-space-3)' }}>Artifact Collection</h3>
                    <div className="kn-stack kn-stack--3">
                        <div className="kn-input-wrap">
                            <label>Lovable Project Link</label>
                            <input
                                type="url"
                                className="kn-input"
                                placeholder="https://lovable.dev/..."
                                value={links.lovable}
                                onChange={(e) => handleLinkChange('lovable', e.target.value)}
                            />
                        </div>
                        <div className="kn-input-wrap">
                            <label>GitHub Repository Link</label>
                            <input
                                type="url"
                                className="kn-input"
                                placeholder="https://github.com/..."
                                value={links.github}
                                onChange={(e) => handleLinkChange('github', e.target.value)}
                            />
                        </div>
                        <div className="kn-input-wrap">
                            <label>Deployed URL</label>
                            <input
                                type="url"
                                className="kn-input"
                                placeholder="https://vercel.com/..."
                                value={links.deploy}
                                onChange={(e) => handleLinkChange('deploy', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

            </div>

            {/* C) Final Submission Export */}
            {shipped && (
                <div className="kn-card" style={{ marginTop: 'var(--kn-space-4)', background: '#f8f9fa', border: '1px solid #e9ecef' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: 'var(--kn-space-2)' }}>Final Submission</h3>
                    <p style={{ fontSize: '14px', color: 'var(--kn-text-muted)', marginBottom: 'var(--kn-space-3)' }}>
                        Your project is ready to ship. Copy the text below for submission.
                    </p>

                    <pre style={{
                        background: '#fff',
                        padding: 'var(--kn-space-3)',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                        fontSize: '13px',
                        overflowX: 'auto',
                        marginBottom: 'var(--kn-space-3)'
                    }}>
                        {getSubmissionText()}
                    </pre>

                    <div style={{ display: 'flex', gap: 'var(--kn-space-3)', alignItems: 'center' }}>
                        <button onClick={copyToClipboard} className="kn-btn kn-btn--primary">
                            Copy Final Submission
                        </button>
                        <span style={{ color: '#28a745', fontWeight: 600 }}>
                            Project 1 Shipped Successfully.
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
