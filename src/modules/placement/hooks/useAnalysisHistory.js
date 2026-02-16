import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "placement_platform_history";

export function useAnalysisHistory() {
    const [history, setHistory] = useState(() => {
        if (typeof window === 'undefined') return [];
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    // Filter out corrupted entries that don't have an ID or createdAt
                    const validEntries = parsed.filter(item =>
                        item &&
                        typeof item === 'object' &&
                        item.id &&
                        item.createdAt
                    );
                    return validEntries;
                }
            }
            return [];
        } catch (e) {
            console.error("Failed to parse history from localStorage", e);
            // Optional: clear corrupted storage?
            // localStorage.removeItem(STORAGE_KEY);
            return [];
        }
    });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Mark as loaded after initial state is set (either from storage or default)
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Persist history changes
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        } catch (e) {
            console.error("Failed to save history to localStorage", e);
        }
    }, [history]);

    const saveAnalysis = useCallback((analysis) => {
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

    const getAnalysis = useCallback((id) => {
        return history.find((item) => item.id === id);
    }, [history]);

    const deleteAnalysis = useCallback((id) => {
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

    const updateAnalysis = useCallback((id, updates) => {
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
