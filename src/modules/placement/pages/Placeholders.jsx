
import React from 'react';

const PagePlaceholder = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-gray-400 mb-2">{title}</h2>
        <p className="text-gray-500">This feature is coming soon.</p>
    </div>
);

export const Practice = () => <PagePlaceholder title="Practice Arena" />;
export const Assessments = () => <PagePlaceholder title="Assessments" />;
export const Resources = () => <PagePlaceholder title="Resources Library" />;
export const Profile = () => <PagePlaceholder title="User Profile" />;
