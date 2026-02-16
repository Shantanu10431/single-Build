'use client';

import { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
    tags: string[];
    onAdd: (tag: string) => void;
    onRemove: (tag: string) => void;
    placeholder?: string;
    suggestions?: string[];
}

export default function TagInput({ tags, onAdd, onRemove, placeholder, suggestions }: TagInputProps) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && input === '' && tags.length > 0) {
            onRemove(tags[tags.length - 1]);
        }
    };

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onAdd(trimmed);
            setInput('');
        }
    };

    return (
        <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-md bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
            {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full animate-in fade-in zoom-in duration-200">
                    {tag}
                    <button onClick={() => onRemove(tag)} className="hover:text-red-500 transition-colors">
                        <X size={12} />
                    </button>
                </span>
            ))}
            <div className="flex-1 flex items-center min-w-[120px]">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    className="w-full text-sm outline-none bg-transparent placeholder:text-gray-400"
                    placeholder={tags.length === 0 ? placeholder : ''}
                />
                <button
                    onClick={addTag}
                    disabled={!input.trim()}
                    className="text-gray-400 hover:text-primary disabled:opacity-0 transition-all"
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );
}
