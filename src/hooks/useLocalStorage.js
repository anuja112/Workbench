import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue, isValid = () => true) {
    const [value, setValue] = useState(() => {
        try {
        const stored = window.localStorage.getItem(key);
        if (stored === null) return initialValue;

        const parsed = JSON.parse(stored);
        return isValid(parsed) ? parsed : initialValue;
        } catch {
        return initialValue;
        }
    });

    useEffect(() => {
        try {
        window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
        // Storage may be full or blocked; the app keeps working in memory.
        }
    }, [key, value]);

    return [value, setValue];
}