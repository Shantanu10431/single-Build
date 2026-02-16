
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/ResumePreview';
import { ChevronDown, ChevronUp, Plus, Trash2, Wand2, Eye, Save, CheckCircle2 } from 'lucide-react';
import GuidanceTextarea from '../components/GuidanceTextarea';

export default function Builder() {
    const { resumeData, updatePersonal, updateSection, loadSample, score, suggestions, template, setTemplate, themeColor, setThemeColor } = useResume();
    const [activeSection, setActiveSection] = useState('personal');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('demo') === 'true') {
            loadSample();
        }
    }, [searchParams, loadSample]);

    const colors = [
        { name: 'Teal', value: '#0d9488' }, // teal-600
        { name: 'Navy', value: '#2563eb' }, // blue-600
        { name: 'Burgundy', value: '#be123c' }, // rose-700
        { name: 'Forest', value: '#15803d' }, // green-700
        { name: 'Charcoal', value: '#374151' } // gray-700
    ];

    const templates = [
        { id: 'classic', name: 'Classic', desc: 'Serif, Traditional' },
        { id: 'modern', name: 'Modern', desc: 'Clean, Sidebar' },
        { id: 'minimal', name: 'Minimal', desc: 'Sleek, Simple' }
    ];

    const handlePrint = () => {
        window.print();
        setTimeout(() => alert("PDF export ready! Check your downloads."), 500);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">
                        AI
                    </div>
                    <span className="font-bold text-xl text-gray-800">Resume Builder</span>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setActiveSection('preview')}>
                        <Eye size={18} /> <span className="hidden sm:inline">Preview</span>
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors font-medium shadow-sm"
                    >
                        <Save size={18} /> Download PDF
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Editor Panel */}
                <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar pr-2">

                    {/* Template & Theme Picker */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Wand2 size={18} className="text-brand-600" /> Design & Theme
                        </h2>

                        {/* Templates */}
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {templates.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTemplate(t.id)}
                                    className={`relative p-3 rounded-lg border-2 text-left transition-all hover:border-brand-300 ${template === t.id ? 'border-brand-600 bg-brand-50' : 'border-gray-200 bg-gray-50'}`}
                                >
                                    <div className="h-16 bg-white mb-2 rounded border border-gray-200 overflow-hidden relative">
                                        {/* Mini Skeletal Preview */}
                                        {t.id === 'modern' && <div className="w-[30%] h-full bg-gray-200 absolute left-0"></div>}
                                        {t.id === 'classic' && <div className="w-full h-1 bg-gray-300 absolute top-2"></div>}
                                        {t.id === 'minimal' && <div className="p-1"><div className="w-1/2 h-1 bg-gray-300 mb-1"></div></div>}
                                    </div>
                                    <div className="text-xs font-bold text-gray-800">{t.name}</div>
                                    <div className="text-[10px] text-gray-500">{t.desc}</div>
                                    {template === t.id && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-brand-600 rounded-full flex items-center justify-center text-white">
                                            <CheckCircle2 size={10} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Colors */}
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 mb-2 block tracking-wider">Accent Color</label>
                            <div className="flex gap-3">
                                {colors.map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setThemeColor(c.value)}
                                        className={`w-8 h-8 rounded-full border-2 ring-1 ring-offset-1 transition-all ${themeColor === c.value ? 'border-white ring-gray-400 scale-110' : 'border-transparent ring-transparent hover:scale-110'}`}
                                        style={{ backgroundColor: c.value }}
                                        title={c.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Improvement Panel */}
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                        <h2 className="font-bold text-gray-800">Editor</h2>
                        <div className="flex gap-2">
                            {/* Selector removed, redundant with new visual picker */}
                            <button onClick={loadSample} className="text-xs font-semibold text-brand-600 hover:text-brand-700 bg-white border border-brand-200 px-3 py-1.5 rounded-md transition-colors shadow-sm">
                                <Wand2 size={12} className="inline mr-1" />
                                Sample
                            </button>
                        </div>
                    </div>

                    {/* ATS Score & Improvements Panel */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4 mb-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                    ATS Readiness Score
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Optimize for recruitment algorithms.</p>
                            </div>
                            <div className={`text-2xl font-black ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                {score}/100
                            </div>
                        </div>

                        {/* Score Meter */}
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full transition-all duration-1000 ease-out ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                                style={{ width: `${score}%` }}
                            />
                        </div>

                        {/* Top 3 Improvements */}
                        {suggestions.length > 0 && (
                            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                <p className="text-xs font-bold text-amber-800 mb-2 uppercase tracking-wide">Top 3 Improvements</p>
                                <ul className="space-y-2">
                                    {suggestions.map((s, i) => (
                                        <li key={i} className="text-xs text-amber-900 flex items-start gap-2">
                                            <span className="mt-1 min-w-[6px] h-[6px] rounded-full bg-amber-500" />
                                            <span className="leading-snug">{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {suggestions.length === 0 && score === 100 && (
                            <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                                <p className="text-xs font-bold text-green-700">🎉 Perfect Score! Your resume is ready.</p>
                            </div>
                        )}
                    </div>

                    {/* Personal Info */}
                    <Section title="Personal Info" isOpen={activeSection === 'personal'} onClick={() => setActiveSection('personal')}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Full Name" value={resumeData.personal.fullName} onChange={(e) => updatePersonal('fullName', e.target.value)} />
                            <Input label="Job Title" value={resumeData.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} />
                            <Input label="Email" value={resumeData.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} />
                            <Input label="Phone" value={resumeData.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
                            <Input label="Location" value={resumeData.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} />
                            <Input label="Website" value={resumeData.personal.website} onChange={(e) => updatePersonal('website', e.target.value)} />
                            <Input label="LinkedIn" value={resumeData.personal.linkedin} onChange={(e) => updatePersonal('linkedin', e.target.value)} />
                            <Input label="GitHub" value={resumeData.personal.github} onChange={(e) => updatePersonal('github', e.target.value)} />
                        </div>
                    </Section>

                    {/* Summary */}
                    <Section title="Professional Summary" isOpen={activeSection === 'summary'} onClick={() => setActiveSection('summary')}>
                        <textarea
                            className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                            placeholder="Write a compelling summary..."
                            value={resumeData.summary}
                            onChange={(e) => updateSection('summary', e.target.value)}
                        />
                    </Section>

                    {/* Experience */}
                    <Section title="Experience" isOpen={activeSection === 'experience'} onClick={() => setActiveSection('experience')}>
                        {resumeData.experience.map((exp, index) => (
                            <div key={exp.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                <button
                                    onClick={() => {
                                        const newExp = resumeData.experience.filter(e => e.id !== exp.id);
                                        updateSection('experience', newExp);
                                    }}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <Input label="Company" value={exp.company} onChange={(e) => {
                                        const newExp = [...resumeData.experience];
                                        newExp[index].company = e.target.value;
                                        updateSection('experience', newExp);
                                    }} />
                                    <Input label="Role" value={exp.role} onChange={(e) => {
                                        const newExp = [...resumeData.experience];
                                        newExp[index].role = e.target.value;
                                        updateSection('experience', newExp);
                                    }} />
                                    <Input label="Date Range" value={exp.date} onChange={(e) => {
                                        const newExp = [...resumeData.experience];
                                        newExp[index].date = e.target.value;
                                        updateSection('experience', newExp);
                                    }} />
                                </div>
                                <GuidanceTextarea
                                    className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm resize-none custom-scrollbar"
                                    placeholder="• Led development of... (Start with action verbs, use numbers)"
                                    value={exp.description}
                                    onChange={(e) => {
                                        const newExp = [...resumeData.experience];
                                        newExp[index].description = e.target.value;
                                        updateSection('experience', newExp);
                                    }}
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => updateSection('experience', [...resumeData.experience, { id: Date.now(), company: '', role: '', date: '', description: '' }])}
                            className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                            <Plus size={16} /> Add Experience
                        </button>
                    </Section>

                    {/* Projects */}
                    <Section title="Projects" isOpen={activeSection === 'projects'} onClick={() => setActiveSection('projects')}>
                        {resumeData.projects.map((proj, index) => (
                            <div key={proj.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                <button
                                    onClick={() => {
                                        const newProj = resumeData.projects.filter(p => p.id !== proj.id);
                                        updateSection('projects', newProj);
                                    }}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-1 gap-3 mb-3">
                                    <Input label="Project Title" value={proj.name} onChange={(e) => {
                                        const newProj = [...resumeData.projects];
                                        newProj[index].name = e.target.value;
                                        updateSection('projects', newProj);
                                    }} />
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <Input label="Live URL" value={proj.liveUrl || ''} onChange={(e) => {
                                        const newProj = [...resumeData.projects];
                                        newProj[index].liveUrl = e.target.value;
                                        updateSection('projects', newProj);
                                    }} />
                                    <Input label="GitHub URL" value={proj.githubUrl || ''} onChange={(e) => {
                                        const newProj = [...resumeData.projects];
                                        newProj[index].githubUrl = e.target.value;
                                        updateSection('projects', newProj);
                                    }} />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Tech Stack</label>
                                    <div className="p-3 bg-white rounded-lg border border-gray-200 min-h-[60px] flex flex-wrap gap-2 items-start shadow-sm">
                                        {(proj.techStack || []).map((tech, tIndex) => (
                                            <span key={tIndex} className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                                                {tech}
                                                <button onClick={() => {
                                                    const newProj = [...resumeData.projects];
                                                    newProj[index].techStack = newProj[index].techStack.filter((_, i) => i !== tIndex);
                                                    updateSection('projects', newProj);
                                                }} className="text-gray-400 hover:text-red-500">×</button>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            className="text-xs bg-transparent outline-none min-w-[60px] flex-grow"
                                            placeholder="Add tech..."
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.target.value.trim()) {
                                                    const newProj = [...resumeData.projects];
                                                    const currentStack = newProj[index].techStack || [];
                                                    if (!currentStack.includes(e.target.value.trim())) {
                                                        newProj[index].techStack = [...currentStack, e.target.value.trim()];
                                                        updateSection('projects', newProj);
                                                    }
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <GuidanceTextarea
                                    className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm resize-none custom-scrollbar"
                                    placeholder="• Built a full-stack app using... (Mention tech stack & impact)"
                                    value={proj.description}
                                    onChange={(e) => {
                                        const val = e.target.value.slice(0, 200);
                                        const newProj = [...resumeData.projects];
                                        newProj[index].description = val;
                                        updateSection('projects', newProj);
                                    }}
                                />
                                <p className="text-right text-xs text-gray-400 mt-1">{proj.description.length}/200 chars</p>
                            </div>
                        ))}
                        <button
                            onClick={() => updateSection('projects', [...resumeData.projects, { id: Date.now(), name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' }])}
                            className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                            <Plus size={16} /> Add Project
                        </button>
                    </Section>

                    {/* Education */}
                    <Section title="Education" isOpen={activeSection === 'education'} onClick={() => setActiveSection('education')}>
                        {resumeData.education.map((edu, index) => (
                            <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                <button
                                    onClick={() => {
                                        const newEdu = resumeData.education.filter(e => e.id !== edu.id);
                                        updateSection('education', newEdu);
                                    }}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <Input label="School" value={edu.school} onChange={(e) => {
                                        const newEdu = [...resumeData.education];
                                        newEdu[index].school = e.target.value;
                                        updateSection('education', newEdu);
                                    }} />
                                    <Input label="Degree" value={edu.degree} onChange={(e) => {
                                        const newEdu = [...resumeData.education];
                                        newEdu[index].degree = e.target.value;
                                        updateSection('education', newEdu);
                                    }} />
                                    <Input label="Date" value={edu.date} onChange={(e) => {
                                        const newEdu = [...resumeData.education];
                                        newEdu[index].date = e.target.value;
                                        updateSection('education', newEdu);
                                    }} />
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => updateSection('education', [...resumeData.education, { id: Date.now(), school: '', degree: '', date: '' }])}
                            className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                        >
                            <Plus size={16} /> Add Education
                        </button>
                    </Section>

                    {/* Skills */}
                    <Section title="Skills" isOpen={activeSection === 'skills'} onClick={() => setActiveSection('skills')}>
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-xs text-gray-500">Categorize your skills for better ATS parsing.</p>
                            <button
                                onClick={() => {
                                    const btn = document.getElementById('suggest-btn');
                                    if (btn) {
                                        btn.textContent = '✨ Suggesting...';
                                        btn.disabled = true;
                                    }
                                    setTimeout(() => {
                                        updateSection('skills', {
                                            technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
                                            soft: ['Team Leadership', 'Problem Solving'],
                                            tools: ['Git', 'Docker', 'AWS']
                                        });
                                        if (btn) {
                                            btn.textContent = '✨ Suggest Skills';
                                            btn.disabled = false;
                                        }
                                    }, 1000);
                                }}
                                id="suggest-btn"
                                className="text-xs font-semibold text-brand-600 hover:bg-brand-50 px-2 py-1 rounded transition-colors"
                            >
                                ✨ Suggest Skills
                            </button>
                        </div>

                        {['technical', 'soft', 'tools'].map((category) => (
                            <div key={category} className="mb-4">
                                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2 flex justify-between">
                                    {category === 'tools' ? 'Tools & Technologies' : `${category} Skills`}
                                    <span className="text-gray-300">({(resumeData.skills[category] || []).length})</span>
                                </h4>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[60px] flex flex-wrap gap-2 items-start">
                                    {(resumeData.skills[category] || []).map((skill, index) => (
                                        <span key={index} className="bg-white border border-gray-200 px-2 py-1 rounded-md text-sm flex items-center gap-1 shadow-sm">
                                            {skill}
                                            <button onClick={() => {
                                                const newSkills = { ...resumeData.skills };
                                                newSkills[category] = newSkills[category].filter((_, i) => i !== index);
                                                updateSection('skills', newSkills);
                                            }} className="text-gray-400 hover:text-red-500 ml-1">×</button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="bg-transparent outline-none text-sm min-w-[100px] mt-1"
                                        placeholder="Type & Enter..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim()) {
                                                const newSkills = { ...resumeData.skills };
                                                const current = newSkills[category] || [];
                                                if (!current.includes(e.target.value.trim())) {
                                                    newSkills[category] = [...current, e.target.value.trim()];
                                                    updateSection('skills', newSkills);
                                                }
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </Section>

                </div>

                {/* Right Panel - Live Preview */}
                <div className="hidden lg:block bg-gray-200/50 rounded-xl border border-gray-200 shadow-inner overflow-hidden flex flex-col">
                    <div className="p-3 border-b border-gray-200 bg-white flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Preview</span>
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar flex justify-center bg-gray-100">
                        <div className="scale-[0.85] origin-top">
                            <ResumePreview isPreviewMode={true} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const Section = ({ title, isOpen, onClick, children }) => (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors" onClick={onClick}>
            <h2 className="font-semibold text-gray-800">{title}</h2>
            {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </button>
        {isOpen && <div className="p-4 border-t border-gray-100 animate-slideDown">{children}</div>}
    </div>
);

const Input = ({ label, value, onChange }) => (
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
        <input
            type="text"
            className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            value={value}
            onChange={onChange}
        />
    </div>
);
