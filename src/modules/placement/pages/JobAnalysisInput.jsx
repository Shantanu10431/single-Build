
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJob } from '../utils/analysisEngine';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Search } from 'lucide-react';

export default function JobAnalysisInput() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        jdText: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate processing delay for "Realism"
        setTimeout(() => {
            analyzeJob(formData.company, formData.role, formData.jdText);
            setLoading(false);
            navigate('/analysis/results');
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">New Job Analysis</h2>
            <p className="text-slate-600">
                Paste a job description to get a personalized preparation plan, interview questions, and a readiness score.
            </p>

            <Card>
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>Enter the details of the role you are targeting.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Company Name</label>
                                <input
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-md"
                                    placeholder="e.g. Google, Amazon"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <input
                                    required
                                    className="w-full p-2 border border-slate-200 rounded-md"
                                    placeholder="e.g. SDE-1, Frontend Engineer"
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Job Description (JD) <span className="text-red-500">*</span></label>
                            <textarea
                                required
                                className={`w-full p-3 border rounded-md min-h-[200px] ${formData.jdText.length > 0 && formData.jdText.length < 200 ? 'border-orange-300 focus:ring-orange-200' : 'border-slate-200'}`}
                                placeholder="Paste the full JD here..."
                                value={formData.jdText}
                                onChange={e => setFormData({ ...formData, jdText: e.target.value })}
                            />
                            <div className="flex justify-between items-start">
                                <p className={`text-xs ${formData.jdText.length > 0 && formData.jdText.length < 200 ? 'text-orange-600 font-medium' : 'text-slate-400'}`}>
                                    {formData.jdText.length > 0 && formData.jdText.length < 200 && "This JD is too short to analyze deeply. Paste full JD for better output."}
                                </p>
                                <p className="text-xs text-slate-400">{formData.jdText.length} characters</p>
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span>Analyzing...</span>
                            ) : (
                                <>
                                    <Search className="w-4 h-4" /> Analyze Job
                                </>
                            )}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
