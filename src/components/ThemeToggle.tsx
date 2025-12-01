import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

const iconClasses = 'h-5 w-5';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-3 py-1.5 text-sm font-medium text-slate-800 ring-1 ring-slate-300 transition hover:bg-slate-300 hover:text-slate-900 dark:bg-white/5 dark:text-slate-200 dark:ring-white/15 dark:hover:bg-white/10 dark:hover:text-white"
      aria-label="Toggle light or dark mode"
    >
      {theme === 'dark' ? <SunIcon className={iconClasses} /> : <MoonIcon className={iconClasses} />}
      <span className="hidden md:inline">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
};

