import { Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Map,
  FileText,
  Building2,
  Route,
  AlertTriangle,
  Users,
  MapPin,
  Shield,
  Bell,
  Layers,
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { AlertCard } from '../components/AlertCard';
import { riskMetrics, floodTrend, alerts, DEMO_LABEL } from '../data/mockData';
import { formatNumber, formatArea } from '../utils/format';

const RISK_COLORS = {
  low: '#52c41a',
  moderate: '#faad14',
  high: '#fa8c16',
  critical: '#f5222d',
};

const pieData = riskMetrics.riskDistribution.map((d) => ({
  name: d.level.charAt(0).toUpperCase() + d.level.slice(1),
  value: d.count,
  percentage: d.percentage,
}));

const quickActions = [
  { to: '/map', label: 'View Flood Map', icon: Map, color: 'bg-flood-50 text-flood-700' },
  { to: '/reports', label: 'Generate Report', icon: FileText, color: 'bg-navy-50 text-navy-700' },
  { to: '/shelters', label: 'Find Shelters', icon: Building2, color: 'bg-success-50 text-success-700' },
  { to: '/routes', label: 'Plan Evacuation', icon: Route, color: 'bg-warning-50 text-warning-700' },
];

export function DashboardPage() {
  const recentAlerts = alerts.filter((a) => a.status === 'active').slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Overview</h1>
          <p className="text-sm text-navy-500 mt-0.5">
            Situational summary · {DEMO_LABEL} · Updated for demo scenario
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-warning-50 text-warning-700 border border-warning-200 w-fit">
          Prototype — not live operational data
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Affected Area"
          value={formatArea(riskMetrics.totalAffectedArea)}
          icon={Layers}
          accent="flood"
        />
        <StatCard
          title="High-Risk Zones"
          value={riskMetrics.highRiskZones}
          icon={AlertTriangle}
          accent="danger"
        />
        <StatCard
          title="Population at Risk"
          value={formatNumber(riskMetrics.populationAtRisk)}
          icon={Users}
          accent="warning"
        />
        <StatCard
          title="Critical Assets"
          value={riskMetrics.criticalAssets}
          icon={Shield}
          accent="danger"
        />
        <StatCard
          title="Available Shelters"
          value={riskMetrics.availableShelters}
          icon={Building2}
          accent="success"
        />
        <StatCard
          title="Active Alerts"
          value={riskMetrics.activeAlerts}
          icon={Bell}
          accent="danger"
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-navy-900 mb-1">Flood trend (affected area)</h2>
          <p className="text-xs text-navy-500 mb-4">Hourly mock series · {DEMO_LABEL}</p>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={floodTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1890ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#1890ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#627d98' }} />
                <YAxis tick={{ fontSize: 11, fill: '#627d98' }} unit=" km²" width={50} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #d9e2ec', fontSize: 12 }}
                  formatter={(v: number) => [`${v} km²`, 'Affected area']}
                />
                <Area
                  type="monotone"
                  dataKey="affectedArea"
                  stroke="#1890ff"
                  strokeWidth={2}
                  fill="url(#areaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-navy-900 mb-1">Risk level distribution</h2>
          <p className="text-xs text-navy-500 mb-4">Zones by severity · {DEMO_LABEL}</p>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={RISK_COLORS[entry.name.toLowerCase() as keyof typeof RISK_COLORS]}
                    />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => <span className="text-xs text-navy-600">{value}</span>}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #d9e2ec', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick actions + Alerts */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="glass-card rounded-xl p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-navy-900 mb-4">Quick actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ to, label, icon: Icon, color }) => (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-navy-100 hover:border-flood-200 hover:bg-flood-50/50 transition-colors text-center"
              >
                <div className={`p-2.5 rounded-lg ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-navy-700">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-navy-900">Recent alerts</h2>
            <Link to="/alerts" className="text-xs font-medium text-flood-600 hover:text-flood-800">
              View all
            </Link>
          </div>
          {recentAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
