import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of a value that only updates after `delay` ms of
 * no changes. Useful for search inputs to avoid firing a request per keystroke.
 */
export default function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
