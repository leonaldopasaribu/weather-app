export type Theme = 'light' | 'dark';

export class ThemeUtil {
  static getInitialTheme(): boolean {
    if (typeof window === 'undefined') return false;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);

    return isDarkMode;
  }

  static applyTheme(isDark: boolean): void {
    if (typeof document === 'undefined') return;

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  static initializeTheme(): boolean {
    const isDark = ThemeUtil.getInitialTheme();
    ThemeUtil.applyTheme(isDark);
    return isDark;
  }

  static toggleTheme(isDarkMode: boolean): boolean {
    const isDarkModeNext = !isDarkMode;

    if (typeof document !== 'undefined') {
      const root = document.documentElement;

      root.classList.toggle('dark', isDarkModeNext);
      localStorage.setItem('theme', isDarkModeNext ? 'dark' : 'light');
    }

    return isDarkModeNext;
  }

  static saveTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  }

  static getSavedTheme(): Theme | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('theme') as Theme | null;
  }
}
