import { Activity, Radio } from 'lucide-react';
import { floodTrend, riskMetrics } from '../data/mockData';
import { formatArea, formatNumber } from '../utils/format';

export function MonitoringPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-danger-50 text-danger-600">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Live Monitoring</h1>
          <p className="text-sm text-navy-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-danger-500 animate-pulse" />
            Simulated live feed · Demo data only
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-navy-500">Current extent</p>
          <p className="text-2xl font-semibold text-navy-900">{formatArea(riskMetrics.totalAffectedArea)}</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-navy-500">Population at risk</p>
          <p className="text-2xl font-semibold text-navy-900">{formatNumber(riskMetrics.populationAtRisk)}</p>
        </div>
        <div className="glass-card rounded-xl p-4">
          <p className="text-xs text-navy-500">Last SAR scene</p>
          <p className="text-2xl font-semibold text-navy-900">~2h ago</p>
          <p className="text-xs text-navy-400">Mock acquisition time</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5">
        <h2 className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
          <Radio className="w-4 h-4 text-flood-600" />
          Recent observation timeline
        </h2>
        <ul className="space-y-3">
          {floodTrend.slice().reverse().map((p) => (
            <li key={p.time} className="flex items-center gap-4 text-sm">
              <span className="w-14 text-navy-500 font-mono">{p.time}</span>
              <div className="flex-1 h-2 bg-navy-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-flood-500 rounded-full"
                  style={{ width: `${(p.affectedArea / 140) * 100}%` }}
                />
              </div>
              <span className="w-20 text-right font-medium text-navy-800">{p.affectedArea} km²</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-navy-400">
        In production this page would stream updates from SAR processing pipelines and telemetry.
      </p>
    </div>
  );
}
