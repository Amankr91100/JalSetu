import { MapPin, Users, Phone, Accessibility, Building2 } from 'lucide-react';
import type { Shelter } from '../types';
import { cn } from '../utils/cn';

interface Props {
  shelter: Shelter;
  onViewDetails?: (id: string) => void;
}

export function ShelterCard({ shelter, onViewDetails }: Props) {
  const occupancyPct = Math.round((shelter.occupied / shelter.capacity) * 100);

  return (
    <div className="glass-card rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-flood-50 text-flood-600 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-navy-900 truncate">{shelter.name}</h3>
            <p className="text-sm text-navy-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              {shelter.distanceKm.toFixed(1)} km · {shelter.address}
            </p>
          </div>
        </div>
        <span
          className={cn(
            'text-xs font-medium px-2 py-1 rounded-full capitalize shrink-0',
            shelter.status === 'open' && 'bg-success-50 text-success-700',
            shelter.status === 'full' && 'bg-danger-50 text-danger-700',
            shelter.status === 'closed' && 'bg-navy-100 text-navy-600'
          )}
        >
          {shelter.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-navy-500">Capacity</p>
          <p className="font-semibold text-navy-900">{shelter.capacity}</p>
        </div>
        <div>
          <p className="text-xs text-navy-500">Occupied</p>
          <p className="font-semibold text-navy-900">{shelter.occupied}</p>
        </div>
        <div>
          <p className="text-xs text-navy-500">Available</p>
          <p className={cn('font-semibold', shelter.available > 0 ? 'text-success-700' : 'text-danger-600')}>
            {shelter.available}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <div className="h-1.5 bg-navy-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              occupancyPct >= 90 ? 'bg-danger-500' : occupancyPct >= 70 ? 'bg-warning-500' : 'bg-success-500'
            )}
            style={{ width: `${occupancyPct}%` }}
          />
        </div>
        <p className="text-xs text-navy-400 mt-1">{occupancyPct}% occupied</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-navy-500">
        {shelter.accessible && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success-50 text-success-700 rounded">
            <Accessibility className="w-3 h-3" /> Accessible
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Phone className="w-3 h-3" /> {shelter.contact}
        </span>
      </div>

      {onViewDetails && (
        <button
          onClick={() => onViewDetails(shelter.id)}
          className="mt-4 w-full btn-secondary text-sm py-2"
        >
          View Details
        </button>
      )}
    </div>
  );
}
