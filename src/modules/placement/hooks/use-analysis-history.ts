"use client";

import { useState, useEffect, useCallback } from "react";
import { AnalysisResult } from "@/lib/analyzer";

const STORAGE_KEY = "placement_platform_history";

export function useAnalysisHistory() {
    const [history, setHistory] = useState<AnalysisResult[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    // Filter out corrupted entries that don't have an ID or createdAt
                    const validEntries = parsed.filter(item =>
                        item &&
                        typeof item === 'object' &&
                        item.id &&
                        item.createdAt
                    );
                    setHistory(validEntries);
                }
            } catch (e) {
                console.error("Failed to parse history", e);
                // Optional: clear corrupted storage? 
                // localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoaded(true);
    }, []);

    const saveAnalysis = useCallback((analysis: AnalysisResult) => {
        setHistory(prev => {
            const updated = [analysis, ...prev];
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                console.error("Failed to save analysis", e);
            }
            return updated;
        });
    }, []);

    const getAnalysis = useCallback((id: string) => {
        return history.find((item) => item.id === id);
    }, [history]);

    const deleteAnalysis = useCallback((id: string) => {
        setHistory(prev => {
            const updated = prev.filter((item) => item.id !== id);
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                console.error("Failed to delete analysis", e);
            }
            return updated;
        });
    }, []);

    const updateAnalysis = useCallback((id: string, updates: Partial<AnalysisResult>) => {
        setHistory(prev => {
            const updated = prev.map((item) =>
                item.id === id ? { ...item, ...updates } : item
            );
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (e) {
                console.error("Failed to update analysis", e);
            }
            return updated;
        });
    }, []);

    return {
        history,
        isLoaded,
        saveAnalysis,
        getAnalysis,
        deleteAnalysis,
        updateAnalysis
    };
}
