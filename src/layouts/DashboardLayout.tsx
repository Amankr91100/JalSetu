import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Bell, Search, ChevronDown, User } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { locations } from '../data/mockData';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location, setLocation] = useState(locations[0].name);

  return (
    <div className="min-h-screen flex bg-navy-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white border-b border-navy-100 h-14 sm:h-16 flex items-center px-3 sm:px-6 gap-3">
          <button
            className="lg:hidden p-2 rounded-lg text-navy-600 hover:bg-navy-50"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="text-sm font-medium text-navy-800 bg-transparent border-0 focus:ring-0 cursor-pointer max-w-[140px] sm:max-w-none truncate"
              aria-label="Select location"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-navy-400 shrink-0 hidden sm:block" />
          </div>

          <div className="flex-1 max-w-md mx-auto hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
              <input
                type="search"
                placeholder="Search location, alert, shelter…"
                className="w-full pl-9 pr-3 py-2 text-sm border border-navy-200 rounded-lg bg-navy-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-flood-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-danger-50 border border-danger-100">
              <span className="w-2 h-2 rounded-full bg-danger-500 animate-pulse" />
              <span className="text-xs font-medium text-danger-700">Emergency Active</span>
            </div>

            <button className="relative p-2 rounded-lg text-navy-600 hover:bg-navy-50" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
            </button>

            <Link
              to="/settings"
              className="flex items-center gap-2 p-1.5 sm:px-2 sm:py-1.5 rounded-lg hover:bg-navy-50"
            >
              <div className="w-8 h-8 rounded-full bg-navy-200 flex items-center justify-center">
                <User className="w-4 h-4 text-navy-600" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-navy-700">Officer</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-3 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
