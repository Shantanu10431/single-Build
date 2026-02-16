import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ReadinessChart } from '../components/dashboard/ReadinessChart';
import { SkillRadar } from '../components/dashboard/SkillRadar';
import { PracticeCard } from '../components/dashboard/PracticeCard';
import { WeeklyGoals } from '../components/dashboard/WeeklyGoals';
import { AssessmentsList } from '../components/dashboard/AssessmentsList';

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Readiness Score */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ReadinessChart score={72} />
                    </CardContent>
                </Card>

                {/* Skill Breakdown */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <SkillRadar />
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
                        <WeeklyGoals />
                    </CardContent>
                </Card>

                {/* Upcoming Assessments */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AssessmentsList />
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
