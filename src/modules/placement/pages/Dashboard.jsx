
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { PlayCircle, Calendar, CheckCircle2 } from 'lucide-react';

const radarData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'Sys Design', A: 60, fullMark: 100 },
    { subject: 'Comm', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const upcomingAssessments = [
    { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", type: "Technical" },
    { title: "System Design Review", time: "Wed, 2:00 PM", type: "Review" },
    { title: "HR Interview Prep", time: "Friday, 11:00 AM", type: "Practice" },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>

            {/* Top Row: Readiness & Radar */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* 1. Overall Readiness */}
                <Card className="flex flex-col items-center justify-center p-6">
                    <CardHeader className="pb-2">
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center pt-6">
                        <div className="relative flex items-center justify-center">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-gray-100"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88 * (1 - 0.72)}
                                    className="text-indigo-600 transition-all duration-1000 ease-out"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-bold text-slate-900">72</span>
                                <span className="text-sm text-slate-500 uppercase tracking-wide font-medium mt-1">Score</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 mt-6 text-center">
                            You're in the top <span className="font-semibold text-indigo-600">15%</span> of peers.
                        </p>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                        <CardDescription>Analysis across 5 key areas</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="#4f46e5"
                                    strokeWidth={2}
                                    fill="#6366f1"
                                    fillOpacity={0.3}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Middle Row: Practice & Goals */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* 3. Continue Practice */}
                <Card>
                    <CardHeader>
                        <CardTitle>Continue Practice</CardTitle>
                        <CardDescription>Resume where you left off</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <PlayCircle className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-slate-900">Dynamic Programming</h4>
                                <p className="text-sm text-slate-500 mb-3">Topic: 1D DP Arrays</p>
                                <div className="flex items-center gap-2 mb-1">
                                    <Progress value={30} className="h-2" />
                                    <span className="text-xs font-medium text-slate-600">30%</span>
                                </div>
                                <p className="text-xs text-slate-400 mb-4">3/10 Problems Completed</p>

                                <button className="w-full py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 4. Weekly Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                        <CardDescription>Consistency is key to success</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-700">Problems Solved</span>
                                <span className="text-sm font-bold text-indigo-600">12 / 20</span>
                            </div>
                            <Progress value={60} className="h-3" />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                                    ${[0, 1, 3, 4].includes(i)
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-slate-100 text-slate-400'
                                            }`}
                                    >
                                        {day}
                                    </div>
                                    {i === 6 && <span className="text-[10px] text-slate-400">Today</span>}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom: Upcoming Assessments */}
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {upcomingAssessments.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.time}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-slate-200 text-slate-600">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
