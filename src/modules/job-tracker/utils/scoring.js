
/**
 * Calculates a match score (0-100) based on user preferences.
 * 
 * Rules:
 * +25 if roleKeyword in title
 * +15 if roleKeyword in description
 * +15 if location matches preferredLocations
 * +10 if mode matches preferredMode
 * +10 if experience matches experienceLevel
 * +15 if skill match (overlap)
 * +5 if posted <= 2 days
 * +5 if source is LinkedIn
 */
export function calculateMatchScore(job, prefs) {
    if (!prefs) return { score: 0, color: '#e5e5e5' }; // No prefs = 0 score

    let score = 0;

    // 1. Role Keywords (Title: +25, Desc: +15)
    // prefs.roleKeywords is a comma-separated string
    const keywords = prefs.roleKeywords ? prefs.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k) : [];

    if (keywords.length > 0) {
        const titleLower = job.title.toLowerCase();
        const descLower = job.description.toLowerCase();

        // Check Title
        const titleMatch = keywords.some(k => titleLower.includes(k));
        if (titleMatch) score += 25;

        // Check Description
        const descMatch = keywords.some(k => descLower.includes(k));
        if (descMatch) score += 15;
    }

    // 2. Location (+15)
    // prefs.preferredLocations is a multi-select array or comma-separated string. We'll handle both if possible, start with array check from UI.
    // Assuming prefs.preferredLocations is an array of strings.
    if (prefs.preferredLocations && prefs.preferredLocations.length > 0) {
        if (prefs.preferredLocations.includes(job.location)) {
            score += 15;
        }
    }

    // 3. Mode (+10)
    // prefs.preferredMode is an array of strings (["Remote", "Hybrid"])
    if (prefs.preferredMode && prefs.preferredMode.length > 0) {
        if (prefs.preferredMode.includes(job.mode)) {
            score += 10;
        }
    }

    // 4. Experience (+10)
    // prefs.experienceLevel is a single string
    if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
        score += 10;
    }

    // 5. Skills (+15)
    // prefs.skills is a comma-separated string
    const userSkills = prefs.skills ? prefs.skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s) : [];
    if (userSkills.length > 0 && job.skills) {
        const hasSkillMatch = job.skills.some(jobSkill => userSkills.includes(jobSkill.toLowerCase()));
        if (hasSkillMatch) {
            score += 15;
        }
    }

    // 6. Posted Date (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 7. Source (+5)
    if (job.source === 'LinkedIn') {
        score += 5;
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Determine Color
    let color = '#e5e5e5'; // Grey < 40
    if (score >= 80) color = '#2e7d32'; // Green
    else if (score >= 60) color = '#ffa000'; // Amber
    else if (score >= 40) color = '#757575'; // Neutral (Dark Grey)

    return { score, color };
}
