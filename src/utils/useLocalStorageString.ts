import { useEffect, useState } from 'react';

// ================================================================

export function useLocalStorageString(key: string, initial = '') {
  const [value, setValue] = useState<string>(() => {
    try {
      const v = localStorage.getItem(key);
      return v ?? initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      if (value === '') localStorage.removeItem(key);
      else localStorage.setItem(key, value);
    } catch {
      /* no-op */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
