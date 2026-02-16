
// import { ATSScore } from '@/modules/resume/lib/scoring';
import { AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// interface ATSCircularScoreProps {
//     score: number;
//     size?: number;
// }

export default function ATSCircularScore({ scoreData, size = 60 }) {
    const { score, suggestions } = scoreData;
    const [isExpanded, setIsExpanded] = useState(true);

    // Color Logic
    let color = '#ef4444'; // Red (0-40)
    let status = 'Needs Work';
    let textColor = 'text-red-600';
    let bgColor = 'bg-red-50';

    if (score > 70) {
        color = '#16a34a'; // Green (71-100)
        status = 'Strong Resume';
        textColor = 'text-green-600';
        bgColor = 'bg-green-50';
    } else if (score > 40) {
        color = '#ca8a04'; // Amber (41-70)
        status = 'Getting There';
        textColor = 'text-yellow-600';
        bgColor = 'bg-yellow-50';
    }

    // Circle properties
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
            {/* Header / Score */}
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-4">
                    {/* Circular Progress */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke="#e5e7eb"
                                strokeWidth="6"
                                fill="transparent"
                            />
                            <circle
                                cx="50%"
                                cy="50%"
                                r={radius}
                                stroke={color}
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <span className={`absolute text-xl font-bold ${textColor}`}>{score}</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase text-gray-500 tracking-wide">ATS Score</h3>
                        <p className={`font-bold ${textColor}`}>{status}</p>
                    </div>
                </div>
                {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </div>

            {/* Suggestions Panel */}
            {isExpanded && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2">
                        {suggestions.length > 0 ? (
                            <><AlertTriangle size={12} /> Improvements Available</>
                        ) : (
                            <><CheckCircle size={12} /> Optimization Complete</>
                        )}
                    </h4>

                    {suggestions.length > 0 ? (
                        <ul className="space-y-2">
                            {suggestions.map((rec, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2 bg-white p-2 rounded-sm border border-gray-100">
                                    <span className="text-accent mt-0.5">•</span>
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-green-600 bg-green-50 p-2 rounded-sm border border-green-100">
                            Great job! Your resume hits all the key ATS markers.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
