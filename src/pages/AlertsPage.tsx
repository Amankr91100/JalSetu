import { useState, useMemo } from 'react';
import { AlertCard } from '../components/AlertCard';
import { alerts as allAlerts } from '../data/mockData';
import type { AlertSeverity } from '../types';

const filters: { id: AlertSeverity | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'critical', label: 'Critical' },
  { id: 'high', label: 'High' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'resolved', label: 'Resolved' },
];

export function AlertsPage() {
  const [filter, setFilter] = useState<AlertSeverity | 'all'>('all');

  const alerts = useMemo(() => {
    if (filter === 'all') return allAlerts;
    return allAlerts.filter((a) => a.severity === filter);
  }, [filter]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Alerts</h1>
        <p className="text-sm text-navy-500 mt-0.5">Flood, rainfall, infrastructure, and shelter warnings · Demo</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
              filter === f.id
                ? 'bg-flood-600 text-white border-flood-600'
                : 'bg-white text-navy-600 border-navy-200 hover:bg-navy-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onAcknowledge={(id) => console.info('Ack', id)}
          />
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="text-center py-16 text-navy-500">
          <p className="font-medium">No alerts in this category</p>
          <p className="text-sm mt-1">Try another filter</p>
        </div>
      )}
    </div>
  );
}
