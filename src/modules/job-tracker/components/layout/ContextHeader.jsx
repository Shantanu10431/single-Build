import React from 'react';

export function ContextHeader({ title, description }) {
    return (
        <div className="py-10 px-6 border-b border-muted bg-background">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                    {title}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
