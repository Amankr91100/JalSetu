import { LucideIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  accent?: 'default' | 'danger' | 'warning' | 'success' | 'flood';
  demo?: boolean;
  className?: string;
}

const accentStyles = {
  default: 'bg-navy-50 text-navy-600',
  danger: 'bg-danger-50 text-danger-600',
  warning: 'bg-warning-50 text-warning-600',
  success: 'bg-success-50 text-success-600',
  flood: 'bg-flood-50 text-flood-600',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = 'default',
  demo = true,
  className,
}: Props) {
  return (
    <div className={cn('glass-card rounded-xl p-4 sm:p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-navy-500 uppercase tracking-wide truncate">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-navy-900 tabular-nums">{value}</p>
          {subtitle && <p className="mt-0.5 text-sm text-navy-500">{subtitle}</p>}
          {trend && <p className="mt-1 text-xs text-navy-400">{trend}</p>}
        </div>
        <div className={cn('p-2.5 rounded-lg shrink-0', accentStyles[accent])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {demo && (
        <p className="mt-3 text-[10px] uppercase tracking-wider text-navy-400 font-medium">Demo Data</p>
      )}
    </div>
  );
}
