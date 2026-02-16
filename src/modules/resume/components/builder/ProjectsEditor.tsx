'use client';

import { ProjectItem } from '@/types/resume';
import { Plus, Trash2, ChevronDown, ChevronUp, Github, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import TagInput from '@/components/ui/TagInput';
import Guidance from '@/components/builder/Guidance';

interface ProjectsEditorProps {
    projects: ProjectItem[];
    updateProjects: (projects: ProjectItem[]) => void;
}

export default function ProjectsEditor({ projects, updateProjects }: ProjectsEditorProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const addProject = () => {
        const newProject: ProjectItem = {
            id: Date.now().toString(),
            name: 'New Project',
            description: '',
            technologies: []
        };
        updateProjects([...projects, newProject]);
        setExpandedId(newProject.id);
    };

    const removeProject = (id: string) => {
        updateProjects(projects.filter(p => p.id !== id));
        if (expandedId === id) setExpandedId(null);
    };

    const updateProject = (id: string, updates: Partial<ProjectItem>) => {
        updateProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    return (
        <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Projects</h3>
                <button
                    onClick={addProject}
                    className="text-accent text-xs font-bold flex items-center gap-1 hover:opacity-80"
                >
                    <Plus size={14} /> Add Project
                </button>
            </div>

            <div className="space-y-3">
                {projects.map((proj) => {
                    const isExpanded = expandedId === proj.id;
                    return (
                        <div key={proj.id} className="border border-main rounded-sm bg-white overflow-hidden">
                            {/* Header */}
                            <div
                                className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                            >
                                <div className="flex items-center gap-2">
                                    {isExpanded ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
                                    <span className="text-sm font-bold text-main">{proj.name || 'Untitled Project'}</span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeProject(proj.id);
                                    }}
                                    className="text-muted hover:text-red-500 p-1"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            {/* Body */}
                            {isExpanded && (
                                <div className="p-4 space-y-4 border-t border-gray-200">
                                    <input
                                        placeholder="Project Title"
                                        className="input font-bold"
                                        value={proj.name}
                                        onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                                    />

                                    <div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-xs font-semibold text-gray-700">Description</span>
                                            <span className={`text-xs ${proj.description.length > 200 ? 'text-red-500' : 'text-gray-400'}`}>
                                                {proj.description.length}/200
                                            </span>
                                        </div>
                                        <textarea
                                            placeholder="Describe your project..."
                                            className="w-full h-24 p-2 bg-card border border-main rounded-sm text-xs"
                                            value={proj.description}
                                            onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                        />
                                        <Guidance text={proj.description} />
                                    </div>

                                    <div>
                                        <span className="text-xs font-semibold text-gray-700 mb-1 block">Tech Stack</span>
                                        <TagInput
                                            tags={proj.technologies}
                                            onAdd={(tag) => updateProject(proj.id, { technologies: [...proj.technologies, tag] })}
                                            onRemove={(tag) => updateProject(proj.id, { technologies: proj.technologies.filter(t => t !== tag) })}
                                            placeholder="Add technology (e.g. Next.js)..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <ExternalLink size={14} className="absolute top-2.5 left-2 text-gray-400" />
                                            <input
                                                placeholder="Live URL"
                                                className="input pl-7 text-xs"
                                                value={proj.liveUrl || ''}
                                                onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                                            />
                                        </div>
                                        <div className="relative">
                                            <Github size={14} className="absolute top-2.5 left-2 text-gray-400" />
                                            <input
                                                placeholder="GitHub URL"
                                                className="input pl-7 text-xs"
                                                value={proj.githubUrl || ''}
                                                onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
