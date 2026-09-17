export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-IN').format(n);
}

export function formatArea(km2: number): string {
  return `${km2.toFixed(1)} km²`;
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

export function riskColor(level: string): string {
  switch (level) {
    case 'low':
      return 'text-success-700 bg-success-50 border-success-200';
    case 'moderate':
      return 'text-warning-700 bg-warning-50 border-warning-200';
    case 'high':
      return 'text-orange-700 bg-orange-50 border-orange-200';
    case 'critical':
      return 'text-danger-700 bg-danger-50 border-danger-200';
    default:
      return 'text-navy-600 bg-navy-50 border-navy-200';
  }
}

export function severityBadge(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'bg-danger-100 text-danger-800 border-danger-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'moderate':
      return 'bg-warning-100 text-warning-800 border-warning-200';
    case 'low':
      return 'bg-success-100 text-success-800 border-success-200';
    case 'resolved':
      return 'bg-navy-100 text-navy-600 border-navy-200';
    default:
      return 'bg-navy-50 text-navy-700';
  }
}
