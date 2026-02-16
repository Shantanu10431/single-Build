import React from 'react';
import { BookOpen, FileText, Target, User, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
const PlaceholderCard = ({ title, description, icon: Icon, cta, to }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-gray-100 p-6 rounded-full mb-6 relative">
            <Icon size={48} className="text-gray-400" />
            <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                SOON
            </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
            {description}
        </p>
        {cta && to && (
            <Link
                to={to}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
                {cta} <ArrowRight size={16} />
            </Link>
        )}
    </div>
);

export const Practice = () => (
    <PlaceholderCard
        title="Practice Arena"
        description="Sharpen your skills with real-world coding challenges and system design problems tailored to your target roles."
        icon={Target}
        cta="Go to Dashboard"
        to="/placement/dashboard"
    />
);

export const Assessments = () => (
    <PlaceholderCard
        title="Skill Assessments"
        description="Validate your expertise with standardized tests. Earn badges and prove your readiness to recruiters."
        icon={FileText}
        cta="View Readiness"
        to="/placement/dashboard"
    />
);

export const Resources = () => (
    <PlaceholderCard
        title="Resource Library"
        description="Curated articles, video tutorials, and cheat sheets to help you master every aspect of the interview process."
        icon={BookOpen}
        cta="Back to Home"
        to="/placement"
    />
);

export const Profile = () => (
    <PlaceholderCard
        title="Candidate Profile"
        description="Manage your personal info, resume versions, and application history in one centralized hub."
        icon={User}
        cta="Edit Resume"
        to="/resume/builder"
    />
);
