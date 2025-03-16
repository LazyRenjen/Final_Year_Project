import { useState, useEffect } from "react";

function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);

        // Check for data expiry
        if (parsedValue.expiry && Date.now() > parsedValue.expiry) {
          localStorage.removeItem(key);
          return initialValue;
        }

        return parsedValue.data || initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = {
        data: state,
        expiry: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      };
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
