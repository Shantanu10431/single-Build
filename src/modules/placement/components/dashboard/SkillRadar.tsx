"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

const data = [
    { subject: "DSA", A: 75, fullMark: 100 },
    { subject: "System Design", A: 60, fullMark: 100 },
    { subject: "Communication", A: 80, fullMark: 100 },
    { subject: "Resume", A: 85, fullMark: 100 },
    { subject: "Aptitude", A: 70, fullMark: 100 },
];

export const SkillRadar = () => {
    return (
        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="hsl(245, 58%, 51%)"
                        fill="hsl(245, 58%, 51%)"
                        fillOpacity={0.2}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};
