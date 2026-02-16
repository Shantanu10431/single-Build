import React from 'react';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Trash2 } from 'lucide-react';

export default function HistoryPage() {
    const { history, deleteAnalysis } = useAnalysisHistory();

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <p className="text-gray-500">No analysis history found.</p>
                <Link to="/placement/analysis/new">
                    <Button>Analyze your first JD</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analysis History</h1>
                <Link to="/placement/analysis/new">
                    <Button>New Analysis</Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {history.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {item.role || "Unknown Role"} {item.company ? `at ${item.company}` : ""}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Analyzed on {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString()}
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded">
                                        Score: {item.finalScore}/100
                                    </span>
                                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                        {Object.values(item.extractedSkills).flat().length} Skills Detected
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => deleteAnalysis(item.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                                <Link to={`/placement/analysis/results?id=${item.id}`}>
                                    <Button variant="secondary" className="flex items-center gap-2">
                                        View Results <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
