
import React from 'react';

export default function FilterBar({ filters, setFilters }) {

    const handleChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="kn-card" style={{ marginBottom: 'var(--kn-space-4)' }}>
            <div className="kn-flex-wrap" style={{ gap: 'var(--kn-space-2)', alignItems: 'center' }}>
                <div style={{ flex: '1 1 200px' }}>
                    <input
                        type="text"
                        className="kn-input"
                        placeholder="Search title or company..."
                        value={filters.keyword}
                        onChange={(e) => handleChange('keyword', e.target.value)}
                    />
                </div>

                <select
                    className="kn-input"
                    style={{ width: 'auto' }}
                    value={filters.status || ''}
                    onChange={(e) => handleChange('status', e.target.value)}
                >
                    <option value="">Status: All</option>
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                </select>

                <select
                    className="kn-input"
                    style={{ width: 'auto' }}
                    value={filters.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                >
                    <option value="">Location</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Gurugram">Gurugram</option>
                    <option value="Noida">Noida</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    className="kn-input"
                    style={{ width: 'auto' }}
                    value={filters.mode}
                    onChange={(e) => handleChange('mode', e.target.value)}
                >
                    <option value="">Mode</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    className="kn-input"
                    style={{ width: 'auto' }}
                    value={filters.experience}
                    onChange={(e) => handleChange('experience', e.target.value)}
                >
                    <option value="">Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                </select>

                <select
                    className="kn-input"
                    style={{ width: 'auto' }}
                    value={filters.source}
                    onChange={(e) => handleChange('source', e.target.value)}
                >
                    <option value="">Source</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                    <option value="Instahyre">Instahyre</option>
                    <option value="Wellfound">Wellfound</option>
                </select>

                <select
                    className="kn-input"
                    style={{ width: 'auto', marginLeft: 'auto' }}
                    value={filters.sort}
                    onChange={(e) => handleChange('sort', e.target.value)}
                >
                    <option value="Latest">Sort: Latest</option>
                    <option value="Match Score">Sort: Match Score</option>
                    <option value="Salary">Sort: Salary</option>
                </select>

            </div>
        </div>
    );
}
