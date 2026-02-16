"use client";

import { Input } from "../ui/Input";
import { Search, SlidersHorizontal, ArrowUpDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
    onSearchChange: (val: string) => void;
    onFilterChange: (key: string, val: string) => void;
    filters: {
        location: string;
        experience: string;
        source: string;
        sort: string;
        status: string;
    };
    showMatchesOnly: boolean;
    onToggleMatches: () => void;
}

export function FilterBar({
    onSearchChange,
    onFilterChange,
    filters,
    showMatchesOnly,
    onToggleMatches
}: FilterBarProps) {
    return (
        <div className="bg-background border-b border-muted sticky top-16 z-30 px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    className="pl-9 bg-muted/20 border-muted focus:bg-background transition-colors"
                    placeholder="Search roles, companies or skills..."
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                {/* Match Toggle */}
                <button
                    onClick={onToggleMatches}
                    className={cn(
                        "h-10 px-3 flex items-center gap-2 rounded-md border text-sm font-medium transition-colors whitespace-nowrap",
                        showMatchesOnly
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-background border-muted text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Sparkles className="w-4 h-4" />
                    Matches Only
                </button>

                <div className="h-8 w-[1px] bg-muted mx-1" />

                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange("status", e.target.value)}
                    className="h-10 px-3 rounded-md border border-muted bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="">All Status</option>
                    <option value="Not Applied">Not Applied</option>
                    <option value="Applied">Applied</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Selected">Selected</option>
                </select>

                <select
                    value={filters.location}
                    onChange={(e) => onFilterChange("location", e.target.value)}
                    className="h-10 px-3 rounded-md border border-muted bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="">Location</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Pune">Pune</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Remote">Remote</option>
                </select>

                <select
                    value={filters.experience}
                    onChange={(e) => onFilterChange("experience", e.target.value)}
                    className="h-10 px-3 rounded-md border border-muted bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="">Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                </select>

                <select
                    value={filters.source}
                    onChange={(e) => onFilterChange("source", e.target.value)}
                    className="h-10 px-3 rounded-md border border-muted bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="">Source</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Naukri">Naukri</option>
                    <option value="Indeed">Indeed</option>
                </select>

                <div className="h-8 w-[1px] bg-muted mx-1" />

                <select
                    value={filters.sort}
                    onChange={(e) => onFilterChange("sort", e.target.value)}
                    className="h-10 px-3 rounded-md border border-muted bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                    <option value="latest">Latest</option>
                    <option value="score">Match Score</option>
                </select>
            </div>
        </div>
    );
}
