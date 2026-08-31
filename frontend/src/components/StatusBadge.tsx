import React from 'react';
import type { EquipmentStatus } from '../types/equipment';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: EquipmentStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalizedStatus = status.trim();

  let bgClass = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  let dotClass = 'bg-emerald-500';
  let Icon = CheckCircle2;

  if (normalizedStatus === 'En Mantenimiento') {
    bgClass = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    dotClass = 'bg-amber-500';
    Icon = AlertTriangle;
  } else if (normalizedStatus === 'De Baja') {
    bgClass = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    dotClass = 'bg-rose-500';
    Icon = XCircle;
  }

  const sizeClass =
    size === 'sm'
      ? 'px-2.5 py-0.5 text-xs gap-1.5'
      : 'px-3 py-1 text-xs font-medium gap-2';

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium transition-all ${bgClass} ${sizeClass}`}
      title={`Estado: ${normalizedStatus}`}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotClass}`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${dotClass}`}
        />
      </span>
      <Icon className="w-3.5 h-3.5" />
      <span>{normalizedStatus}</span>
    </span>
  );
};
