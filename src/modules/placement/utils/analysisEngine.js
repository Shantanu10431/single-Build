
// Keywords Mapping (Enhanced for Schema)
const SKILL_KEYWORDS = {
    "coreCS": ["DSA", "Data Structures", "Algorithms", "OOP", "Object Oriented", "DBMS", "Database Management", "OS", "Operating Systems", "Computer Networks", "System Design", "Low Level Design", "High Level Design"],
    "languages": ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Golang", "Ruby", "Swift", "Kotlin", "PHP", "Rust"],
    "web": ["React", "Next.js", "Node.js", "Express", "HTML", "CSS", "Tailwind", "Redux", "Vue", "Angular", "REST", "GraphQL", "API"],
    "data": ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Redis", "Kafka", "Cassandra", "Elasticsearch"],
    "cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Terraform", "Linux", "Git"],
    "testing": ["Selenium", "Cypress", "Playwright", "Jest", "Mocha", "JUnit", "PyTest"]
};

const INTERVIEW_QUESTIONS = {
    "React": [
        "Explain the Virtual DOM and how it works.",
        "What are React Hooks? Name the rules of hooks.",
        "Difference between useMemo and useCallback.",
        "How does React handle state management? (Context vs Redux)",
        "Explain the component lifecycle methods."
    ],
    // ... (Keep existing questions map short for brevity in this file, but logic remains)
    "Java": ["Explain JDK vs JRE vs JVM.", "Explain Polymorphism.", "Abstract Class vs Interface.", "Thread Synchronization.", "equals() vs =="],
    "Python": ["List comprehensions.", "Decorators.", "Deep vs Shallow copy.", "Memory management.", "List vs Tuple."],
    "SQL": ["Inner vs Outer Join.", "Normalization (1NF, 2NF, 3NF).", "WHERE vs HAVING.", "Primary vs Foreign Key.", "ACID properties."],
    "DSA": ["Time vs Space Complexity.", "Array vs Linked List.", "Hash Map internals.", "Quick Sort vs Merge Sort.", "BFS vs DFS."],
    "System Design": ["Design URL shortener.", "Load Balancing.", "SQL vs NoSQL.", "Caching strategies.", "Microservices vs Monolithic."]
};

// Helper: Extract skills from text (Strict Schema)
function extractSkills(text) {
    const lowerText = text.toLowerCase();

    // Initialize strict schema
    const extracted = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: [] // Fallback
    };

    for (const [category, keywords] of Object.entries(SKILL_KEYWORDS)) {
        const found = keywords.filter(k => lowerText.includes(k.toLowerCase()));
        if (found.length > 0) {
            extracted[category] = found;
        }
    }

    // If no skills found, populate 'other'
    const allExtractedSkills = Object.values(extracted).flat();
    if (allExtractedSkills.length === 0) {
        extracted["other"] = ["Problem Solving", "Communication", "Basic Coding", "Projects"];
    }

    return { extracted };
}

// Helper: Calculate Base Score (Stable)
function calculateBaseScore(text, company, role, extracted) {
    let score = 35; // Start

    // +5 per detected category (excluding 'other' if only specific ones count, but schema implies categories)
    const categoriesPresent = Object.keys(extracted).filter(k => extracted[k].length > 0 && k !== 'other').length;
    score += Math.min(categoriesPresent * 5, 30);

    // Metadata
    if (company && company.trim().length > 0) score += 10;
    if (role && role.trim().length > 0) score += 10;

    // Length
    if (text.length > 800) score += 10;

    return Math.min(score, 100);
}

// Helper: Get Company Intel
function getCompanyIntel(company, text) {
    const entKeywords = ["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Adobe", "Salesforce", "Uber", "Lyft", "Airbnb", "TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "IBM", "Oracle", "Cisco", "Intel", "Samsung"];
    // Safety check for company string
    const safeCompany = company || "";
    const isEnterprise = entKeywords.some(k => safeCompany.toLowerCase().includes(k.toLowerCase())) || text.toLowerCase().includes("global leader") || text.toLowerCase().includes("multinational");

    if (isEnterprise) {
        return {
            type: "Enterprise",
            industry: "Technology Services / Product",
            size: "2000+ Employees",
            focus: "Focus on Algorithms, Data Structures, Scalability, and Core CS Fundamentals."
        };
    } else {
        return {
            type: "Startup / Mid-size",
            industry: "Internet / Software",
            size: "< 200 Employees",
            focus: "Focus on Practical Skills, Framework proficiency, Speed of delivery, and Problem Solving."
        };
    }
}

// Helper: Rounds (Schema: roundTitle, focusAreas, whyItMatters)
function generateRoundMapping(intel, extracted) {
    const rounds = [];
    const skills = Object.values(extracted).flat();
    const hasSystemDesign = skills.some(s => ["System Design", "Scalability"].some(k => s.includes(k)));

    if (intel.type === "Enterprise") {
        rounds.push({
            roundTitle: "Online Assessment",
            focusAreas: ["DSA", "Aptitude"],
            whyItMatters: "Filters candidates at scale based on raw problem-solving ability."
        });
        rounds.push({
            roundTitle: "Technical Round 1",
            focusAreas: ["Data Structures", "Algorithms"],
            whyItMatters: "Validates coding proficiency and algorithmic thinking."
        });
        rounds.push({
            roundTitle: "Technical Round 2",
            focusAreas: hasSystemDesign ? ["System Design (HLD/LLD)"] : ["Core CS", "Optimizations"],
            whyItMatters: "Checks architectural understanding and depth of CS knowledge."
        });
        rounds.push({
            roundTitle: "Managerial / HR",
            focusAreas: ["Behavioral", "Culture Fit"],
            whyItMatters: "Assesses culture fit and long-term potential."
        });
    } else {
        rounds.push({
            roundTitle: "Screening / Assignment",
            focusAreas: ["Take-home Project", "Resume Deep-dive"],
            whyItMatters: "Verifies practical ability to build actual software."
        });
        rounds.push({
            roundTitle: "Technical Discussion",
            focusAreas: ["Stack Specifics", "Live Coding"],
            whyItMatters: "Tests hands-on debugging and framework knowledge."
        });
        rounds.push({
            roundTitle: "Founder / Culture Fit",
            focusAreas: ["Product Sense", "Ownership"],
            whyItMatters: "Ensures you can wear multiple hats and drive growth."
        });
    }
    return rounds;
}

// Helper: Checklist (Schema: roundTitle, items[])
function generateChecklist(extracted) {
    const csSkills = extracted.coreCS || [];
    const webSkills = extracted.web || [];

    return [
        {
            roundTitle: "Round 1: Aptitude & Basics",
            items: ["Quantitative Aptitude (Time & Work, Percentages)", "Logical Reasoning", "Verbal Basics", "Resume Walkthrough"]
        },
        {
            roundTitle: "Round 2: DSA & Core CS",
            items: ["Arrays & Strings", "Linked Lists", "SQL Basics", "OOP Principles"]
        },
        {
            roundTitle: "Round 3: Advanced Tech",
            items: [...webSkills, ...csSkills].slice(0, 5).map(s => `Deep dive into ${s}`).concat(webSkills.length === 0 && csSkills.length === 0 ? ["Project Architecture Deep Dive"] : [])
        },
        {
            roundTitle: "Round 4: Managerial/HR",
            items: ["Why this company?", "Salary Expectations", "Relocation", "Star Method Stories"]
        }
    ];
}

function generatePlan(extracted) {
    const hasWeb = extracted.web.length > 0;

    return [
        { day: "Day 1-2", focus: "Foundation & Core CS", tasks: ["Revise OOP principles", "Review Operating System concepts", "Practice basic aptitude problems"] },
        { day: "Day 3-4", focus: "DSA & Coding", tasks: ["Practice Arrays & Strings", "Revise Trees & Graphs", "Solve 5 SQL queries"] },
        { day: "Day 5", focus: "Project & Tech Stack", tasks: [hasWeb ? "Review component lifecycle" : "Review Project Architecture", "Prepare project elevator pitch", "Check System Design basics"] },
        { day: "Day 6", focus: "Mock Interviews", tasks: ["Run a peer mock interview", "Practice behavioral questions", "Review past interview experiences"] },
        { day: "Day 7", focus: "Revision & Rest", tasks: ["Revise weak areas", "Quick look at resume keywords", "Relax and sleep early"] }
    ];
}

function generateQuestions(extracted) {
    let questions = [];
    const allSkills = Object.values(extracted).flat();

    allSkills.forEach(skill => {
        Object.keys(INTERVIEW_QUESTIONS).forEach(cat => {
            if (skill.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(skill.toLowerCase())) {
                questions.push(...INTERVIEW_QUESTIONS[cat]);
            }
        })
    });

    if (questions.length < 5) {
        questions.push(
            "Tell me about a challenging project you worked on.",
            "What are your strengths and weaknesses?",
            ...INTERVIEW_QUESTIONS["DSA"]
        );
    }

    return [...new Set(questions)].sort(() => 0.5 - Math.random()).slice(0, 10);
}

// Main Analysis Function (Strict Schema)
export function analyzeJob(company, role, jdText) {
    const { extracted } = extractSkills(jdText);
    const score = calculateBaseScore(jdText, company, role, extracted);
    const plan = generatePlan(extracted);
    const checklist = generateChecklist(extracted);
    const questions = generateQuestions(extracted);
    const intel = getCompanyIntel(company, jdText);
    const roundMapping = generateRoundMapping(intel, extracted);

    // Initialize confidence map
    const skillConfidenceMap = {};
    Object.values(extracted).forEach((skillsArray) => {
        skillsArray.forEach(skill => {
            skillConfidenceMap[skill] = 'practice';
        });
    });

    // Result Object adhering to requested schema
    const result = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills: extracted, // { coreCS: [], ... }
        roundMapping: roundMapping, // [{ roundTitle, focusAreas, whyItMatters }]
        checklist: checklist, // [{ roundTitle, items[] }]
        plan7Days: plan,
        questions,
        companyIntel: intel, // Keeping for UI use
        baseScore: score,
        skillConfidenceMap,
        finalScore: score // Initial final score equals base
    };

    saveToHistory(result);
    return result;
}

// Persistence
export function saveToHistory(result) {
    const history = getHistory();
    history.unshift(result);
    localStorage.setItem('placement_history', JSON.stringify(history));
    localStorage.setItem('placement_current', JSON.stringify(result));
}

export function updateHistoryEntry(updatedEntry) {
    const history = getHistory();
    const index = history.findIndex(h => h.id === updatedEntry.id);
    if (index !== -1) {
        updatedEntry.updatedAt = new Date().toISOString(); // Update timestamp
        history[index] = updatedEntry;
        localStorage.setItem('placement_history', JSON.stringify(history));
    }
    localStorage.setItem('placement_current', JSON.stringify(updatedEntry));
}

export function getHistory() {
    try {
        const raw = localStorage.getItem('placement_history');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed; // Filter checks can happen in UI or here. UI is safer for visuals.
    } catch (e) {
        console.error("History corruption:", e);
        return [];
    }
}

export function getCurrentAnalysis() {
    try {
        return JSON.parse(localStorage.getItem('placement_current'));
    } catch {
        return null;
    }
}
