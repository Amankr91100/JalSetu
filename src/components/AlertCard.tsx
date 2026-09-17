import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import type { Alert } from '../types';
import { severityBadge, formatRelativeTime } from '../utils/format';
import { cn } from '../utils/cn';

interface Props {
  alert: Alert;
  onAcknowledge?: (id: string) => void;
  compact?: boolean;
}

export function AlertCard({ alert, onAcknowledge, compact }: Props) {
  return (
    <div className={cn('glass-card rounded-xl p-4 border-l-4', {
      'border-l-danger-500': alert.severity === 'critical',
      'border-l-orange-500': alert.severity === 'high',
      'border-l-warning-500': alert.severity === 'moderate',
      'border-l-navy-300': alert.severity === 'resolved' || alert.severity === 'low',
    })}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <AlertTriangle className={cn('w-5 h-5 shrink-0 mt-0.5', {
            'text-danger-600': alert.severity === 'critical',
            'text-orange-600': alert.severity === 'high',
            'text-warning-600': alert.severity === 'moderate',
            'text-navy-400': alert.severity === 'resolved',
          })} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-medium text-navy-900 text-sm sm:text-base truncate">{alert.title}</h3>
              <span className={cn('text-xs px-2 py-0.5 rounded-full border capitalize', severityBadge(alert.severity))}>
                {alert.severity}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-navy-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {alert.location}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatRelativeTime(alert.timestamp)}
              </span>
            </div>
            {!compact && (
              <>
                <p className="mt-2 text-sm text-navy-600 line-clamp-2">{alert.description}</p>
                <p className="mt-1.5 text-sm text-flood-700 font-medium">
                  Action: {alert.recommendedAction}
                </p>
              </>
            )}
          </div>
        </div>
        {alert.status === 'active' && onAcknowledge && (
          <button
            onClick={() => onAcknowledge(alert.id)}
            className="shrink-0 text-xs font-medium text-flood-600 hover:text-flood-800 px-2 py-1 rounded hover:bg-flood-50"
          >
            Acknowledge
          </button>
        )}
      </div>
    </div>
  );
}
