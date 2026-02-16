'use client';

import { TemplateType } from '@/types/resume';
import { LayoutTemplate, Monitor, AlignLeft } from 'lucide-react';

interface TemplateSelectorProps {
    currentTemplate: TemplateType;
    onSelect: (template: TemplateType) => void;
}

export default function TemplateSelector({ currentTemplate, onSelect }: TemplateSelectorProps) {
    const templates: { id: TemplateType; label: string; icon: React.ReactNode }[] = [
        { id: 'classic', label: 'Classic', icon: <AlignLeft size={16} /> },
        { id: 'modern', label: 'Modern', icon: <LayoutTemplate size={16} /> },
        { id: 'minimal', label: 'Minimal', icon: <Monitor size={16} /> },
    ];

    return (
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-sm w-fit">
            {templates.map((t) => (
                <button
                    key={t.id}
                    onClick={() => onSelect(t.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-medium transition-all ${currentTemplate === t.id
                            ? 'bg-white text-accent shadow-sm ring-1 ring-border'
                            : 'text-muted hover:text-main hover:bg-gray-200'
                        }`}
                >
                    {t.icon}
                    {t.label}
                </button>
            ))}
        </div>
    );
}
