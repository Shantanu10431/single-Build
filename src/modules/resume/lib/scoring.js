// Types removed for JavaScript
// import { ResumeData } from '@/modules/resume/types/resume';

export function calculateATSScore(data) {
    let score = 0;
    const suggestions = [];

    // 1. Contact Info (+30 max)
    if (data.personalInfo.fullName) score += 10;
    else suggestions.push("Add your full name (+10).");

    if (data.personalInfo.email) score += 10;
    else suggestions.push("Add your email address (+10).");

    if (data.personalInfo.phone) score += 5;

    if (data.personalInfo.linkedin) score += 5;
    else if (!data.personalInfo.linkedin && !data.personalInfo.phone) suggestions.push("Add Phone or LinkedIn (+5).");

    if (data.personalInfo.github) score += 5;

    // 2. Summary (+20 max)
    if (data.summary && data.summary.length > 50) {
        score += 10;

        // Action verbs check
        const actionVerbs = ['built', 'led', 'designed', 'improved', 'developed', 'managed', 'created', 'implemented', 'reduced', 'increased', 'launched', 'engineered', 'architected'];
        const hasActionVerb = actionVerbs.some(verb => data.summary.toLowerCase().includes(verb));
        if (hasActionVerb) {
            score += 10;
        } else {
            suggestions.push("Use action verbs in summary (e.g., 'Built', 'Led') (+10).");
        }
    } else {
        suggestions.push("Add a summary > 50 chars (+10).");
    }

    // 3. Experience (+15)
    const hasExperience = data.experience.length > 0;
    const hasbullets = data.experience.some(e => e.description && e.description.length > 10);
    if (hasExperience && hasbullets) {
        score += 15;
    } else {
        suggestions.push("Add at least 1 work experience with description (+15).");
    }

    // 4. Education (+10)
    if (data.education.length > 0) {
        score += 10;
    } else {
        suggestions.push("Add at least 1 education entry (+10).");
    }

    // 5. Skills (+10)
    const totalSkills = (data.skills?.technical?.length || 0) + (data.skills?.soft?.length || 0) + (data.skills?.tools?.length || 0);
    if (totalSkills >= 5) {
        score += 10;
    } else {
        suggestions.push("Add at least 5 skills (+10).");
    }

    // 6. Projects (+10)
    if (data.projects.length >= 1) {
        score += 10;
    } else {
        suggestions.push("Add at least 1 project (+10).");
    }

    return {
        score: Math.min(100, score),
        suggestions
    };
}
