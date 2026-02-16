
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ship() {
    const navigate = useNavigate();
    const [authorized] = useState(() => {
        const saved = localStorage.getItem('jobTrackerTestChecklist');
        if (saved) {
            const checklist = JSON.parse(saved);
            const allPassed = Object.values(checklist).every(Boolean);
            const totalKeys = Object.keys(checklist).length;
            return allPassed && totalKeys >= 10;
        }
        return false;
    });

    const [checkedCount] = useState(() => {
        const saved = localStorage.getItem('jobTrackerTestChecklist');
        if (saved) {
            const checklist = JSON.parse(saved);
            return Object.values(checklist).filter(Boolean).length;
        }
        return 0;
    });

    if (!authorized) {
        return (
            <div className="kn-route-page" style={{ textAlign: 'center', paddingTop: '10vh' }}>
                <div className="kn-card" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--kn-space-5)' }}>
                    <div style={{ fontSize: '48px', marginBottom: 'var(--kn-space-3)' }}>🔒</div>
                    <h1 className="kn-route-page__title">Ship Guard Active</h1>
                    <p className="kn-route-page__subtext" style={{ marginBottom: 'var(--kn-space-3)' }}>
                        You cannot ship until all pre-flight tests are passed.
                    </p>
                    <p style={{ color: 'var(--kn-accent)', fontWeight: 600, marginBottom: 'var(--kn-space-4)' }}>
                        Tests Passed: {checkedCount} / 10
                    </p>
                    <button
                        onClick={() => navigate('/jt/07-test')}
                        className="kn-btn kn-btn--primary"
                    >
                        Go to Test Checklist
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="kn-route-page" style={{ textAlign: 'center', paddingTop: '10vh' }}>
            <div className="kn-card" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--kn-space-5)' }}>
                <div style={{ fontSize: '64px', marginBottom: 'var(--kn-space-3)' }}>🚀</div>
                <h1 className="kn-route-page__title">Ready to Ship!</h1>
                <p className="kn-route-page__subtext" style={{ marginBottom: 'var(--kn-space-4)' }}>
                    All tests passed. The system is stable and verified.
                </p>

                <div style={{ background: '#f0fff4', border: '1px solid #c6f6d5', padding: 'var(--kn-space-3)', borderRadius: '8px', color: '#2f855a' }}>
                    <strong>Certification Complete</strong><br />
                    Job Notification Tracker v1.0
                </div>

                <button
                    onClick={() => navigate('/dashboard')}
                    className="kn-btn kn-btn--primary"
                    style={{ marginTop: 'var(--kn-space-4)' }}
                >
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
}
