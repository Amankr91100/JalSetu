import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Waves, LayoutDashboard } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Live Monitoring' },
  { to: '/map', label: 'Flood Map' },
  { to: '/risk', label: 'Risk Analysis' },
  { to: '/resources', label: 'Resources' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/map') ||
    location.pathname.startsWith('/risk') ||
    location.pathname.startsWith('/shelters') ||
    location.pathname.startsWith('/routes') ||
    location.pathname.startsWith('/alerts') ||
    location.pathname.startsWith('/reports') ||
    location.pathname.startsWith('/settings');

  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-navy-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-1.5 rounded-lg bg-flood-600 text-white group-hover:bg-flood-700 transition-colors">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold text-navy-900 tracking-tight">Flood Guard</span>
              <span className="hidden sm:block text-[10px] text-navy-500 -mt-0.5">Decision Support</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive ? 'text-flood-700 bg-flood-50' : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-navy-600 hover:text-navy-900 px-3 py-2">
              Login
            </Link>
            <Link to="/dashboard" className="btn-primary text-sm py-2">
              <LayoutDashboard className="w-4 h-4" />
              Launch Dashboard
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-navy-600 hover:bg-navy-50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-navy-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block px-3 py-2.5 text-sm font-medium rounded-lg',
                    isActive ? 'text-flood-700 bg-flood-50' : 'text-navy-600 hover:bg-navy-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-navy-100 flex flex-col gap-2">
              <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary text-sm justify-center">
                Login
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="btn-primary text-sm justify-center">
                Launch Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
