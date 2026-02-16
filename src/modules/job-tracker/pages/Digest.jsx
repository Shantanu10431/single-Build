
import React, { useState } from 'react';
import { jobs } from '../data/jobs';
import { calculateMatchScore } from '../utils/scoring';
import { Link } from 'react-router-dom';

export default function Digest() {
    const [digest, setDigest] = useState(() => {
        const todayKey = (() => {
            const today = new Date();
            return `jobTrackerDigest_${today.toISOString().split('T')[0]}`;
        })();
        const existingDigest = localStorage.getItem(todayKey);
        return existingDigest ? JSON.parse(existingDigest) : null;
    });
    const [preferences] = useState(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        return savedPrefs ? JSON.parse(savedPrefs) : null;
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [recentUpdates] = useState(() => {
        const savedStatuses = JSON.parse(localStorage.getItem('jobTrackerStatus') || '{}');
        return Object.entries(savedStatuses)
            .map(([id, data]) => {
                const job = jobs.find(j => j.id === parseInt(id));
                return job ? { ...job, ...data } : null;
            })
            .filter(u => u && u.status !== 'Not Applied')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
    });

    // Get Today's Date Key (YYYY-MM-DD)
    const getTodayKey = () => {
        const today = new Date();
        return `jobTrackerDigest_${today.toISOString().split('T')[0]}`;
    };

    const generateDigest = () => {
        if (!preferences) return;

        setLoading(true);

        // Simulate API delay
        setTimeout(() => {
            // Score all jobs
            const scoredJobs = jobs.map(job => {
                const { score, color } = calculateMatchScore(job, preferences);
                return { ...job, matchScore: score, matchColor: color };
            });

            // Filter: Must have at least some match (score > 0)
            // Sort: Score DESC, then postedDaysAgo ASC
            const topJobs = scoredJobs
                .filter(j => j.matchScore > 0)
                .sort((a, b) => {
                    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
                    return a.postedDaysAgo - b.postedDaysAgo;
                })
                .slice(0, 10);

            const todayKey = getTodayKey();
            localStorage.setItem(todayKey, JSON.stringify(topJobs));
            setDigest(topJobs);
            setLoading(false);
        }, 800);
    };

    const handleCopy = () => {
        if (!digest) return;
        const text = digest.map(j =>
            `• ${j.title} at ${j.company} (${j.location})\n  Score: ${j.matchScore}/100 | Link: ${j.applyUrl}`
        ).join('\n\n');

        const header = `My 9AM Job Digest - ${new Date().toLocaleDateString()}\n\n`;
        navigator.clipboard.writeText(header + text);
        setMessage('Digest copied to clipboard!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleEmail = () => {
        if (!digest) return;
        const subject = encodeURIComponent("My 9AM Job Digest");
        const bodyObj = digest.map(j =>
            `${j.title} at ${j.company} (${j.location}) - Score: ${j.matchScore}\nLink: ${j.applyUrl}`
        ).join('\n\n');
        const body = encodeURIComponent(`Here are my top job matches for today:\n\n${bodyObj}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    if (!preferences) {
        return (
            <div className="kn-route-page">
                <h1 className="kn-route-page__title">Daily Digest</h1>
                <div className="kn-card" style={{ padding: 'var(--kn-space-5)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: 'var(--kn-heading3-size)', marginBottom: 'var(--kn-space-2)' }}>
                        Personalization Required
                    </h3>
                    <p style={{ color: 'var(--kn-text-muted)', marginBottom: 'var(--kn-space-3)' }}>
                        Set your preferences to generate a personalized daily digest.
                    </p>
                    <Link to="/settings" className="kn-btn kn-btn--primary">
                        Go to Settings
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="kn-route-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--kn-space-3)' }}>
                <h1 className="kn-route-page__title" style={{ margin: 0 }}>Daily Digest</h1>
                <span style={{ fontSize: '12px', color: 'var(--kn-text-muted)', background: '#eee', padding: '4px 8px', borderRadius: '4px' }}>
                    Demo Mode: Daily 9AM trigger simulated manually.
                </span>
            </div>

            {/* Recent Updates Section */}
            {recentUpdates.length > 0 && (
                <div className="kn-card" style={{ marginBottom: 'var(--kn-space-3)', padding: 'var(--kn-space-3)', border: '1px solid #ffd700', background: '#fffbeb' }}>
                    <h4 style={{ margin: '0 0 var(--kn-space-2) 0', fontSize: '16px' }}>📝 Recent Status Updates</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--kn-text-muted)' }}>
                        {recentUpdates.map(u => (
                            <li key={u.id} style={{ marginBottom: '4px' }}>
                                <strong>{u.status}</strong>: {u.title} at {u.company}
                                <span style={{ fontSize: '12px', opacity: 0.7 }}> ({new Date(u.date).toLocaleDateString()})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {!digest ? (
                <div className="kn-card" style={{ padding: 'var(--kn-space-5)', textAlign: 'center' }}>
                    <p style={{ marginBottom: 'var(--kn-space-3)', fontSize: 'var(--kn-body-size)' }}>
                        Your simulated 9AM digest is ready to be generated.
                    </p>
                    <button
                        onClick={generateDigest}
                        className="kn-btn kn-btn--primary"
                        disabled={loading}
                    >
                        {loading ? 'Curating Matches...' : "Generate Today's 9AM Digest (Simulated)"}
                    </button>
                </div>
            ) : digest.length === 0 ? (
                <div className="kn-card" style={{ padding: 'var(--kn-space-5)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: 'var(--kn-heading3-size)' }}>No matching roles today.</h3>
                    <p style={{ color: 'var(--kn-text-muted)' }}>Check again tomorrow or adjust your preferences.</p>
                    <button onClick={() => { localStorage.removeItem(getTodayKey()); setDigest(null); }} className="kn-btn kn-btn--secondary" style={{ marginTop: 'var(--kn-space-3)' }}>
                        Reset Simulation
                    </button>
                </div>
            ) : (
                <>
                    {/* Email Layout Card */}
                    <div className="kn-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                        {/* Header */}
                        <div style={{ background: '#f8f9fa', padding: 'var(--kn-space-4)', textAlign: 'center', borderBottom: '1px solid #e0e0e0' }}>
                            <h2 style={{ fontSize: 'var(--kn-heading2-size)', margin: '0 0 8px 0', fontFamily: 'var(--kn-font-serif)' }}>
                                Top 10 Jobs For You — 9AM Digest
                            </h2>
                            <p style={{ margin: 0, color: 'var(--kn-text-muted)', fontSize: '14px' }}>
                                {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>

                        {/* List */}
                        <div style={{ padding: 'var(--kn-space-3)' }}>
                            {digest.map((job, idx) => (
                                <div key={job.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 'var(--kn-space-3)',
                                    borderBottom: idx < digest.length - 1 ? '1px solid #eee' : 'none'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: 'var(--kn-heading-color)' }}>{job.title}</h4>
                                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--kn-text-muted)' }}>
                                            {job.company} • {job.location} • {job.experience}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kn-space-3)' }}>
                                        <span style={{
                                            fontSize: '14px',
                                            fontWeight: 'bold',
                                            color: job.matchColor,
                                            background: '#f5f5f5',
                                            padding: '2px 8px',
                                            borderRadius: '12px'
                                        }}>
                                            {job.matchScore}% Match
                                        </span>
                                        <a href={job.applyUrl} target="_blank" rel="noreferrer" className="kn-btn kn-btn--secondary" style={{ fontSize: '12px', padding: '4px 10px' }}>
                                            Apply
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{ background: '#fafafa', padding: 'var(--kn-space-3)', textAlign: 'center', borderTop: '1px solid #eee', fontSize: '12px', color: '#999' }}>
                            This digest was generated based on your preferences.
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--kn-space-2)', marginTop: 'var(--kn-space-3)' }}>
                        <button onClick={handleCopy} className="kn-btn kn-btn--secondary">
                            Copy Digest to Clipboard
                        </button>
                        <button onClick={handleEmail} className="kn-btn kn-btn--secondary">
                            Create Email Draft
                        </button>
                    </div>
                    {message && <p style={{ textAlign: 'center', color: 'green', marginTop: '8px', fontSize: '14px' }}>{message}</p>}
                </>
            )}
        </div>
    );
}
