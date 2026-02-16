
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TestChecklist() {
    const navigate = useNavigate();
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('jobTrackerTestChecklist');
        return saved ? JSON.parse(saved) : {
            preferencesPersist: false,
            matchScoreCalculates: false,
            showMatchesToggle: false,
            saveJobPersists: false,
            applyOpensNewTab: false,
            statusUpdatePersists: false,
            statusFilterWorks: false,
            digestGenerates: false,
            digestPersists: false,
            noConsoleErrors: false
        };
    });

    const handleCheck = (key) => {
        const updated = { ...checklist, [key]: !checklist[key] };
        setChecklist(updated);
        localStorage.setItem('jobTrackerTestChecklist', JSON.stringify(updated));
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the test status?")) {
            const reset = Object.keys(checklist).reduce((acc, key) => ({ ...acc, [key]: false }), {});
            setChecklist(reset);
            localStorage.setItem('jobTrackerTestChecklist', JSON.stringify(reset));
        }
    };

    const completedCount = Object.values(checklist).filter(Boolean).length;
    const totalCount = Object.keys(checklist).length;
    const isComplete = completedCount === totalCount;

    const items = [
        { key: 'preferencesPersist', label: 'Preferences persist after refresh', hint: 'Change settings, refresh page, verify settings remain.' },
        { key: 'matchScoreCalculates', label: 'Match score calculates correctly', hint: 'Check if green/amber badges appear on likely matches.' },
        { key: 'showMatchesToggle', label: '"Show only matches" toggle works', hint: 'Enable toggle, ensure low-scoring jobs disappear.' },
        { key: 'saveJobPersists', label: 'Save job persists after refresh', hint: 'Save a job, refresh, check Saved page.' },
        { key: 'applyOpensNewTab', label: 'Apply opens in new tab', hint: 'Click Apply, ensure new tab opens.' },
        { key: 'statusUpdatePersists', label: 'Status update persists after refresh', hint: 'Set status to Applied, refresh, verify.' },
        { key: 'statusFilterWorks', label: 'Status filter works correctly', hint: 'Filter by Applied, ensure only Applied jobs show.' },
        { key: 'digestGenerates', label: 'Digest generates top 10 by score', hint: 'Generate digest, verify it has 10 high-scoring jobs.' },
        { key: 'digestPersists', label: 'Digest persists for the day', hint: 'Refresh Digest page, ensure same list loads.' },
        { key: 'noConsoleErrors', label: 'No console errors on main pages', hint: 'Open DevTools (F12) and browse pages.' }
    ];

    return (
        <div className="kn-route-page" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--kn-space-4)' }}>
                <h1 className="kn-route-page__title">Pre-Flight Test Checklist</h1>
                <p className="kn-route-page__subtext">Verify all features before shipping.</p>
            </div>

            <div className="kn-card" style={{ padding: 'var(--kn-space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--kn-space-3)' }}>
                    <h3 style={{ margin: 0 }}>Tests Passed: {completedCount} / {totalCount}</h3>
                    {!isComplete && <span style={{ color: 'var(--kn-accent)', fontWeight: 600 }}>Resolve all issues before shipping.</span>}
                </div>

                {/* Progress Bar */}
                <div style={{ height: '8px', background: '#eee', borderRadius: '4px', marginBottom: 'var(--kn-space-4)', overflow: 'hidden' }}>
                    <div style={{
                        height: '100%',
                        width: `${(completedCount / totalCount) * 100}%`,
                        background: isComplete ? '#28a745' : 'var(--kn-accent)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kn-space-3)' }}>
                    {items.map(({ key, label, hint }) => (
                        <div key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--kn-space-3)', paddingBottom: 'var(--kn-space-2)', borderBottom: '1px solid #f0f0f0' }}>
                            <input
                                type="checkbox"
                                checked={checklist[key]}
                                onChange={() => handleCheck(key)}
                                style={{ marginTop: '4px', width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                            <div>
                                <label
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        textDecoration: checklist[key] ? 'line-through' : 'none',
                                        color: checklist[key] ? 'var(--kn-text-muted)' : 'inherit'
                                    }}
                                    onClick={() => handleCheck(key)}
                                >
                                    {label}
                                </label>
                                <p style={{ margin: 0, fontSize: '13px', color: 'var(--kn-text-muted)', marginTop: '2px' }}>{hint}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 'var(--kn-space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button onClick={handleReset} className="kn-btn kn-btn--secondary" style={{ fontSize: '13px' }}>
                        Reset Test Status
                    </button>

                    <button
                        onClick={() => navigate('/jt/08-ship')}
                        className={`kn-btn ${isComplete ? 'kn-btn--primary' : 'kn-btn--secondary'}`}
                        disabled={!isComplete}
                        style={{ opacity: isComplete ? 1 : 0.6, cursor: isComplete ? 'pointer' : 'not-allowed' }}
                    >
                        {isComplete ? '🚀 Proceed to Ship' : 'Complete Checklist to Ship'}
                    </button>
                </div>
            </div>
        </div>
    );
}
