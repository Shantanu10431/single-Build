
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

export const SkillRadar = ({ data }) => {
    // Default empty state if no data provided
    const chartData = data || [
        { subject: "DSA", A: 0, fullMark: 100 },
        { subject: "System Design", A: 0, fullMark: 100 },
        { subject: "Communication", A: 0, fullMark: 100 },
        { subject: "Resume", A: 0, fullMark: 100 },
        { subject: "Aptitude", A: 0, fullMark: 100 },
    ];

    return (
        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
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
