
export const RESUME_STEPS = [
    {
        id: "01-problem",
        stepNumber: 1,
        title: "Define the Problem",
        route: "/rb/01-problem",
        prompt: "Identify the core problem your AI Resume Builder solves. Focus on ATS rejection rates and lack of personalization."
    },
    {
        id: "02-market",
        stepNumber: 2,
        title: "Market Analysis",
        route: "/rb/02-market",
        prompt: "Analyze existing resume builders. Identify gaps in 'Generic Templates' vs 'AI Content Optimization'."
    },
    {
        id: "03-architecture",
        stepNumber: 3,
        title: "System Architecture",
        route: "/rb/03-architecture",
        prompt: "Define the tech stack (React, Node.js, OpenAI API) and data flow."
    },
    {
        id: "04-hld",
        stepNumber: 4,
        title: "High Level Design",
        route: "/rb/04-hld",
        prompt: "Draw the HLD: User -> FrontEnd -> Backend -> AI Service -> Database."
    },
    {
        id: "05-lld",
        stepNumber: 5,
        title: "Low Level Design",
        route: "/rb/05-lld",
        prompt: "Design the Database Schema (Users, Resumes, Experience) and API endpoints."
    },
    {
        id: "06-build",
        stepNumber: 6,
        title: "Core Development",
        route: "/rb/06-build",
        prompt: "Implement the Resume Editor and AI Generation logic."
    },
    {
        id: "07-test",
        stepNumber: 7,
        title: "Testing & Validation",
        route: "/rb/07-test",
        prompt: "Write unit tests for the parser and integration tests for the API."
    },
    {
        id: "08-ship",
        stepNumber: 8,
        title: "Deployment & Shipping",
        route: "/rb/08-ship",
        prompt: "Deploy to Vercel/Netlify and configure environment variables."
    }
];
