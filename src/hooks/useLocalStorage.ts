import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // If we have key in local storage get it and parse it 
            // otherwise use the initalValue
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error)
            return initialValue;
        }
    })

    useEffect(() => {
        try {
            // saving current storedValue to local storage
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error)
        }
    }, [storedValue, key])

    return [storedValue, setStoredValue] as const;

}