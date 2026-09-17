import { useState } from 'react';
import { MapPin, Clock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { evacuationRoutes, shelters } from '../data/mockData';
import { RiskBadge } from '../components/RiskBadge';
import { cn } from '../utils/cn';

export function EvacuationRoutesPage() {
  const [from, setFrom] = useState('Village Cluster A');
  const [to, setTo] = useState(shelters[0].name);

  const routes = evacuationRoutes;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900">Evacuation Routes</h1>
        <p className="text-sm text-navy-500 mt-0.5">
          Mock routing for planning · Not real-time traffic or live flood conditions
        </p>
      </div>

      <div className="glass-card rounded-xl p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-navy-500 mb-1">Starting location</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="input-field text-sm"
            placeholder="Origin"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-navy-500 mb-1">Destination shelter</label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="input-field text-sm"
          >
            {shelters.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-success-500" /> Safe route</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-warning-500" /> Risky route</span>
        <span className="inline-flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-danger-500" /> Blocked route</span>
      </div>

      <div className="grid gap-4">
        {routes.map((route) => (
          <div
            key={route.id}
            className={cn(
              'glass-card rounded-xl p-4 sm:p-5 border-l-4',
              route.status === 'safe' && 'border-l-success-500',
              route.status === 'risky' && 'border-l-warning-500',
              route.status === 'blocked' && 'border-l-danger-500'
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-navy-900">{route.name}</h3>
                  {route.alternative && (
                    <span className="text-xs px-2 py-0.5 bg-flood-50 text-flood-700 rounded-full">Alternative</span>
                  )}
                  <RiskBadge level={route.riskLevel} />
                </div>
                <p className="text-sm text-navy-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {route.from} → {route.to}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {route.status === 'safe' && <CheckCircle2 className="w-4 h-4 text-success-600" />}
                {route.status === 'risky' && <AlertTriangle className="w-4 h-4 text-warning-600" />}
                {route.status === 'blocked' && <XCircle className="w-4 h-4 text-danger-600" />}
                <span className="capitalize font-medium text-navy-700">{route.status}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-xs text-navy-500">Distance</p>
                <p className="font-medium">{route.distanceKm} km</p>
              </div>
              <div>
                <p className="text-xs text-navy-500">Est. time</p>
                <p className="font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {route.status === 'blocked' ? '—' : `${route.estimatedMinutes} min`}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-navy-500">Blocked / notes</p>
                <p className="font-medium text-navy-700">
                  {route.blockedRoads?.join(', ') || 'No blockages reported (demo)'}
                </p>
              </div>
            </div>

            {/* Simple route colour bar */}
            <div
              className={cn(
                'mt-4 h-1.5 rounded-full',
                route.status === 'safe' && 'bg-success-500',
                route.status === 'risky' && 'bg-warning-500',
                route.status === 'blocked' && 'bg-danger-500'
              )}
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-navy-400">
        Routes are mock data for demonstration. Connect a routing API that avoids flooded segments for production use.
      </p>
    </div>
  );
}
