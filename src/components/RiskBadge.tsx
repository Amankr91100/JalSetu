import { cn } from '../utils/cn';
import { riskColor } from '../utils/format';
import type { RiskLevel } from '../types';

interface Props {
  level: RiskLevel | string;
  size?: 'sm' | 'md';
  className?: string;
}

export function RiskBadge({ level, size = 'sm', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded-full capitalize',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
        riskColor(level),
        className
      )}
    >
      {level}
    </span>
  );
}
