

// import { ATSScore } from '@/modules/resume/lib/scoring';
import { AlertCircle, CheckCircle } from 'lucide-react';

// interface ScorePanelProps {
//     scoreData: ATSScore;
// }

export default function ScorePanel({ scoreData }) {
    const { score, suggestions } = scoreData;

    // Determine color based on score
    let colorClass = 'text-red-600';
    let bgClass = 'bg-red-50';
    let borderClass = 'border-red-200';

    if (score >= 80) {
        colorClass = 'text-green-700';
        bgClass = 'bg-green-50';
        borderClass = 'border-green-200';
    } else if (score >= 50) {
        colorClass = 'text-yellow-700'; // Darker yellow for contrast
        bgClass = 'bg-yellow-50';
        borderClass = 'border-yellow-200';
    }

    return (
        <div className="card p-4 space-y-4 mb-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wide text-muted">ATS Readiness Score</h3>
                <span className={`text-2xl font-bold font-serif ${colorClass}`}>{score}/100</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${score >= 80 ? 'bg-green-600' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${score}%` }}
                ></div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 ? (
                <div className={`p-3 rounded-sm border ${bgClass} ${borderClass}`}>
                    <h4 className={`text-xs font-bold uppercase mb-2 ${colorClass} flex items-center gap-1`}>
                        <AlertCircle size={12} /> Improvements
                    </h4>
                    <ul className="space-y-1">
                        {suggestions.map((s, i) => (
                            <li key={i} className={`text-xs ${colorClass} flex gap-2`}>
                                <span>•</span>
                                <span>{s}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="p-3 rounded-sm border border-green-200 bg-green-50 text-green-700 flex items-center gap-2 text-xs font-medium">
                    <CheckCircle size={14} />
                    <span>Excellent! Your resume is ready.</span>
                </div>
            )}
        </div>
    );
}
