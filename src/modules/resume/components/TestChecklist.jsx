import React, { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const TEST_DEFINITIONS = [
    { id: 1, name: 'Resume Context Loaded' },
    { id: 2, name: 'Local Storage Persistence' },
    { id: 3, name: 'Data Structure Integrity' },
    { id: 4, name: 'Personal Info Validation' },
    { id: 5, name: 'Experience Array Valid' },
    { id: 6, name: 'Projects Array Valid' },
    { id: 7, name: 'Skills Migration Check' },
    { id: 8, name: 'ATS Score Logic' },
    { id: 9, name: 'Template State Valid' },
    { id: 10, name: 'Theme Color Valid' },
];

export default function TestChecklist({ onComplete }) {
    const { resumeData, template, themeColor, score } = useResume();
    const [tests, setTests] = useState(TEST_DEFINITIONS.map(t => ({ ...t, status: 'pending' })));

    useEffect(() => {
        const runTests = () => {
            const results = TEST_DEFINITIONS.map(test => {
                let status = 'fail';

                // 1. Resume Context Loaded
                if (test.id === 1) status = resumeData ? 'pass' : 'fail';

                // 2. Local Storage Persistence
                if (test.id === 2) status = localStorage.getItem('resumeBuilderData') ? 'pass' : 'fail';

                // 3. Data Structure Integrity
                if (test.id === 3) {
                    const keys = ['personal', 'experience', 'education', 'projects', 'skills'];
                    status = keys.every(k => k in resumeData) ? 'pass' : 'fail';
                }

                // 4. Personal Info Validation
                if (test.id === 4) status = resumeData.personal?.fullName?.length > 0 ? 'pass' : 'fail';

                // 5. Experience Array Valid
                if (test.id === 5) status = Array.isArray(resumeData.experience) ? 'pass' : 'fail';

                // 6. Projects Array Valid
                if (test.id === 6) status = Array.isArray(resumeData.projects) ? 'pass' : 'fail';

                // 7. Skills Migration Check
                if (test.id === 7) status = (typeof resumeData.skills === 'object' && !Array.isArray(resumeData.skills)) ? 'pass' : 'fail';

                // 8. ATS Score Logic
                if (test.id === 8) status = (typeof score === 'number' && score >= 0 && score <= 100) ? 'pass' : 'fail';

                // 9. Template State Valid
                if (test.id === 9) status = ['modern', 'classic', 'minimal'].includes(template) ? 'pass' : 'fail';

                // 10. Theme Color Valid
                if (test.id === 10) status = /^#[0-9A-F]{6}$/i.test(themeColor) ? 'pass' : 'fail';

                return { ...test, status };
            });

            setTests(results);

            const allPassed = results.every(t => t.status === 'pass');
            if (onComplete) onComplete(allPassed);
        };

        // Run tests with slight delay for visual effect
        const timer = setTimeout(runTests, 500);
        return () => clearTimeout(timer);
    }, [resumeData, template, themeColor, score, onComplete]);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4">System Health Check</h3>
            <div className="space-y-3">
                {tests.map(test => (
                    <div key={test.id} className="flex items-center justify-between text-sm py-1 border-b border-gray-50 last:border-0">
                        <span className="text-gray-600">{test.name}</span>
                        <div className="flex items-center">
                            {test.status === 'pending' && <Loader2 size={16} className="text-blue-500 animate-spin" />}
                            {test.status === 'pass' && <CheckCircle2 size={16} className="text-green-500" />}
                            {test.status === 'fail' && <XCircle size={16} className="text-red-500" />}
                            <span className={`ml-2 text-xs font-medium uppercase ${test.status === 'pass' ? 'text-green-600' :
                                    test.status === 'fail' ? 'text-red-600' : 'text-blue-600'
                                }`}>
                                {test.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
