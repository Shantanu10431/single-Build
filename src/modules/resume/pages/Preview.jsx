
import { useResume } from '../context/ResumeContext';
import { ArrowLeft, Printer, Copy, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function Preview() {
    const { resumeData } = useResume();
    const [copySuccess, setCopySuccess] = useState(false);

    // Validation
    const warnings = [];
    if (!resumeData.personal.fullName) warnings.push("Missing Name");
    if (resumeData.experience.length === 0 && resumeData.projects.length === 0) warnings.push("Missing Experience or Projects");

    // Copy to Text
    const copyToText = () => {
        const { personal, summary, experience, projects, education, skills } = resumeData;
        const sections = [
            personal.fullName.toUpperCase(),
            `${personal.email} | ${personal.phone} | ${personal.location}`,
            personal.linkedin ? `LinkedIn: ${personal.linkedin}` : '',
            personal.github ? `GitHub: ${personal.github}` : '',
            '\nSUMMARY',
            summary,
            '\nEXPERIENCE',
            ...experience.map(e => `${e.role} at ${e.company} (${e.date})\n${e.description}`),
            '\nPROJECTS',
            ...projects.map(p => `${p.name} (${p.link})\n${p.description}`),
            '\nEDUCATION',
            ...education.map(e => `${e.school} - ${e.degree} (${e.date})`),
            '\nSKILLS',
            Object.values(skills).flat().join(', ')
        ];

        const text = sections.filter(Boolean).join('\n');
        navigator.clipboard.writeText(text);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            {/* Controls - Hidden on Print */}
            <div className="w-[210mm] mb-8 print:hidden space-y-4">
                <div className="flex justify-between items-center">
                    <Link to="/builder" className="flex items-center gap-2 text-gray-600 hover:text-brand-600 font-medium">
                        <ArrowLeft size={20} /> Back to Builder
                    </Link>
                    <div className="flex gap-3">
                        <button
                            onClick={copyToText}
                            className="flex items-center gap-2 px-5 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium"
                        >
                            {copySuccess ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                            {copySuccess ? 'Copied!' : 'Copy Text'}
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-gray-800 rounded-lg hover:bg-brand-700 transition-colors shadow-lg font-bold"
                        >
                            <Printer size={20} /> Print / Save PDF
                        </button>
                    </div>
                </div>

                {/* Validation Warnings */}
                {warnings.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 text-amber-800 text-sm">
                        <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                        <div>
                            <span className="font-bold">Resume may be incomplete:</span>
                            <ul className="list-disc list-inside mt-1 ml-1">
                                {warnings.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* A4 Resume Container */}
            <div className="print:shadow-none print:w-full print:m-0 print:absolute print:top-0 print:left-0 bg-white shadow-2xl">
                <ResumePreview isPreviewMode={true} />
            </div>

            <style>{`
                @media print {
                    @page { margin: 0; size: auto; }
                    body { background: white; }
                    .print-hidden { display: none !important; }
                }
            `}</style>
        </div>
    );
}
