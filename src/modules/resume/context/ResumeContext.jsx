import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialResumeState, sampleResume } from '../data/resumeData';

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderData');
        let parsed = saved ? JSON.parse(saved) : initialResumeState;

        // 1. Handle Legacy Skills Array -> Object Migration FIRST
        if (parsed.skills && Array.isArray(parsed.skills)) {
            parsed.skills = {
                technical: parsed.skills,
                soft: [],
                tools: []
            };
        }

        // 2. Ensure all top-level keys exist by merging with initialResumeState
        parsed = { ...initialResumeState, ...parsed };

        // 3. Ensure nested objects exist (Safe merge)
        parsed.personal = { ...initialResumeState.personal, ...(parsed.personal || {}) };

        // Ensure skills is an object (it should be now, but safe fallback)
        parsed.skills = { ...initialResumeState.skills, ...(parsed.skills || {}) };

        // 4. Ensure arrays exist
        parsed.experience = Array.isArray(parsed.experience) ? parsed.experience : [];
        parsed.education = Array.isArray(parsed.education) ? parsed.education : [];
        parsed.projects = Array.isArray(parsed.projects) ? parsed.projects : [];

        return parsed;
    });

    const [activeSection, setActiveSection] = useState('personal');
    const [template, setTemplate] = useState(() => localStorage.getItem('resumeTemplate') || 'modern');
    const [themeColor, setThemeColor] = useState(() => localStorage.getItem('resumeTheme') || '#0d9488'); // Default Teal

    // save resumeData
    useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
    }, [resumeData]);

    // save template
    useEffect(() => {
        localStorage.setItem('resumeTemplate', template);
    }, [template]);

    // save theme
    useEffect(() => {
        localStorage.setItem('resumeTheme', themeColor);
    }, [themeColor]);

    const { score, suggestions } = React.useMemo(() => {
        let currentScore = 0;
        let newSuggestions = [];

        // 1. Personal Info Check (15 pts)
        const personal = resumeData.personal;
        if (personal.fullName && personal.email && personal.phone && personal.location) {
            currentScore += 15;
        } else {
            newSuggestions.push({ id: 'personal', text: 'Complete all personal details (Name, Email, Phone, Location).' });
        }
        if (personal.linkedin) currentScore += 5;

        // 2. Summary Check (10 pts)
        if (resumeData.summary && resumeData.summary.length > 50) {
            currentScore += 10;
        } else {
            newSuggestions.push({ id: 'summary', text: 'Write a professional summary of at least 50 characters.' });
        }

        // 3. Experience Check (30 pts)
        if (resumeData.experience.length >= 1) currentScore += 15;
        if (resumeData.experience.length >= 2) currentScore += 15;
        if (resumeData.experience.length === 0) {
            newSuggestions.push({ id: 'experience', text: 'Add at least one professional experience.' });
        }

        // 4. Skills Check (20 pts)
        const totalSkills = (resumeData.skills.technical?.length || 0) + (resumeData.skills.soft?.length || 0) + (resumeData.skills.tools?.length || 0);
        if (totalSkills >= 5) currentScore += 20;
        else newSuggestions.push({ id: 'skills', text: `Add more skills (Current: ${totalSkills}, Target: 5+).` });

        // 5. Education Check (10 pts)
        if (resumeData.education.length > 0) currentScore += 10;

        // 6. Projects Check (10 pts)
        if (resumeData.projects.length > 0) currentScore += 10;

        return { score: currentScore, suggestions: newSuggestions.slice(0, 3) };
    }, [resumeData]);


    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateSection = (section, data) => {
        setResumeData(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const updateSkills = (category, skills) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: skills
            }
        }));
    };

    const loadSample = () => {
        setResumeData(sampleResume);
    };

    return (
        <ResumeContext.Provider value={{
            resumeData, updatePersonal, updateSection, updateSkills, loadSample,
            score, suggestions,
            activeSection, setActiveSection,
            template, setTemplate,
            themeColor, setThemeColor
        }}>
            {children}
        </ResumeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useResume = () => {
    return useContext(ResumeContext);
};
