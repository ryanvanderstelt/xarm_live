import { Link, useLocation } from 'react-router-dom';
import { Radio, Info } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Live', icon: Radio },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/about-project', label: 'About Project', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-zinc-900 via-zinc-800 to-transparent backdrop-blur-xl border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    : 'text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800/50 border-2 border-transparent'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
