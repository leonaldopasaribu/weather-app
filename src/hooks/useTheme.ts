import { useState, useEffect } from 'react';
import { ThemeUtil } from '@/src/utils';

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const initialTheme = ThemeUtil.initializeTheme();
    setIsDark(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = ThemeUtil.toggleTheme(isDark);
    setIsDark(newTheme);
  };

  return {
    isDark,
    toggleTheme,
  };
}
