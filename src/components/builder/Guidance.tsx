'use client';

import { Lightbulb } from 'lucide-react';

interface GuidanceProps {
    title?: string;
    tips: string[];
}

export default function Guidance({ title = "Pro Tips", tips }: GuidanceProps) {
    return (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="text-sm font-bold text-primary flex items-center gap-2 mb-2">
                <Lightbulb size={16} />
                {title}
            </h4>
            <ul className="space-y-1">
                {tips.map((tip, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="mt-1 block w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                        {tip}
                    </li>
                ))}
            </ul>
        </div>
    );
}
