import React from 'react';
import { useResume } from '../context/ResumeContext';
import { MapPin, Mail, Phone, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function ResumePreview({ isPreviewMode = false }) {
    const { resumeData, template, themeColor } = useResume(); // Theme color from context
    const { personal, summary, experience, education, projects, skills } = resumeData;

    const styles = {
        modern: {
            container: "font-sans text-gray-800 grid grid-cols-[1fr_2fr] min-h-[inherit]",
            leftCol: "text-white p-8", // Background set dynamically
            rightCol: "p-8 bg-white",
            header: "mb-6",
            name: "text-3xl font-bold uppercase tracking-wider mb-2",
            title: "text-lg opacity-90 mb-6",
            sectionTitle: "text-lg font-bold uppercase tracking-widest text-gray-800 border-b-2 mb-4 pb-1", // Border color set dynamically
            meta: "font-medium"
        },
        classic: {
            container: "font-serif text-slate-900 p-12 bg-white",
            header: "text-center border-b-2 pb-6 mb-8", // Border color set dynamically
            name: "text-4xl font-bold mb-2",
            title: "text-xl italic text-slate-600 mb-4",
            sectionTitle: "text-lg font-bold border-b pb-1 mb-4 uppercase tracking-wide", // Border color & text color set dynamically
            meta: "font-bold text-slate-700"
        },
        minimal: {
            container: "font-sans text-slate-800 p-10 max-w-4xl mx-auto bg-white",
            header: "pb-6 mb-6",
            name: "text-3xl font-light tracking-tight mb-1",
            title: "text-lg text-slate-500 mb-4",
            sectionTitle: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 mt-8",
            meta: "font-semibold text-slate-900"
        }
    };

    const s = styles[template] || styles.modern;

    // Render Logic for Layouts
    if (template === 'modern') {
        return (
            <div className={`shadow-2xl ${isPreviewMode ? 'w-[210mm] min-h-[297mm] mx-auto' : 'w-full min-h-[1000px]'} ${s.container} print:shadow-none`}>
                {/* Left Column (Sidebar) */}
                <div className={s.leftCol} style={{ backgroundColor: themeColor }}>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-2 leading-tight">{personal.fullName}</h1>
                        <p className="text-sm opacity-90">{personal.title}</p>
                    </div>

                    <div className="space-y-6 text-sm">
                        <Section title="Contact" className="text-white border-white/30">
                            <div className="space-y-2 opacity-90">
                                {personal.email && <div className="flex items-center gap-2"><Mail size={14} /> {personal.email}</div>}
                                {personal.phone && <div className="flex items-center gap-2"><Phone size={14} /> {personal.phone}</div>}
                                {personal.location && <div className="flex items-center gap-2"><MapPin size={14} /> {personal.location}</div>}
                                {personal.linkedin && <div className="flex items-center gap-2"><Linkedin size={14} /> {personal.linkedin}</div>}
                                {personal.github && <div className="flex items-center gap-2"><Github size={14} /> {personal.github}</div>}
                                {personal.website && <div className="flex items-center gap-2"><Globe size={14} /> {personal.website}</div>}
                            </div>
                        </Section>

                        <Section title="Skills" className="text-white border-white/30">
                            {/* Skills Logic Redesigned for Sidebar */}
                            {skills && (
                                <div className="space-y-4">
                                    {Object.entries(Array.isArray(skills) ? { Skills: skills } : skills).map(([cat, list]) =>
                                        (list && list.length > 0) && (
                                            <div key={cat}>
                                                <p className="font-bold opacity-70 uppercase text-[10px] mb-1">{cat}</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {list.map((sk, i) => (
                                                        <span key={i} className="bg-white/20 px-2 py-0.5 rounded textxs">{sk}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        </Section>

                        {education.length > 0 && (
                            <Section title="Education" className="text-white border-white/30">
                                <div className="space-y-4">
                                    {education.map(edu => (
                                        <div key={edu.id}>
                                            <p className="font-bold">{edu.degree}</p>
                                            <p className="opacity-90">{edu.school}</p>
                                            <p className="opacity-75 text-xs">{edu.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </Section>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className={s.rightCol}>
                    {summary && (
                        <div className="mb-6">
                            <h2 className={s.sectionTitle} style={{ borderColor: themeColor, color: themeColor }}>Profile</h2>
                            <p className="text-sm leading-relaxed">{summary}</p>
                        </div>
                    )}

                    {experience.length > 0 && (
                        <div className="mb-6">
                            <h2 className={s.sectionTitle} style={{ borderColor: themeColor, color: themeColor }}>Experience</h2>
                            <div className="space-y-5">
                                {experience.map(exp => (
                                    <div key={exp.id} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900">{exp.role}</h3>
                                            <span className="text-xs text-gray-500 font-medium">{exp.date}</span>
                                        </div>
                                        <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</div>
                                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div>
                            <h2 className={s.sectionTitle} style={{ borderColor: themeColor, color: themeColor }}>Projects</h2>
                            <div className="space-y-4">
                                {projects.map(proj => (
                                    <div key={proj.id} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900">{proj.name}</h3>
                                            <div className="flex gap-2">
                                                {proj.liveUrl && <a href={`https://${proj.liveUrl}`} target="_blank" className="text-xs hover:underline flex gap-1 items-center" style={{ color: themeColor }}>Live <ExternalLink size={10} /></a>}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 flex-wrap mb-1">
                                            {proj.techStack?.map((t, i) => <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 rounded">{t}</span>)}
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Classic & Minimal Layouts (Single Column)
    return (
        <div className={`bg-white shadow-2xl ${isPreviewMode ? 'w-[210mm] min-h-[297mm] mx-auto' : 'w-full min-h-[1000px]'} ${s.container} print:shadow-none`}>
            {/* Header */}
            <header className={s.header} style={template === 'classic' ? { borderColor: themeColor } : {}}>
                <h1 className={s.name} style={template === 'minimal' ? { color: themeColor } : {}}>{personal.fullName || 'Your Name'}</h1>
                <p className={s.title}>{personal.title || 'Professional Title'}</p>

                <div className={`flex flex-wrap gap-4 text-sm text-gray-600 ${template === 'classic' ? 'justify-center' : ''}`}>
                    {personal.location && <div className="flex items-center gap-1"><MapPin size={14} /> {personal.location}</div>}
                    {personal.email && <div className="flex items-center gap-1"><Mail size={14} /> {personal.email}</div>}
                    {personal.phone && <div className="flex items-center gap-1"><Phone size={14} /> {personal.phone}</div>}
                    {personal.linkedin && <div className="flex items-center gap-1"><Linkedin size={14} /> {personal.linkedin}</div>}
                    {personal.github && <div className="flex items-center gap-1"><Github size={14} /> {personal.github}</div>}
                    {personal.website && <div className="flex items-center gap-1"><Globe size={14} /> {personal.website}</div>}
                </div>
            </header>

            {/* Same content rendering for Classic/Minimal but styled differently */}
            {summary && (
                <section className="mb-6 break-inside-avoid">
                    <h2 className={s.sectionTitle} style={{ color: themeColor, borderColor: themeColor }}>Professional Summary</h2>
                    <p className="leading-relaxed whitespace-pre-line text-sm">{summary}</p>
                </section>
            )}

            {/* Reuse loops for Experience, Education, Projects, Skills with dynamic styles */}
            {/* Simplified for brevity - applying dynamic color to headers */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className={s.sectionTitle} style={{ color: themeColor, borderColor: themeColor }}>Experience</h2>
                    <div className="space-y-5">
                        {experience.map(exp => (
                            <div key={exp.id} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-md">{exp.role}</h3>
                                    <span className="text-sm text-gray-500">{exp.date}</span>
                                </div>
                                <div className={`${s.meta} text-sm`} style={template !== 'minimal' ? { color: themeColor } : {}}>{exp.company}</div>
                                <p className="text-sm mt-1 leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {projects.length > 0 && (
                <section className="mb-6">
                    <h2 className={s.sectionTitle} style={{ color: themeColor, borderColor: themeColor }}>Projects</h2>
                    <div className="space-y-4">
                        {projects.map(proj => (
                            <div key={proj.id} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-md">{proj.name}</h3>
                                    <div className="flex gap-2 text-xs">
                                        {proj.liveUrl && <a href={`https://${proj.liveUrl}`} style={{ color: themeColor }}>Live Demo</a>}
                                    </div>
                                </div>
                                <div className="flex gap-1 flex-wrap mb-1">
                                    {proj.techStack?.map((t, i) => <span key={i} className="text-[10px] bg-gray-100 border border-gray-200 px-1 rounded">{t}</span>)}
                                </div>
                                <p className="text-sm leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {education.length > 0 && (
                <section className="mb-6 break-inside-avoid">
                    <h2 className={s.sectionTitle} style={{ color: themeColor, borderColor: themeColor }}>Education</h2>
                    <div className="space-y-2">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-sm">{edu.school}</h3>
                                    <span className="text-sm text-gray-500">{edu.date}</span>
                                </div>
                                <div className="text-sm text-gray-700">{edu.degree}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {skills && (
                <section className="break-inside-avoid">
                    <h2 className={s.sectionTitle} style={{ color: themeColor, borderColor: themeColor }}>Skills</h2>
                    <div className="grid grid-cols-1 gap-3">
                        {Object.entries(Array.isArray(skills) ? { '': skills } : skills).map(([cat, list]) =>
                            (list && list.length > 0) && (
                                <div key={cat} className="flex gap-2">
                                    {cat && <span className="text-xs font-bold uppercase w-24 shrink-0 mt-1 text-gray-500">{cat}</span>}
                                    <div className="flex flex-wrap gap-2">
                                        {list.map((sk, i) => (
                                            <span key={i} className="bg-gray-100 border border-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded">{sk}</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}

const Section = ({ title, children, className }) => (
    <div className={`mb-6 ${className}`}>
        <h3 className="uppercase font-bold tracking-widest text-sm border-b mb-3 pb-1 opacity-80" style={{ borderColor: 'inherit' }}>{title}</h3>
        {children}
    </div>
);
