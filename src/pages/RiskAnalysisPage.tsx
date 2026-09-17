import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { AlertCircle } from 'lucide-react';
import { locations, floodTrend, riskMetrics } from '../data/mockData';
import { RiskBadge } from '../components/RiskBadge';
import { formatNumber } from '../utils/format';

const forecastWindows = [
  { id: 'current', label: 'Current' },
  { id: '6h', label: 'Next 6 hours' },
  { id: '12h', label: 'Next 12 hours' },
  { id: '24h', label: 'Next 24 hours' },
];

const exposureByCategory = [
  { category: 'Roads', high: 18, moderate: 24, low: 40 },
  { category: 'Buildings', high: 320, moderate: 580, low: 1200 },
  { category: 'Hospitals', high: 2, moderate: 3, low: 5 },
  { category: 'Schools', high: 8, moderate: 12, low: 22 },
  { category: 'Power', high: 3, moderate: 4, low: 8 },
];

const popByRisk = [
  { level: 'Low', population: 12000 },
  { level: 'Moderate', population: 28000 },
  { level: 'High', population: 32000 },
  { level: 'Critical', population: 14420 },
];

export function RiskAnalysisPage() {
  const [location, setLocation] = useState(locations[0].id);
  const [window, setWindow] = useState('current');
  const [date, setDate] = useState('2026-09-17');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Risk Analysis</h1>
        <p className="text-sm text-navy-500 mt-0.5">
          Forecast-assisted exposure and risk · Demo data
        </p>
      </div>

      {/* Controls */}
      <div className="glass-card rounded-xl p-4 flex flex-col sm:flex-row flex-wrap gap-4">
        <div>
          <label className="block text-xs font-medium text-navy-500 mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field text-sm py-2"
          >
            {locations.map((l) => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-navy-500 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field text-sm py-2"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy-500 mb-1">Forecast window</label>
          <div className="flex flex-wrap gap-1.5">
            {forecastWindows.map((w) => (
              <button
                key={w.id}
                onClick={() => setWindow(w.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  window === w.id
                    ? 'bg-flood-600 text-white border-flood-600'
                    : 'bg-white text-navy-600 border-navy-200 hover:bg-navy-50'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-navy-500">Overall risk</p>
          <div className="mt-1 flex items-center gap-2">
            <RiskBadge level="high" size="md" />
          </div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-navy-500">Flood probability</p>
          <p className="text-2xl font-semibold text-navy-900 mt-1">72%</p>
          <p className="text-xs text-navy-400">Current window</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-navy-500">Population exposure</p>
          <p className="text-2xl font-semibold text-navy-900 mt-1">
            {formatNumber(riskMetrics.populationAtRisk)}
          </p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-navy-500">Critical infrastructure</p>
          <p className="text-2xl font-semibold text-navy-900 mt-1">{riskMetrics.criticalAssets}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass-card rounded-xl p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-navy-900 mb-4">Water-level trend</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={floodTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" m" width={40} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="waterLevel" stroke="#1890ff" strokeWidth={2} dot={false} name="Water level (m)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-navy-900 mb-4">Population by risk level</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popByRisk}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="level" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} width={45} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="population" fill="#096dd9" radius={[4, 4, 0, 0]} name="Population" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-xl p-4 sm:p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-navy-900 mb-4">Infrastructure exposure by category</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={exposureByCategory} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                <Legend />
                <Bar dataKey="high" stackId="a" fill="#f5222d" name="High" />
                <Bar dataKey="moderate" stackId="a" fill="#faad14" name="Moderate" />
                <Bar dataKey="low" stackId="a" fill="#52c41a" name="Low" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Explanation + disclaimer */}
      <div className="glass-card rounded-xl p-4 sm:p-5 space-y-3">
        <p className="text-sm text-navy-700">
          <strong>How risk is calculated:</strong> Risk combines observed flood extent (e.g. Sentinel-1 SAR),
          forecast inputs, terrain, exposed population and assets, and uncertainty estimates.
        </p>
        <div className="flex gap-2 p-3 rounded-lg bg-warning-50 border border-warning-200 text-sm text-warning-900">
          <AlertCircle className="w-5 h-5 shrink-0 text-warning-600" />
          <p>
            <strong>Disclaimer:</strong> This is a decision-support prototype. Final emergency decisions
            must be validated by authorised authorities. Demo data only — not for operational use.
          </p>
        </div>
      </div>
    </div>
  );
}
