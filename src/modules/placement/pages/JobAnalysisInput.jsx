import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJD } from '../lib/analyzer';
import { useAnalysisHistory } from '../hooks/useAnalysisHistory';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { cn } from '../lib/utils';

export default function AnalyzePage() {
    const navigate = useNavigate();
    const { saveAnalysis } = useAnalysisHistory();
    const [loading, setLoading] = useState(false);

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [jdText, setJdText] = useState("");

    const handleAnalyze = () => {
        if (!jdText.trim()) return;

        setLoading(true);

        // Simulate processing delay for better UX
        setTimeout(() => {
            const result = analyzeJD(jdText, company, role);
            saveAnalysis(result);
            setLoading(false);
            navigate(`/placement/analysis/results?id=${result.id}`);
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analyze Job Description</h1>
                <p className="text-gray-500">Paste a JD below to get a personalized preparation plan and readiness score.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Company Name (Optional)"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <Input
                            placeholder="Job Role (Optional)"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Description / Requirements <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className={cn(
                                "w-full min-h-[300px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y transition-colors",
                                jdText.length > 0 && jdText.length < 200 ? "border-orange-300 bg-orange-50" : "border-gray-300"
                            )}
                            placeholder="Paste the full job description here..."
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                        />
                        {jdText.length > 0 && jdText.length < 200 && (
                            <p className="text-sm text-orange-600 mt-2 flex items-center">
                                ⚠️ This JD is too short to analyze deeply. Paste full JD for better output.
                            </p>
                        )}
                    </div>
                    <Button
                        className="w-full md:w-auto"
                        onClick={handleAnalyze}
                        disabled={!jdText.trim() || loading}
                    >
                        {loading ? "Analyzing..." : "Analyze Job Description"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
