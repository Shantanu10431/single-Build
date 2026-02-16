'use client';

import { useState } from 'react';
import { Skills } from '@/types/resume';
import TagInput from '@/components/ui/TagInput';
import { Sparkles, Loader2 } from 'lucide-react';

interface SkillsEditorProps {
    skills: Skills;
    updateSkills: (skills: Skills) => void;
}

export default function SkillsEditor({ skills, updateSkills }: SkillsEditorProps) {
    const [loading, setLoading] = useState(false);

    const handleAdd = (category: keyof Skills, tag: string) => {
        if (!skills[category].includes(tag)) {
            updateSkills({
                ...skills,
                [category]: [...skills[category], tag]
            });
        }
    };

    const handleRemove = (category: keyof Skills, tag: string) => {
        updateSkills({
            ...skills,
            [category]: skills[category].filter(t => t !== tag)
        });
    };

    const suggestSkills = () => {
        setLoading(true);
        setTimeout(() => {
            updateSkills({
                technical: [...new Set([...skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
                soft: [...new Set([...skills.soft, "Team Leadership", "Problem Solving"])],
                tools: [...new Set([...skills.tools, "Git", "Docker", "AWS"])]
            });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="card p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted">Skills</h3>
                <button
                    onClick={suggestSkills}
                    disabled={loading}
                    className="text-accent text-xs font-bold flex items-center gap-1 hover:opacity-80 disabled:opacity-50"
                >
                    {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    Suggest Skills
                </button>
            </div>

            <div className="space-y-4">
                {/* Technical */}
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Technical Skills ({skills.technical.length})
                    </label>
                    <TagInput
                        tags={skills.technical}
                        onAdd={(t) => handleAdd('technical', t)}
                        onRemove={(t) => handleRemove('technical', t)}
                        placeholder="e.g. React, Python..."
                    />
                </div>

                {/* Soft Skills */}
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Soft Skills ({skills.soft.length})
                    </label>
                    <TagInput
                        tags={skills.soft}
                        onAdd={(t) => handleAdd('soft', t)}
                        onRemove={(t) => handleRemove('soft', t)}
                        placeholder="e.g. Leadership, Communication..."
                    />
                </div>

                {/* Tools */}
                <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1 block">
                        Tools & Technologies ({skills.tools.length})
                    </label>
                    <TagInput
                        tags={skills.tools}
                        onAdd={(t) => handleAdd('tools', t)}
                        onRemove={(t) => handleRemove('tools', t)}
                        placeholder="e.g. VS Code, Figma..."
                    />
                </div>
            </div>
        </div>
    );
}
