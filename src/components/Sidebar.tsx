import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Activity,
  Map,
  BarChart3,
  Building2,
  Route,
  Bell,
  FileText,
  Settings,
  Waves,
  X,
} from "lucide-react";
import { cn } from "../utils/cn";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/monitoring", label: "Live Monitoring", icon: Activity },
  { to: "/map", label: "Flood Map", icon: Map },
  { to: "/risk", label: "Risk Analysis", icon: BarChart3 },
  { to: "/shelters", label: "Shelters", icon: Building2 },
  { to: "/routes", label: "Evacuation Routes", icon: Route },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-navy-950/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-navy-950 text-white flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-navy-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-flood-600">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <span className="font-semibold tracking-tight">JalSetu</span>
              <p className="text-[10px] text-navy-400">Command Centre</p>
            </div>
          </div>
          <button
            className="lg:hidden p-1.5 rounded hover:bg-navy-800"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-flood-600/20 text-flood-300"
                    : "text-navy-300 hover:bg-navy-800 hover:text-white",
                )
              }
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-navy-800">
          <p className="text-[10px] uppercase tracking-wider text-navy-500 font-medium">
            Prototype
          </p>
          <p className="text-xs text-navy-400 mt-0.5">Demo data · Not live</p>
        </div>
      </aside>
    </>
  );
}
