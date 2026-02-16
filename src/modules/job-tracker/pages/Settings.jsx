import React, { useState, useEffect } from 'react';
import { ContextHeader } from '../components/layout/ContextHeader';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Card } from '../components/ui/Card';
import { DEFAULT_PREFERENCES } from '../lib/scoring';
import { Loader2 } from 'lucide-react';

export default function SettingsPage() {
    // Standard UserPreferences structure if TS was used
    const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load prefs on mount
    useEffect(() => {
        const saved = localStorage.getItem("jobTrackerPreferences");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Wrap synchronous state update to ensure it runs after initial render
                setTimeout(() => setPrefs(parsed), 0);
            } catch (e) {
                console.error("Failed to parse preferences", e);
            }
        }
        setTimeout(() => setIsLoading(false), 0);
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate slight delay for effect
        setTimeout(() => {
            localStorage.setItem("jobTrackerPreferences", JSON.stringify(prefs));
            setIsSaving(false);
            // Optional: Show toast or feedback
            alert("Preferences Saved!");
        }, 500);
    };

    const updateField = (field, value) => {
        setPrefs(prev => ({ ...prev, [field]: value }));
    };

    const toggleMode = (mode) => {
        const current = prefs.preferredModes;
        const updated = current.includes(mode)
            ? current.filter(m => m !== mode)
            : [...current, mode];
        updateField("preferredModes", updated);
    };

    if (isLoading) return null;

    return (
        <div className="bg-background min-h-screen pb-20 job-tracker-layout">
            <ContextHeader
                title="Preferences"
                description="Configure your job matching criteria. We'll use this to filter the noise."
            />

            <main className="max-w-[800px] mx-auto px-6 py-10">
                <Card>
                    <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <div className="grid gap-6">

                            {/* Role Keywords */}
                            <div className="grid gap-3">
                                <Label htmlFor="roles">Role Keywords</Label>
                                <Input
                                    id="roles"
                                    value={prefs.roleKeywords.join(", ")}
                                    onChange={(e) => updateField("roleKeywords", e.target.value.split(",").map(s => s.trim()))}
                                    placeholder="e.g. Senior Frontend Engineer, React Developer"
                                />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Comma separated list of titles you are targeting. (+25 pts if in title)
                                </p>
                            </div>

                            {/* Locations */}
                            <div className="grid gap-3">
                                <Label htmlFor="locations">Preferred Locations</Label>
                                <Input
                                    id="locations"
                                    value={prefs.preferredLocations.join(", ")}
                                    onChange={(e) => updateField("preferredLocations", e.target.value.split(",").map(s => s.trim()))}
                                    placeholder="e.g. Bangalore, Pune, Remote"
                                />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Comma separated list. (+15 pts if match)
                                </p>
                            </div>

                            {/* Work Mode */}
                            <div className="grid gap-3">
                                <Label>Work Mode (+10 pts)</Label>
                                <div className="flex gap-4">
                                    {["Remote", "Hybrid", "Onsite"].map((mode) => (
                                        <label key={mode} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer select-none">
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredModes.includes(mode)}
                                                onChange={() => toggleMode(mode)}
                                                className="accent-primary w-4 h-4"
                                            />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div className="grid gap-3">
                                <Label htmlFor="experience">Experience Level (+10 pts)</Label>
                                <select
                                    id="experience"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-ring"
                                    value={prefs.experienceLevel}
                                    onChange={(e) => updateField("experienceLevel", e.target.value)}
                                >
                                    <option value="">Select Level</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="0-1 Years">0-1 Years</option>
                                    <option value="1-3 Years">1-3 Years</option>
                                    <option value="3-5 Years">3-5 Years</option>
                                    <option value="5+ Years">5+ Years</option>
                                </select>
                            </div>

                            {/* Skills */}
                            <div className="grid gap-3">
                                <Label htmlFor="skills">My Skills</Label>
                                <Input
                                    id="skills"
                                    value={prefs.skills.join(", ")}
                                    onChange={(e) => updateField("skills", e.target.value.split(",").map(s => s.trim()))}
                                    placeholder="e.g. React, Java, Python"
                                />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Comma separated. (+15 pts if any overlap)
                                </p>
                            </div>

                            {/* Min Match Score */}
                            <div className="grid gap-3">
                                <Label>Minimum Match Threshold: {prefs.minMatchScore}</Label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    value={prefs.minMatchScore}
                                    onChange={(e) => updateField("minMatchScore", parseInt(e.target.value))}
                                    className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Jobs scoring below this will be hidden when "Show only matches" is enabled.
                                </p>
                            </div>

                        </div>

                        <div className="pt-4 flex justify-end gap-4 border-t border-muted">
                            <Button variant="secondary" type="button" onClick={() => setPrefs(DEFAULT_PREFERENCES)}>
                                Reset Defaults
                            </Button>
                            <Button type="submit" disabled={isSaving}>
                                {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Preferences"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
}
