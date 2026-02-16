import React from 'react';

type BadgeProps = {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'neutral' | 'error';
    className?: string;
};

export const Badge = ({ children, variant = 'neutral', className = '' }: BadgeProps) => {
    const styles = {
        success: 'bg-green-100 text-green-800 border-green-200',
        warning: 'bg-amber-100 text-amber-800 border-amber-200',
        error: 'bg-red-100 text-red-800 border-red-200',
        neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[variant]} ${className}`}>
            {children}
        </span>
    );
};
