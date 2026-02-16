
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ReadinessChart } from '../components/dashboard/ReadinessChart';
import { SkillRadar } from '../components/dashboard/SkillRadar';
import { PracticeCard } from '../components/dashboard/PracticeCard';
import { WeeklyGoals } from '../components/dashboard/WeeklyGoals';
import { AssessmentsList } from '../components/dashboard/AssessmentsList';
import { Button } from '../components/ui/Button';
import { Database } from 'lucide-react';

const DEMO_DATA = {
    readiness: 78,
    skills: [
        { subject: "DSA", A: 85, fullMark: 100 },
        { subject: "System Design", A: 65, fullMark: 100 },
        { subject: "Communication", A: 90, fullMark: 100 },
        { subject: "Resume", A: 95, fullMark: 100 },
        { subject: "Aptitude", A: 75, fullMark: 100 },
    ],
    goals: {
        solved: 18,
        total: 20,
        activity: [
            { name: "M", active: true },
            { name: "T", active: true },
            { name: "W", active: true },
            { name: "T", active: false },
            { name: "F", active: true },
            { name: "S", active: true },
            { name: "S", active: false },
        ]
    },
    assessments: [
        {
            title: "Mock Interview: Google L4",
            date: "Tomorrow",
            time: "4:00 PM",
            type: "Technical",
        },
        {
            title: "System Design: WhatsApp",
            date: "Thu, 18 Feb",
            time: "11:00 AM",
            type: "Design",
        },
        {
            title: "Behavioral: STAR Method",
            date: "Sat, 20 Feb",
            time: "2:00 PM",
            type: "Soft Skills",
        }
    ]
};

export default function Dashboard() {
    const [readiness, setReadiness] = useState(45);
    const [skills, setSkills] = useState(null); // Null will trigger default empty state in component
    const [goals, setGoals] = useState({ solved: 5, total: 20, activity: [] });
    const [assessments, setAssessments] = useState([]);

    const loadDemoData = () => {
        setReadiness(DEMO_DATA.readiness);
        setSkills(DEMO_DATA.skills);
        setGoals(DEMO_DATA.goals);
        setAssessments(DEMO_DATA.assessments);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
                <Button variant="outline" size="sm" onClick={loadDemoData} className="gap-2">
                    <Database className="w-4 h-4" />
                    Load Demo Data
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Readiness Score */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ReadinessChart score={readiness} />
                    </CardContent>
                </Card>

                {/* Skill Breakdown */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <SkillRadar data={skills} />
                    </CardContent>
                </Card>

                {/* Continue Practice */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Continue Practice</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-5rem)]">
                        <PracticeCard />
                    </CardContent>
                </Card>

                {/* Weekly Goals */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WeeklyGoals
                            solved={goals.solved}
                            total={goals.total}
                            activity={goals.activity}
                        />
                    </CardContent>
                </Card>

                {/* Upcoming Assessments */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AssessmentsList items={assessments} />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
