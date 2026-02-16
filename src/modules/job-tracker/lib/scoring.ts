import { Job, JobMode, JobExperience, JobSource } from "./data";

export interface UserPreferences {
    roleKeywords: string[];
    preferredLocations: string[];
    preferredModes: JobMode[];
    experienceLevel: string;
    skills: string[];
    minMatchScore: number;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
    roleKeywords: [],
    preferredLocations: [],
    preferredModes: [],
    experienceLevel: "",
    skills: [],
    minMatchScore: 40,
};

export function calculateMatchScore(job: Job, prefs: UserPreferences): number {
    if (!prefs) return 0;

    let score = 0;

    // 1. Role Keyword in Title (+25)
    // Case-insensitive check if any keyword is present job title
    const titleMatch = prefs.roleKeywords.some(keyword =>
        keyword.trim() && job.title.toLowerCase().includes(keyword.toLowerCase().trim())
    );
    if (titleMatch) score += 25;

    // 2. Role Keyword in Description (+15)
    const descMatch = prefs.roleKeywords.some(keyword =>
        keyword.trim() && job.description.toLowerCase().includes(keyword.toLowerCase().trim())
    );
    if (descMatch) score += 15;

    // 3. Location Match (+15)
    // Exact match with one of the preferred locations
    const locationMatch = prefs.preferredLocations.some(loc =>
        loc.trim() && job.location.toLowerCase() === loc.toLowerCase().trim()
    );
    if (locationMatch) score += 15;

    // 4. Mode Match (+10)
    if (prefs.preferredModes.includes(job.mode)) {
        score += 10;
    }

    // 5. Experience Match (+10)
    // Simple string match for MVP. 
    // Refinement: Ideally strict mapping, but text match works for "Fresher" == "Fresher"
    if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
        score += 10;
    }

    // 6. Skills Overlap (+15)
    // Check if ANY of the user skills appear in job skills
    const hasSkillOverlap = prefs.skills.some(userSkill =>
        job.skills.some(jobSkill =>
            jobSkill.toLowerCase() === userSkill.toLowerCase().trim()
        )
    );
    if (hasSkillOverlap) score += 15;

    // 7. Recency (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 8. Source (+5)
    if (job.source === "LinkedIn") {
        score += 5;
    }

    // Cap at 100
    return Math.min(score, 100);
}
