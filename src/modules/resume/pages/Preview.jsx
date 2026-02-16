

import { useState, useEffect } from 'react';
import AppNavbar from '@/modules/resume/components/layout/AppNavbar';
import ResumePreview from '@/modules/resume/components/builder/ResumePreview';
import ValidationAlert from '@/modules/resume/components/preview/ValidationAlert';
import ATSCircularScore from '@/modules/resume/components/preview/ATSCircularScore';
import { calculateATSScore } from '@/modules/resume/lib/scoring';
import { SAMPLE_RESUME_DATA, INITIAL_RESUME_DATA } from '@/modules/resume/types/resume';
import { Printer, Copy, Check } from 'lucide-react';

export default function PreviewPage() {
    const [data, setData] = useState(INITIAL_RESUME_DATA);
    const [loaded, setLoaded] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const [copied, setCopied] = useState(false);

    // Persistence: Load
    useEffect(() => {
        const saved = localStorage.getItem('aiResumeBuilderData_v2');
        if (saved) {
            try {
                let parsed = JSON.parse(saved);

                // 2. Safe Merge: Ensure all structure exists
                parsed = { ...INITIAL_RESUME_DATA, ...parsed };

                // Deep merge objects to avoid overwriting with incomplete objects
                parsed.personalInfo = { ...INITIAL_RESUME_DATA.personalInfo, ...(parsed.personalInfo || {}) };
                parsed.skills = { ...INITIAL_RESUME_DATA.skills, ...(parsed.skills || {}) };

                // Ensure arrays exist
                parsed.experience = Array.isArray(parsed.experience) ? parsed.experience : [];
                parsed.education = Array.isArray(parsed.education) ? parsed.education : [];
                parsed.projects = Array.isArray(parsed.projects) ? parsed.projects : [];
                parsed.skills.technical = Array.isArray(parsed.skills.technical) ? parsed.skills.technical : [];
                parsed.skills.soft = Array.isArray(parsed.skills.soft) ? parsed.skills.soft : [];
                parsed.skills.tools = Array.isArray(parsed.skills.tools) ? parsed.skills.tools : [];

                // Migration: Projects (techStack string -> technologies array)
                if (parsed.projects) {
                    parsed.projects = parsed.projects.map((p) => ({
                        ...p,
                        technologies: Array.isArray(p.technologies) ? p.technologies : (p.techStack ? p.techStack.split(',').map((s) => s.trim()).filter(Boolean) : [])
                    }));
                }

                setData(parsed);
                validateData(parsed);
            } catch (e) {
                console.error('Failed to load resume data', e);
                setData(SAMPLE_RESUME_DATA);
            }
        } else {
            // Fallback for demo if no data
            setData(SAMPLE_RESUME_DATA);
        }
        setLoaded(true);
    }, []);

    const validateData = (e) => {
        const missing = [];
        if (!e.personalInfo.fullName) missing.push("Full Name");
        if (e.experience.length === 0 && e.projects.length === 0) missing.push("At least one Experience or Project");
        setMissingFields(missing);
    };

    const handleCopyText = () => {
        const { personalInfo, summary, experience, projects, education, skills } = data;

        const lines = [
            personalInfo.fullName.toUpperCase(),
            [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | '),
            '',
            'SUMMARY',
            '----------------------------------------',
            summary,
            '',
            'EXPERIENCE',
            '----------------------------------------',
            ...experience.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.description}`),
            '',
            'PROJECTS',
            '----------------------------------------',
            ...projects.map(p => `${p.name} | ${(p.technologies || []).join(', ')}\n${p.description} ${p.liveUrl ? `(Live: ${p.liveUrl})` : ''} ${p.githubUrl ? `(GitHub: ${p.githubUrl})` : ''}`),
            '',
            'EDUCATION',
            '----------------------------------------',
            ...education.map(e => `${e.school} - ${e.degree} (${e.startDate} - ${e.endDate})`),
            '',
            'SKILLS',
            '----------------------------------------',
            [...skills.technical, ...skills.soft, ...skills.tools].join(', ')
        ];

        navigator.clipboard.writeText(lines.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!loaded) return null;

    return (
        <>
            <AppNavbar />
            <div className="pt-[80px] min-h-screen bg-gray-100 flex flex-col items-center p-8 print:p-0 print:bg-white print:pt-0">

                <div className="w-full max-w-[816px] mb-6 flex flex-col md:flex-row gap-6 print:hidden justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-main mb-2">Final Preview</h1>
                        <p className="text-sm text-gray-500">Review your resume layout and ATS score before exporting.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleCopyText}
                            className="px-4 py-2 bg-white border border-gray-300 text-main rounded-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm h-10"
                        >
                            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                            {copied ? "Copied" : "Copy Text"}
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-2 bg-accent text-white rounded-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 text-sm h-10"
                        >
                            <Printer size={16} />
                            Save PDF
                        </button>
                    </div>
                </div>

                {/* ATS Score Panel */}
                <div className="w-full max-w-[816px] mb-8 print:hidden">
                    <ATSCircularScore scoreData={calculateATSScore(data)} />
                </div>

                <ValidationAlert missingFields={missingFields} />

                <ResumePreview data={data} />
            </div>
        </>
    );
}
