import React, { useState, useEffect } from 'react';
import AppNavbar from '../components/layout/AppNavbar';
import ResumePreview from '../components/builder/ResumePreview';
import ValidationAlert from '../components/preview/ValidationAlert';
import ATSCircularScore from '../components/preview/ATSCircularScore';
import { calculateATSScore } from '../lib/scoring';
import { INITIAL_RESUME_DATA, SAMPLE_RESUME_DATA } from '../types/resume';
import { Printer, Copy, Check } from 'lucide-react';

export default function PreviewPage() {
    const validateData = (d) => {
        const missing = [];
        if (!d.personalInfo.fullName) missing.push("Full Name");
        if (d.experience.length === 0 && d.projects.length === 0) missing.push("At least one Experience or Project");
        setMissingFields(missing);
    };

    // eslint-disable-next-line
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem('resumeBuilderData');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Migration logic
                if (Array.isArray(parsed.skills)) {
                    parsed.skills = { technical: parsed.skills, soft: [], tools: [] };
                }
                if (parsed.projects) {
                    parsed.projects = parsed.projects.map((p) => ({
                        ...p,
                        technologies: Array.isArray(p.technologies) ? p.technologies : (p.techStack ? p.techStack.split(',').map((s) => s.trim()).filter(Boolean) : [])
                    }));
                }
                return parsed;
            }
        } catch (e) { console.error('Failed to load resume data', e); }
        return SAMPLE_RESUME_DATA;
    });

    const [loaded, setLoaded] = useState(false);
    const [missingFields, setMissingFields] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (data) {
            validateData(data);
        }
        // eslint-disable-next-line
        setLoaded(true);
    }, [data]);

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
