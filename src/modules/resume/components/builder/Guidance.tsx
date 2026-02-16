'use client';

import { Lightbulb } from 'lucide-react';

interface GuidanceProps {
    text: string;
}

export default function Guidance({ text }: GuidanceProps) {
    if (!text) return null;

    const suggestions: string[] = [];

    // 1. Action Verb Check
    const actionVerbs = /^(Built|Developed|Designed|Implemented|Led|Improved|Created|Optimized|Automated|Managed|Engineered|Architected|Launched)/i;
    // Check first word of any sentence/bullet line
    const lines = text.split('\n');
    const missingVerb = lines.some(line => line.trim().length > 5 && !actionVerbs.test(line.trim()));

    if (missingVerb) {
        suggestions.push("Start bullets with strong action verbs (e.g., Built, Led, Optimized).");
    }

    // 2. Metrics Check
    const metrics = /\d+|%|\$|k\b/i;
    if (!metrics.test(text) && text.length > 20) {
        suggestions.push("Add measurable impact (numbers, %, $).");
    }

    if (suggestions.length === 0) return null;

    return (
        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-100 rounded-sm text-xs text-yellow-800 flex flex-col gap-1">
            {suggestions.map((s, i) => (
                <div key={i} className="flex gap-2 items-start">
                    <Lightbulb size={12} className="mt-0.5 shrink-0" />
                    <span>{s}</span>
                </div>
            ))}
        </div>
    );
}
