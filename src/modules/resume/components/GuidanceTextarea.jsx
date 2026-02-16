import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const ACTION_VERBS = [
    'Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved',
    'Created', 'Optimized', 'Automated', 'Managed', 'Orchestrated',
    'Engineered', 'Architected', 'Launched', 'Reduced', 'Increased'
];

export default function GuidanceTextarea({ value, onChange, placeholder, className }) {
    const lines = value ? value.split('\n') : [];

    const getGuidance = (line) => {
        if (!line.trim()) return null;

        const words = line.trim().split(' ');
        const firstWord = words[0].replace(/[^a-zA-Z]/g, ''); // Remove bullets/punctuation

        const hasActionVerb = ACTION_VERBS.some(v =>
            firstWord.toLowerCase() === v.toLowerCase()
        );

        const hasNumbers = /\d+|%|k\b|X\b/i.test(line);

        if (hasActionVerb && hasNumbers) return null; // Good bullet

        const suggestions = [];
        if (!hasActionVerb) suggestions.push("Start with a strong action verb (e.g., Built, Led).");
        if (!hasNumbers) suggestions.push("Add measurable impact (numbers, %).");

        return suggestions;
    };

    return (
        <div className="space-y-2">
            <textarea
                className={`${className} focus:ring-brand-500 focus:border-brand-500`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            <div className="space-y-1">
                {lines.map((line, i) => {
                    const suggestions = getGuidance(line);
                    if (!suggestions || suggestions.length === 0) return null;

                    return (
                        <div key={i} className="flex items-start gap-2 text-xs bg-indigo-50 text-indigo-700 p-2 rounded-md">
                            <AlertCircle size={12} className="mt-0.5 shrink-0" />
                            <div>
                                <span className="font-semibold block opacity-75">Line {i + 1}:</span>
                                {suggestions.join(" ")}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
