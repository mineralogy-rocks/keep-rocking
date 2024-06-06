import { useState, useEffect } from 'react';


export default function useRecentSearches(searchTerm: string) {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      let storedSearches = JSON.parse(window.localStorage.getItem('recentSearches') || '[]');

      if (searchTerm && searchTerm.trim() !== '') {
        if (!storedSearches.includes(searchTerm)) {
          storedSearches.unshift(searchTerm);
          if (storedSearches.length > 10) {
            storedSearches.pop();
          }
        } else {
          storedSearches = storedSearches.filter(item => item !== searchTerm);
          storedSearches.unshift(searchTerm);
        }
      }

      window.localStorage.setItem('recentSearches', JSON.stringify(storedSearches));
      setRecentSearches(storedSearches);
    } catch (_) { }
  }, [searchTerm]);

  return recentSearches;
}
