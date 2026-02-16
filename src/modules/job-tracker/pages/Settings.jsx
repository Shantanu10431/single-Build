
import React, { useState } from 'react';

export default function Settings() {
    const [prefs, setPrefs] = useState(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }
        return {
            roleKeywords: '',
            preferredLocations: [],
            preferredMode: [],
            experienceLevel: '',
            skills: '',
            minMatchScore: 40
        };
    });

    const [savedMessage, setSavedMessage] = useState('');

    const locationsOptions = ["Bengaluru", "Hyderabad", "Pune", "Mumbai", "Chennai", "Gurugram", "Noida", "Delhi", "Remote"];
    const modeOptions = ["Remote", "Hybrid", "Onsite"];
    const expOptions = ["Fresher", "0-1 Years", "1-3 Years", "3-5 Years"];

    const handleChange = (field, value) => {
        setPrefs(prev => ({ ...prev, [field]: value }));
    };

    const toggleArrayOption = (field, option) => {
        setPrefs(prev => {
            const current = prev[field] || [];
            if (current.includes(option)) {
                return { ...prev, [field]: current.filter(item => item !== option) };
            } else {
                return { ...prev, [field]: [...current, option] };
            }
        });
    };

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSavedMessage('Preferences saved! Your matches will update.');
        setTimeout(() => setSavedMessage(''), 3000);
    };

    return (
        <div className="kn-route-page">
            <h1 className="kn-route-page__title">Settings</h1>

            <div className="kn-stack kn-stack--3" style={{ maxWidth: '600px' }}>

                {/* Role Keywords */}
                <div className="kn-input-wrap">
                    <label style={{ display: 'block', marginBottom: 'var(--kn-space-1)', fontWeight: 600 }}>Role Keywords (comma-separated)</label>
                    <input
                        type="text"
                        className="kn-input"
                        placeholder="e.g. React, Java, Data Analyst"
                        value={prefs.roleKeywords}
                        onChange={(e) => handleChange('roleKeywords', e.target.value)}
                    />
                </div>

                {/* Locations (Multi-Select) */}
                <div className="kn-input-wrap">
                    <label style={{ display: 'block', marginBottom: 'var(--kn-space-1)', fontWeight: 600 }}>Preferred Locations</label>
                    <div className="kn-flex-wrap" style={{ gap: '8px' }}>
                        {locationsOptions.map(loc => (
                            <button
                                key={loc}
                                onClick={() => toggleArrayOption('preferredLocations', loc)}
                                className={`kn-btn ${prefs.preferredLocations.includes(loc) ? 'kn-btn--primary' : 'kn-btn--secondary'}`}
                                style={{ borderRadius: '20px', fontSize: '12px', padding: '4px 12px' }}
                            >
                                {loc} {prefs.preferredLocations.includes(loc) && '✓'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mode (Checkboxes) */}
                <div className="kn-input-wrap">
                    <label style={{ display: 'block', marginBottom: 'var(--kn-space-1)', fontWeight: 600 }}>Preferred Mode</label>
                    <div className="kn-flex-wrap" style={{ gap: '16px' }}>
                        {modeOptions.map(mode => (
                            <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={prefs.preferredMode.includes(mode)}
                                    onChange={() => toggleArrayOption('preferredMode', mode)}
                                />
                                {mode}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Experience Level */}
                <div className="kn-input-wrap">
                    <label style={{ display: 'block', marginBottom: 'var(--kn-space-1)', fontWeight: 600 }}>Experience Level</label>
                    <select
                        className="kn-input"
                        value={prefs.experienceLevel}
                        onChange={(e) => handleChange('experienceLevel', e.target.value)}
                    >
                        <option value="">Select Level</option>
                        {expOptions.map(exp => (
                            <option key={exp} value={exp}>{exp}</option>
                        ))}
                    </select>
                </div>

                {/* Skills */}
                <div className="kn-input-wrap">
                    <label style={{ display: 'block', marginBottom: 'var(--kn-space-1)', fontWeight: 600 }}>Skills (comma-separated)</label>
                    <input
                        type="text"
                        className="kn-input"
                        placeholder="e.g. JavaScript, Python, AWS"
                        value={prefs.skills}
                        onChange={(e) => handleChange('skills', e.target.value)}
                    />
                </div>

                {/* Min Score Slider */}
                <div className="kn-input-wrap">
                    <label style={{ display: 'block', marginBottom: 'var(--kn-space-1)', fontWeight: 600 }}>
                        Minimum Match Score: {prefs.minMatchScore}
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={prefs.minMatchScore}
                        onChange={(e) => handleChange('minMatchScore', parseInt(e.target.value))}
                        style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--kn-text-muted)' }}>
                        <span>Loose (0)</span>
                        <span>Strict (100)</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--kn-space-2)', marginTop: 'var(--kn-space-2)' }}>
                    <button onClick={handleSave} className="kn-btn kn-btn--primary">Save Preferences</button>
                    <button onClick={() => {
                        const demoPrefs = {
                            roleKeywords: 'React, Frontend, JavaScript',
                            preferredLocations: ['Bengaluru', 'Remote'],
                            preferredMode: ['Hybrid', 'Remote'],
                            experienceLevel: '1-3 Years',
                            skills: 'React, CSS, Git, JavaScript',
                            minMatchScore: 40
                        };
                        setPrefs(demoPrefs);
                        localStorage.setItem('jobTrackerPreferences', JSON.stringify(demoPrefs));
                        setSavedMessage('Demo profile loaded! Check Dashboard.');
                        setTimeout(() => setSavedMessage(''), 3000);
                    }} className="kn-btn kn-btn--secondary">
                        Load Demo Profile
                    </button>
                </div>

                {savedMessage && <p style={{ color: 'var(--kn-accent)', fontWeight: 600 }}>{savedMessage}</p>}
            </div>
        </div>
    );
}
