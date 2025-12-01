import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

const iconClasses = 'h-5 w-5';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 ring-1 ring-white/15 transition hover:bg-white/10 hover:text-white"
      aria-label="Toggle light or dark mode"
    >
      {theme === 'dark' ? <SunIcon className={iconClasses} /> : <MoonIcon className={iconClasses} />}
      <span className="hidden md:inline">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
};

