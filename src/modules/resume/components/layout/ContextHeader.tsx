'use client';

interface ContextHeaderProps {
    title: string;
    description: string;
}

export default function ContextHeader({ title, description }: ContextHeaderProps) {
    return (
        <div className="w-full border-b border-main bg-main px-8 flex flex-col justify-center sticky z-40" style={{ height: '80px', top: '80px' }}>
            <h2 className="text-xl font-bold uppercase tracking-wide text-accent" style={{ fontFamily: 'var(--font-serif)' }}>
                {title}
            </h2>
            <p className="text-sm text-muted font-sans truncate">
                {description}
            </p>
        </div>
    );
}
