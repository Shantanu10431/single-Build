'use client';

import { TemplateType } from '@/types/resume';
import { Check } from 'lucide-react';

interface ThemePickerProps {
    currentTemplate: TemplateType;
    currentColor: string;
    onSelectTemplate: (t: TemplateType) => void;
    onSelectColor: (c: string) => void;
}

const TEMPLATES: { id: TemplateType; label: string }[] = [
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
];

const COLORS = [
    { label: 'Teal', value: '#0d9488' },      // teal-600
    { label: 'Navy', value: '#1e3a8a' },      // blue-900
    { label: 'Burgundy', value: '#881337' },  // rose-900
    { label: 'Forest', value: '#14532d' },    // green-900
    { label: 'Charcoal', value: '#1f2937' },  // gray-800
];

export default function ThemePicker({ currentTemplate, currentColor, onSelectTemplate, onSelectColor }: ThemePickerProps) {
    return (
        <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-6 space-y-4">
            {/* Template Selection */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Layout</h3>
                <div className="flex gap-4">
                    {TEMPLATES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => onSelectTemplate(t.id)}
                            className={`relative group w-24 h-32 rounded-md border-2 transition-all overflow-hidden ${currentTemplate === t.id
                                    ? 'border-accent ring-2 ring-accent ring-opacity-20'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            {/* Visual Sketch of Template */}
                            <div className="absolute inset-0 bg-gray-50 flex flex-col p-2 gap-1 pointer-events-none">
                                {/* Header Mockup */}
                                <div className={`h-4 bg-gray-200 w-full mb-1 rounded-sm ${t.id === 'modern' ? 'bg-current opacity-20' : ''}`} style={{ color: t.id === 'modern' ? currentColor : undefined }}></div>

                                {/* Body Mockup */}
                                <div className="flex flex-1 gap-1">
                                    {t.id === 'modern' && <div className="w-1/3 bg-gray-200 rounded-sm h-full opacity-50" style={{ backgroundColor: currentColor, opacity: 0.1 }}></div>}
                                    <div className="flex-1 space-y-1">
                                        <div className="h-1 bg-gray-200 w-3/4 mb-1"></div>
                                        <div className="h-1 bg-gray-100 w-full"></div>
                                        <div className="h-1 bg-gray-100 w-full"></div>
                                        <div className="h-1 bg-gray-100 w-5/6"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Label Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-1 text-center border-t border-gray-100">
                                <span className={`text-[10px] font-bold ${currentTemplate === t.id ? 'text-accent' : 'text-gray-500'}`}>
                                    {t.label}
                                </span>
                            </div>

                            {/* Checkmark */}
                            {currentTemplate === t.id && (
                                <div className="absolute top-1 right-1 bg-accent text-white rounded-full p-0.5 shadow-sm">
                                    <Check size={10} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Selection */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Accent Color</h3>
                <div className="flex gap-3">
                    {COLORS.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => onSelectColor(c.value)}
                            title={c.label}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${currentColor === c.value
                                    ? 'border-gray-900 scale-110'
                                    : 'border-transparent hover:scale-110'
                                }`}
                            style={{ backgroundColor: c.value }}
                        >
                            {currentColor === c.value && <Check size={14} className="text-white" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
