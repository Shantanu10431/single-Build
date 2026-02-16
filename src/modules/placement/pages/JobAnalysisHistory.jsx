
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/analysisEngine';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Clock, ArrowRight } from 'lucide-react';

export default function JobAnalysisHistory() {
    const navigate = useNavigate();
    const [history] = useState(() => getHistory());

    const handleView = (item) => {
        localStorage.setItem('placement_current', JSON.stringify(item));
        navigate('/analysis/results');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-6 h-6 text-indigo-600" /> Analysis History
            </h2>

            {history.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">No history found. Run your first analysis!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {history.map((item) => {
                        // Safety check for corrupted entries
                        if (!item || !item.id) return null;
                        const displayScore = item.finalScore !== undefined ? item.finalScore : item.readinessScore;

                        return (
                            <Card
                                key={item.id}
                                onClick={() => handleView(item)}
                                className="hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900">{item.role || "Untitled Role"}</h3>
                                        <p className="text-slate-500">{item.company || "Unknown Company"}</p>
                                        <p className="text-xs text-slate-400 mt-1">{new Date(item.createdAt).toLocaleDateString()} • {new Date(item.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-indigo-600">{displayScore}</div>
                                            <div className="text-xs font-medium text-slate-400 uppercase">Score</div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
