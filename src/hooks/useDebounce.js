import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of `value`.
 * @param {*} value
 * @param {number} delay – ms
 */
export function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debounced;
}
