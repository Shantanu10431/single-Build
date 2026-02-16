'use client';

import { X } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';

interface TagInputProps {
    placeholder?: string;
    tags: string[];
    onAdd: (tag: string) => void;
    onRemove: (tag: string) => void;
}

export default function TagInput({ placeholder, tags, onAdd, onRemove }: TagInputProps) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.trim()) {
                onAdd(input.trim());
                setInput('');
            }
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-full border border-gray-200">
                        {tag}
                        <button
                            onClick={() => onRemove(tag)}
                            className="text-gray-400 hover:text-red-500 focus:outline-none"
                        >
                            <X size={12} />
                        </button>
                    </span>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || "Type and press Enter..."}
                className="input text-xs"
            />
        </div>
    );
}
