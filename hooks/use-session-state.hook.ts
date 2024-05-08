import { useState, useEffect } from 'react';


export default function useSessionState(defaultValue, key) {

  const [value, setValue] = useState(() => {
    const stickyValue = typeof(window) !== "undefined" ? window.sessionStorage.getItem(key) : null;
    return stickyValue ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
