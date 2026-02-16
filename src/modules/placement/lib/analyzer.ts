// Keywords for skill detection
const SKILL_KEYWORDS = {
    "Core CS": ["DSA", "Data Structures", "Algorithms", "OOP", "Object Oriented", "DBMS", "Database Management", "OS", "Operating Systems", "Networks", "Computer Networks", "System Design"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Golang", "Rust", "Swift", "Kotlin", "PHP", "Ruby"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL", "HTML", "CSS", "Tailwind", "Redux", "Vue", "Angular"],
    "Data": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "NoSQL", "Redis", "Elasticsearch", "Kafka", "Spark", "Hadoop"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Linux", "Git", "GitHub", "Terraform"],
    "Testing": ["Selenium", "Cypress", "Playwright", "Jest", "JUnit", "PyTest", "Mocha", "Chai"]
} as const;

// Types
export type SkillCategory = keyof typeof SKILL_KEYWORDS;

export interface ExtractedSkills {
    coreCS: string[];
    languages: string[];
    web: string[];
    data: string[];
    cloud: string[];
    testing: string[];
    other: string[];
}

export interface CompanyIntel {
    name: string;
    industry: string;
    size: "Startup" | "Mid-size" | "Enterprise";
    focus: string;
}

export interface RoundInfo {
    roundTitle: string;
    focusAreas: string[];
    whyItMatters: string;
}

export interface PlanDay {
    day: string;
    focus: string;
    tasks: string[];
}

export interface ChecklistRound {
    roundTitle: string;
    items: string[];
}

export interface AnalysisResult {
    id: string;
    createdAt: string;
    company: string | "";
    role: string | "";
    jdText: string;
    extractedSkills: ExtractedSkills;
    roundMapping: RoundInfo[];
    checklist: ChecklistRound[];
    plan7Days: PlanDay[];
    questions: string[];
    baseScore: number;
    skillConfidenceMap: Record<string, "know" | "practice">;
    finalScore: number;
    updatedAt: string;

    // Optional legacy field support if needed during migration, though we aim for strictness
    companyIntel?: CompanyIntel;
}

// 1. Skill Extraction
function extractSkills(jdText: string): ExtractedSkills {
    const extracted: ExtractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
    const lowerJD = jdText.toLowerCase();

    // Helper map to match keyword to category key in ExtractedSkills
    const categoryMap: Record<string, keyof ExtractedSkills> = {
        "Core CS": "coreCS",
        "Languages": "languages",
        "Web": "web",
        "Data": "data",
        "Cloud/DevOps": "cloud",
        "Testing": "testing"
    };

    let hasAnySkill = false;

    (Object.keys(SKILL_KEYWORDS) as SkillCategory[]).forEach(category => {
        const keywords = SKILL_KEYWORDS[category];
        const found = keywords.filter(keyword => lowerJD.includes(keyword.toLowerCase()));

        if (found.length > 0) {
            const mappedKey = categoryMap[category];
            if (mappedKey) {
                extracted[mappedKey] = found;
                hasAnySkill = true;
            }
        }
    });

    if (!hasAnySkill) {
        extracted.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    return extracted;
}

// 2. Scoring
function calculateBaseScore(extracted: ExtractedSkills, company: string, role: string, jdLength: number): number {
    let score = 35; // Base score

    // Count non-empty categories
    const categoriesPresent = Object.values(extracted).filter(arr => arr.length > 0).length;
    score += Math.min(30, categoriesPresent * 5);

    // Metadata bonuses
    if (company && company.trim().length > 1) score += 10;
    if (role && role.trim().length > 1) score += 10;
    if (jdLength > 800) score += 10;

    return Math.min(100, score);
}

// 3. Plan Generation
function generatePlan(extracted: ExtractedSkills): PlanDay[] {
    const hasWeb = extracted.web.length > 0;
    const hasData = extracted.data.length > 0;
    const hasDSA = extracted.coreCS.some(s => s.includes("DSA") || s.includes("Data Structures"));
    const isGeneric = extracted.other.length > 0 && extracted.coreCS.length === 0;

    if (isGeneric) {
        return [
            {
                day: "Day 1-2",
                focus: "Foundations",
                tasks: ["Review basic programming logic", "Practice aptitude questions", "Update Resume"]
            },
            {
                day: "Day 3-4",
                focus: "Problem Solving",
                tasks: ["Solve 5 simple coding problems", "Practice explaining your thought process"]
            },
            {
                day: "Day 5-6",
                focus: "Projects & Behavioural",
                tasks: ["Prepare project stories", "Practice STAR method answers"]
            },
            {
                day: "Day 7",
                focus: "Final Prep",
                tasks: ["Mock interview with friend", "Relax and review notes"]
            }
        ]
    }

    return [
        {
            day: "Day 1-2",
            focus: "Foundation & Core CS",
            tasks: [
                "Revise OOP concepts (Polymorphism, Inheritance, Encapsulation)",
                "Brush up on DBMS Basics (Normalization, ACID properties)",
                hasDSA ? "Focus on Arrays, Strings, and Linked Lists basics" : "Review basic logic and aptitude"
            ]
        },
        {
            day: "Day 3-4",
            focus: "Coding & Problem Solving",
            tasks: [
                "Solve 5-10 standard problems on LeetCode/GeeksForGeeks",
                "Practice common patterns: Sliding Window, Two Pointers",
                "Review Time and Space Complexity analysis"
            ]
        },
        {
            day: "Day 5",
            focus: "Project & Tech Stack",
            tasks: [
                hasWeb ? "Review React hooks, lifecycle methods, and state management" : "Review your strongest project's architecture",
                hasData ? "Practice SQL queries (Joins, Aggregations)" : "Prepare to explain your project's database schema",
                "Prepare 'Challenges Faced' stories for your projects"
            ]
        },
        {
            day: "Day 6",
            focus: "Mock Interviews",
            tasks: [
                "Conduct a peer mock interview",
                "Practice explaining your code while writing it",
                "Prepare for 'Tell me about yourself' and 'Why this role?'"
            ]
        },
        {
            day: "Day 7",
            focus: "Final Revision",
            tasks: [
                "Review weak areas identified during mock",
                "Read recent tech news or company blog",
                "Relax and get good sleep"
            ]
        }
    ];
}

// 4. Checklist Generation
function generateChecklist(extracted: ExtractedSkills): ChecklistRound[] {
    return [
        {
            roundTitle: "Round 1: Aptitude / Basics",
            items: [
                "Quantitative Aptitude (Time & Work, Profit & Loss)",
                "Logical Reasoning (Puzzles, Series)",
                "Verbal Ability (Reading Comprehension)",
                "Basic Debugging / Output guessing"
            ]
        },
        {
            roundTitle: "Round 2: DSA + Core CS",
            items: [
                "Array / String manipulation problems",
                "Basic Data Structures (Stack, Queue, LinkedList)",
                "OOP Principles explanations",
                "SQL Queries (Basic to Intermediate)",
                ...(extracted.coreCS.some(s => s.toLowerCase().includes("os")) ? ["Process vs Thread, Deadlocks"] : [])
            ]
        },
        {
            roundTitle: "Round 3: Tech Interview",
            items: [
                "Deep dive into Resume Projects",
                ...(extracted.web.length > 0 ? ["Frontend/Backend Architecture discussions"] : []),
                ...(extracted.data.length > 0 ? ["Database design and optimization"] : []),
                "System Design basics (Scalability, Load Balancing)",
                "Live Coding / Pair Programming"
            ]
        },
        {
            roundTitle: "Round 4: Managerial / HR",
            items: [
                "Behavioral questions (STAR method)",
                "Cultural fit alignment",
                "Salary negotiation preparation",
                "Questions to ask the interviewer"
            ]
        }
    ];
}

// 5. Question Generation
function generateQuestions(extracted: ExtractedSkills): string[] {
    const questions: string[] = [];

    // Core CS / DSA
    if (extracted.coreCS.some(s => s.includes("DSA") || s.includes("Data Structures"))) {
        questions.push("How would you find the middle element of a linked list in one pass?");
        questions.push("Explain the difference between Quick Sort and Merge Sort. When to use which?");
    }
    if (extracted.coreCS.includes("OOP")) {
        questions.push("Explain the Diamond Problem in multiple inheritance and how to resolve it.");
    }
    if (extracted.coreCS.includes("DBMS")) {
        questions.push("What are ACID properties? Explain with an example.");
    }

    // Web
    if (extracted.web.includes("React")) {
        questions.push("What is the Virtual DOM and how does it improve performance?");
        questions.push("Explain the difference between useEffect and useLayoutEffect.");
    }
    if (extracted.web.includes("Node.js")) {
        questions.push("Explain the Event Loop in Node.js.");
    }

    // Data
    if (extracted.data.some(s => s.includes("SQL"))) {
        questions.push("Write a SQL query to find the second highest salary from a table.");
        questions.push("Explain the difference between Clustered and Non-Clustered Indexes.");
    }

    // Default questions if list is short
    const defaults = [
        "Tell me about a challenging bug you fixed recently.",
        "How do you stay updated with the latest technology trends?",
        "Explain your favorite project from your resume.",
        "What happens when you type a URL in the browser and hit enter?"
    ];

    while (questions.length < 10) {
        const nextDefault = defaults.shift();
        if (nextDefault) questions.push(nextDefault);
        else break;
    }

    return questions.slice(0, 10);
}

// 6. Company Intel Generation
const KNOWN_ENTERPRISES = [
    "tcs", "infosys", "wipro", "accenture", "cognizant", "capgemini", "ibm", "deloitte",
    "amazon", "google", "microsoft", "meta", "facebook", "netflix", "apple",
    "oracle", "cisco", "intel", "samsung", "jpmorgan", "goldman sachs", "morgan stanley"
];

function generateCompanyIntel(company: string): CompanyIntel {
    if (!company) {
        return {
            name: "Unknown Company",
            industry: "Technology",
            size: "Startup",
            focus: "General technical competence and problem solving."
        };
    }

    const lowerCompany = company.toLowerCase();
    const isEnterprise = KNOWN_ENTERPRISES.some(e => lowerCompany.includes(e));

    if (isEnterprise) {
        return {
            name: company,
            industry: "Technology / IT Services",
            size: "Enterprise",
            focus: "Strong emphasis on DSA, Core CS fundamentals (OS, DBMS, Networks), and standard system design patterns."
        };
    }

    // Default to Startup/Mid-size behavior for others
    return {
        name: company,
        industry: "Technology / Product",
        size: "Startup",
        focus: "Practical problem solving, development speed, framework mastery, and ability to build end-to-end features."
    };
}

// 7. Round Mapping
function generateRoundMap(intel: CompanyIntel, extracted: ExtractedSkills): RoundInfo[] {
    const rounds: RoundInfo[] = [];

    if (intel.size === "Enterprise") {
        rounds.push({
            roundTitle: "Round 1: Online Assessment",
            focusAreas: ["Aptitude", "DSA (Easy-Medium)"],
            whyItMatters: "Elimination round. Speed and accuracy in generic problem solving are key."
        });
        rounds.push({
            roundTitle: "Round 2: Technical Round 1",
            focusAreas: ["DSA (Arrays/Trees/Graphs)", "Core CS"],
            whyItMatters: "Validates your fundamental computer science knowledge and coding hygiene."
        });
        rounds.push({
            roundTitle: "Round 3: Technical Round 2",
            focusAreas: ["Advanced DSA", "Project Deep Dive"],
            whyItMatters: "Tests depth of knowledge and ability to explain your design choices."
        });
        rounds.push({
            roundTitle: "Round 4: HR / Managerial",
            focusAreas: ["Behavioral", "Culture Fit"],
            whyItMatters: "Ensures you are a good team player and aligned with company values."
        });
    } else {
        // Startup Flow
        const hasWeb = extracted.web.length > 0;

        rounds.push({
            roundTitle: "Round 1: Screening / Assignment",
            focusAreas: hasWeb ? ["Build a Feature", "React/Node"] : ["Practical Coding", "Logic"],
            whyItMatters: "Proof of work. They want to see clean, working, and readable code."
        });
        rounds.push({
            roundTitle: "Round 2: Machine Coding",
            focusAreas: ["Live Coding", "Debugging"],
            whyItMatters: "Tests your debugging skills, communication, and how you handle pressure."
        });
        rounds.push({
            roundTitle: "Round 3: Tech Depth",
            focusAreas: ["System Design", "Stack Internals"],
            whyItMatters: "Assesses if you can build scalable and maintainable software."
        });
        rounds.push({
            roundTitle: "Round 4: Founder Round",
            focusAreas: ["Ownership", "Adaptability"],
            whyItMatters: "Startups hire for attitude and hunger to learn/build."
        });
    }

    return rounds;
}

// Main Analyzer Function
export function analyzeJD(jdText: string, company: string = "", role: string = ""): AnalysisResult {
    const extractedSkills = extractSkills(jdText);
    const baseScore = calculateBaseScore(extractedSkills, company, role, jdText.length);
    const plan7Days = generatePlan(extractedSkills);
    const checklist = generateChecklist(extractedSkills);
    const questions = generateQuestions(extractedSkills);

    // New Logic
    const companyIntel = generateCompanyIntel(company);
    const roundMapping = generateRoundMap(companyIntel, extractedSkills);

    // Initial skill confidence (all required practice by default)
    const skillConfidenceMap: Record<string, "know" | "practice"> = {};
    Object.values(extractedSkills).flat().forEach(skill => {
        skillConfidenceMap[skill] = "practice";
    });

    // Final score starts at base score + modifiers (initially -2 for all practice)
    // Actually, let's keep baseScore as "potential" score?
    // User requested baseScore computed ONLY on analyze.
    // finalScore changes based on confidence.

    // Initial modifier: all are "practice" (-2 each? or just start relative to base?)
    // Let's replicate logic: "know" = +2, "practice" = -2.
    // To allow 0-100 range, let's say base score matches the "potential".
    // Actually, user said: "finalScore changes only based on skillConfidenceMap".
    // We'll init finalScore = baseScore. Then UI updates it.

    // BUT, if we init everything to "practice", the live score will immediately drop.
    // Let's set finalScore = baseScore initially. The UI will then apply modifiers.
    // Wait, better to pre-calculate it so initial state is consistent.

    let initialModifier = 0;
    // If we default everything to "practice", score drops massively. 
    // Maybe default "practice" is neutral, "know" is +? 
    // Previous logic: know +2, practice -2.
    // If we have 10 skills, that's -20.
    // Let's stick to user request: "When user toggles skills: update finalScore".

    const finalScore = baseScore; // Start neutral.

    return {
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        plan7Days,
        checklist,
        questions,
        roundMapping,
        baseScore,
        skillConfidenceMap, // Empty initially? Or populated? User said: "default behavior if no skills detected... populate 'other'".
        // We populated 'other' in extraction.
        // Let's leave confidence map empty initially to signify "not assessed yet", 
        // or populate it? The previous code populated it if empty.
        // Let's populate it here to be strict.
        finalScore,
        companyIntel
    };
}
