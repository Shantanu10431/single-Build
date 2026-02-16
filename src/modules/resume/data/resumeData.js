export const initialResumeState = {
    personal: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        website: '',
        linkedin: '',
        github: ''
    },
    summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    }
};

export const sampleResume = {
    personal: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: 'Senior Software Engineer',
        website: 'alexmorgan.dev',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan'
    },
    summary: 'Results-driven software engineer with 6+ years of experience building scalable web applications. Expert in React, Node.js, and Cloud Architecture. Passionate about clean code and user experience.',
    experience: [
        {
            id: 1,
            company: 'TechCorp Inc.',
            role: 'Senior Frontend Developer',
            date: '2021 - Present',
            description: 'Led a team of 5 developers to rebuild the core dashboard.\nImproved performance by 40% using React Server Components.\nMentored junior developers and established code quality standards.'
        },
        {
            id: 2,
            company: 'StartupX',
            role: 'Full Stack Developer',
            date: '2019 - 2021',
            description: 'Built the MVP from scratch using MERN stack.\nScaled the application to 100k+ active users.\nIntegrated Stripe payments and Twilio notifications.'
        }
    ],
    education: [
        {
            id: 1,
            school: 'University of Technology',
            degree: 'B.S. Computer Science',
            date: '2015 - 2019',
            description: 'Graduated with Honors. President of the Coding Club.'
        }
    ],
    projects: [
        {
            id: 1,
            name: 'AI Resume Builder',
            description: 'A premium resume building tool using React and OpenAI. Features include real-time preview, PDF export, and ATS optimization.',
            techStack: ['React', 'OpenAI API', 'Tailwind'],
            liveUrl: 'resume-builder.demo.com',
            githubUrl: 'github.com/alexmorgan/resume-builder'
        },
        {
            id: 2,
            name: 'E-commerce Dashboard',
            description: 'Real-time analytics dashboard for online retailers. Visualized sales data using D3.js and providing actionable insights.',
            techStack: ['Vue.js', 'D3.js', 'Firebase'],
            liveUrl: 'dashboard-demo.com',
            githubUrl: 'github.com/alexmorgan/ecommerce-dash'
        }
    ],
    skills: {
        technical: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL'],
        soft: ['Team Leadership', 'Mentoring', 'Agile/Scrum'],
        tools: ['Docker', 'AWS', 'Git', 'Figma']
    }
};
