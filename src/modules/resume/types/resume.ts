export type TemplateType = 'classic' | 'modern' | 'minimal';

export interface Skills {
    technical: string[];
    soft: string[];
    tools: string[];
}

export interface ResumeData {
    template: TemplateType;
    personalInfo: {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        website?: string;
        linkedin?: string;
        github?: string;
    };
    summary: string;
    education: EducationItem[];
    experience: ExperienceItem[];
    projects: ProjectItem[];
    skills: Skills;
    accentColor?: string;
}

export interface EducationItem {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description?: string;
}

export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface ProjectItem {
    id: string;
    name: string;
    description: string;
    technologies: string[]; // Array of strings for tags
    liveUrl?: string;
    githubUrl?: string;
}

export const INITIAL_RESUME_DATA: ResumeData = {
    template: 'classic',
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    },
    accentColor: '#0ea5e9', // Sky-500 default
};

export const SAMPLE_RESUME_DATA: ResumeData = {
    template: 'classic',
    personalInfo: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan',
    },
    summary: 'Senior Software Engineer with 6+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Architecture. Passionate about developer experience and code quality.',
    education: [
        {
            id: '1',
            school: 'University of California, Berkeley',
            degree: 'B.S. Computer Science',
            startDate: '2014',
            endDate: '2018',
        }
    ],
    experience: [
        {
            id: '1',
            company: 'TechCorp Inc.',
            role: 'Senior Frontend Engineer',
            startDate: '2021',
            endDate: 'Present',
            description: 'Led the migration of the main dashboard to Next.js, improving load times by 40%.',
        },
        {
            id: '2',
            company: 'WebSolutions LLC',
            role: 'Full Stack Developer',
            startDate: '2018',
            endDate: '2021',
            description: 'Developed and maintained client websites using MERN stack.',
        }
    ],
    projects: [
        {
            id: '1',
            name: 'AI Resume Builder',
            technologies: ['Next.js', 'Tailwind', 'OpenAI'],
            description: 'An intelligent tool to help users craft professional resumes. Used Next.js 14 and Tailwind CSS for the frontend.',
            githubUrl: 'github.com/alex/resume-builder'
        }
    ],
    skills: {
        technical: ['JavaScript', 'TypeScript', 'React', 'Next.js'],
        soft: ['Leadership', 'Communication'],
        tools: ['Git', 'VS Code']
    },
};
