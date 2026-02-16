

import { useState, useEffect, useMemo } from 'react';
import AppNavbar from '@/modules/resume/components/layout/AppNavbar';
import PersonalInfoForm from '@/modules/resume/components/builder/PersonalInfoForm';
import ResumePreview from '@/modules/resume/components/builder/ResumePreview';
import ScorePanel from '@/modules/resume/components/builder/ScorePanel';
import ThemePicker from '@/modules/resume/components/builder/ThemePicker';
import Guidance from '@/modules/resume/components/builder/Guidance';
import SkillsEditor from '@/modules/resume/components/builder/SkillsEditor';
import ProjectsEditor from '@/modules/resume/components/builder/ProjectsEditor';
import { INITIAL_RESUME_DATA, SAMPLE_RESUME_DATA } from '@/modules/resume/types/resume';
import { calculateATSScore } from '@/modules/resume/lib/scoring';
import { Save, Download, RotateCcw, Plus, Trash2 } from 'lucide-react';

export default function BuilderPage() {
    const [data, setData] = useState(INITIAL_RESUME_DATA);
    const [loaded, setLoaded] = useState(false);

    // Persistence: Load
    useEffect(() => {
        const saved = localStorage.getItem('aiResumeBuilderData_v2');
        if (saved) {
            try {
                let parsedData = JSON.parse(saved);

                // 1. Migration: Legacy Skills Array -> Object
                if (Array.isArray(parsedData.skills)) {
                    parsedData.skills = {
                        technical: parsedData.skills,
                        soft: [],
                        tools: []
                    };
                }

                // 2. Safe Merge: Ensure all structure exists
                parsedData = { ...INITIAL_RESUME_DATA, ...parsedData };

                // Deep merge objects to avoid overwriting with incomplete objects
                parsedData.personalInfo = { ...INITIAL_RESUME_DATA.personalInfo, ...(parsedData.personalInfo || {}) };
                parsedData.skills = { ...INITIAL_RESUME_DATA.skills, ...(parsedData.skills || {}) };

                // Ensure arrays exist
                parsedData.experience = Array.isArray(parsedData.experience) ? parsedData.experience : [];
                parsedData.education = Array.isArray(parsedData.education) ? parsedData.education : [];
                parsedData.projects = Array.isArray(parsedData.projects) ? parsedData.projects : [];
                parsedData.skills.technical = Array.isArray(parsedData.skills.technical) ? parsedData.skills.technical : [];
                parsedData.skills.soft = Array.isArray(parsedData.skills.soft) ? parsedData.skills.soft : [];
                parsedData.skills.tools = Array.isArray(parsedData.skills.tools) ? parsedData.skills.tools : [];

                // Migration: Projects (techStack string -> technologies array)
                if (parsedData.projects) {
                    parsedData.projects = parsedData.projects.map((p) => ({
                        ...p,
                        technologies: Array.isArray(p.technologies) ? p.technologies : (p.techStack ? p.techStack.split(',').map((s) => s.trim()).filter(Boolean) : [])
                    }));
                }

                // Ensure template is valid
                if (!parsedData.template || !['classic', 'modern', 'minimal'].includes(parsedData.template)) {
                    parsedData.template = 'classic';
                }

                setData(parsedData);
            } catch (e) {
                console.error('Failed to load resume data', e);
                // Fallback to initial data if parse fails
                setData(INITIAL_RESUME_DATA);
            }
        }
        setLoaded(true);
    }, []);

    // Persistence: Save
    useEffect(() => {
        if (loaded) {
            localStorage.setItem('aiResumeBuilderData_v2', JSON.stringify(data));
        }
    }, [data, loaded]);

    // Scoring
    const atsScore = useMemo(() => calculateATSScore(data), [data]);

    const loadSampleData = () => {
        if (confirm('This will overwrite current data. Continue?')) {
            setData({ ...SAMPLE_RESUME_DATA, template: data.template }); // Preserve selected template
        }
    };

    const clearData = () => {
        if (confirm('Clear all data?')) {
            setData({ ...INITIAL_RESUME_DATA, template: data.template }); // Preserve selected template
        }
    };

    if (!loaded) return null; // Prevent hydration mismatch

    return (
        <>
            <AppNavbar />
            <div className="pt-[80px] min-h-screen flex bg-main">
                {/* Left Column: Editor (Scrollable) */}
                <div className="w-[45%] h-[calc(100vh-80px)] overflow-y-auto border-r border-main bg-main p-6 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold font-serif text-main">Editor</h2>
                        <div className="flex gap-2">
                            <button onClick={loadSampleData} className="text-xs font-medium text-accent hover:underline flex items-center gap-1">
                                <RotateCcw size={12} /> Load Sample
                            </button>
                            <button onClick={clearData} className="text-xs font-medium text-muted hover:text-red-500 flex items-center gap-1">
                                <Trash2 size={12} /> Clear
                            </button>
                        </div>
                    </div>

                    <ScorePanel scoreData={atsScore} />

                    <PersonalInfoForm data={data} updateData={setData} />

                    <div className="card p-6 space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Professional Summary</h3>
                        <textarea
                            className="w-full h-32 p-3 bg-card border border-main rounded-sm text-sm"
                            placeholder="Write a compelling summary..."
                            value={data.summary}
                            onChange={(e) => setData({ ...data, summary: e.target.value })}
                        />
                    </div>

                    {/* Experience Section */}
                    <div className="card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Experience</h3>
                            <button
                                onClick={() => setData({
                                    ...data,
                                    experience: [...data.experience, { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '' }]
                                })}
                                className="text-accent text-xs font-bold flex items-center gap-1 hover:opacity-80"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>

                        <div className="space-y-6">
                            {data.experience.map((exp, index) => (
                                <div key={exp.id} className="p-4 bg-main rounded-sm border border-main space-y-3 relative group">
                                    <button
                                        onClick={() => {
                                            const newExp = [...data.experience];
                                            newExp.splice(index, 1);
                                            setData({ ...data, experience: newExp });
                                        }}
                                        className="absolute top-2 right-2 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>

                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            placeholder="Role / Job Title"
                                            className="input font-bold"
                                            value={exp.role}
                                            onChange={(e) => {
                                                const newExp = [...data.experience];
                                                newExp[index].role = e.target.value;
                                                setData({ ...data, experience: newExp });
                                            }}
                                        />
                                        <input
                                            placeholder="Company"
                                            className="input"
                                            value={exp.company}
                                            onChange={(e) => {
                                                const newExp = [...data.experience];
                                                newExp[index].company = e.target.value;
                                                setData({ ...data, experience: newExp });
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            placeholder="Start Date"
                                            className="input text-xs"
                                            value={exp.startDate}
                                            onChange={(e) => {
                                                const newExp = [...data.experience];
                                                newExp[index].startDate = e.target.value;
                                                setData({ ...data, experience: newExp });
                                            }}
                                        />
                                        <input
                                            placeholder="End Date"
                                            className="input text-xs"
                                            value={exp.endDate}
                                            onChange={(e) => {
                                                const newExp = [...data.experience];
                                                newExp[index].endDate = e.target.value;
                                                setData({ ...data, experience: newExp });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            placeholder="Description..."
                                            className="w-full h-20 p-2 bg-card border border-main rounded-sm text-xs"
                                            value={exp.description}
                                            onChange={(e) => {
                                                const newExp = [...data.experience];
                                                newExp[index].description = e.target.value;
                                                setData({ ...data, experience: newExp });
                                            }}
                                        />
                                        <Guidance text={exp.description} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projects Section */}
                    <ProjectsEditor
                        projects={data.projects}
                        updateProjects={(projects) => setData({ ...data, projects })}
                    />

                    {/* Education Section */}
                    <div className="card p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Education</h3>
                            <button
                                onClick={() => setData({
                                    ...data,
                                    education: [...data.education, { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '', description: '' }]
                                })}
                                className="text-accent text-xs font-bold flex items-center gap-1 hover:opacity-80"
                            >
                                <Plus size={14} /> Add
                            </button>
                        </div>
                        <div className="space-y-4">
                            {data.education.map((edu, index) => (
                                <div key={edu.id} className="p-4 bg-main rounded-sm border border-main space-y-3 relative group">
                                    <button
                                        onClick={() => {
                                            const newEdu = [...data.education];
                                            newEdu.splice(index, 1);
                                            setData({ ...data, education: newEdu });
                                        }}
                                        className="absolute top-2 right-2 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <input
                                        placeholder="School / University"
                                        className="input font-bold"
                                        value={edu.school}
                                        onChange={(e) => {
                                            const newEdu = [...data.education];
                                            newEdu[index].school = e.target.value;
                                            setData({ ...data, education: newEdu });
                                        }}
                                    />
                                    <input
                                        placeholder="Degree"
                                        className="input text-xs"
                                        value={edu.degree}
                                        onChange={(e) => {
                                            const newEdu = [...data.education];
                                            newEdu[index].degree = e.target.value;
                                            setData({ ...data, education: newEdu });
                                        }}
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            placeholder="Start Date"
                                            className="input text-xs"
                                            value={edu.startDate}
                                            onChange={(e) => {
                                                const newEdu = [...data.education];
                                                newEdu[index].startDate = e.target.value;
                                                setData({ ...data, education: newEdu });
                                            }}
                                        />
                                        <input
                                            placeholder="End Date"
                                            className="input text-xs"
                                            value={edu.endDate}
                                            onChange={(e) => {
                                                const newEdu = [...data.education];
                                                newEdu[index].endDate = e.target.value;
                                                setData({ ...data, education: newEdu });
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Skills Section */}
                    <SkillsEditor
                        skills={data.skills}
                        updateSkills={(skills) => setData({ ...data, skills })}
                    />

                </div>

                {/* Right Column: Preview (Fixed/Scrollable Independent) */}
                <div className="w-[55%] h-[calc(100vh-80px)] bg-gray-100 p-8 overflow-y-auto flex flex-col items-center">
                    <ThemePicker
                        currentTemplate={data.template}
                        currentColor={data.accentColor || '#0d9488'}
                        onSelectTemplate={(t) => setData({ ...data, template: t })}
                        onSelectColor={(c) => setData({ ...data, accentColor: c })}
                    />

                    <div className="transform origin-top scale-90">
                        <ResumePreview data={data} />
                    </div>

                    <div className="mt-8 mb-12 flex justify-center">
                        <button
                            onClick={() => {
                                alert("PDF export ready! Check your downloads.");
                            }}
                            className="px-8 py-3 bg-accent text-white rounded-md font-bold text-lg shadow-lg hover:opacity-90 transition-transform active:scale-95 flex items-center gap-2"
                        >
                            <Download size={20} />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
