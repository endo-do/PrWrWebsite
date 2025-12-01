import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ThemeToggle';
import { Dashboard } from './pages/Dashboard';
import { GameDetail } from './pages/GameDetail';
import { Comparison } from './pages/Comparison';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/comparison', label: 'Comparison' },
];

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:py-12">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Pulse Report</p>
                <h1 className="font-display text-2xl">Progression Radar</h1>
              </div>
              <nav className="flex items-center gap-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive ? 'bg-neon/20 text-neon' : 'text-white/70 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <ThemeToggle />
              </nav>
            </header>
            <main className="pb-16">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/games/:gameId" element={<GameDetail />} />
                <Route path="/comparison" element={<Comparison />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
