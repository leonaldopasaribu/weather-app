import { Cloud, Sun } from 'lucide-react';

interface ThemeToggleButtonProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggleButton({
  isDark,
  onToggle,
}: ThemeToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-xl transition-all duration-300 hover:scale-[1.08] sm:top-6 sm:right-6 sm:h-12 sm:w-12 dark:bg-gray-800/80"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400 sm:h-6 sm:w-6" />
      ) : (
        <Cloud className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6" />
      )}
    </button>
  );
}
