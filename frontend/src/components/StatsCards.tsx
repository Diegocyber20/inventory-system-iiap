import React from 'react';
import type { EquipmentStats, EquipmentStatus } from '../types/equipment';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
} from 'lucide-react';

interface StatsCardsProps {
  stats: EquipmentStats;
  selectedStatus: string;
  onSelectStatus: (status: string) => void;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  selectedStatus,
  onSelectStatus,
}) => {
  const getPercentage = (value: number) => {
    if (stats.total === 0) return '0%';
    return `${Math.round((value / stats.total) * 100)}%`;
  };

  const cards = [
    {
      id: 'ALL',
      title: 'Total Equipos',
      value: stats.total,
      subtitle: 'Inventario global registrado',
      icon: Layers,
      color: 'blue',
      badge: '100%',
      gradient: 'from-blue-500/10 to-indigo-500/5',
      borderColor: 'border-blue-500/30',
      activeBorder: 'ring-2 ring-blue-500 bg-blue-50/50 dark:bg-blue-950/30',
      iconBg: 'bg-blue-500 text-white shadow-blue-500/30',
    },
    {
      id: 'Operativo' as EquipmentStatus,
      title: 'Operativos',
      value: stats.operativo,
      subtitle: 'Listos para uso en aula/laboratorio',
      icon: CheckCircle2,
      color: 'emerald',
      badge: getPercentage(stats.operativo),
      gradient: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-500/30',
      activeBorder: 'ring-2 ring-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30',
      iconBg: 'bg-emerald-500 text-white shadow-emerald-500/30',
    },
    {
      id: 'En Mantenimiento' as EquipmentStatus,
      title: 'En Mantenimiento',
      value: stats.enMantenimiento,
      subtitle: 'En revisión técnica o soporte',
      icon: AlertTriangle,
      color: 'amber',
      badge: getPercentage(stats.enMantenimiento),
      gradient: 'from-amber-500/10 to-orange-500/5',
      borderColor: 'border-amber-500/30',
      activeBorder: 'ring-2 ring-amber-500 bg-amber-50/50 dark:bg-amber-950/30',
      iconBg: 'bg-amber-500 text-white shadow-amber-500/30',
    },
    {
      id: 'De Baja' as EquipmentStatus,
      title: 'De Baja',
      value: stats.deBaja,
      subtitle: 'Inoperativos o para desecho',
      icon: XCircle,
      color: 'rose',
      badge: getPercentage(stats.deBaja),
      gradient: 'from-rose-500/10 to-red-500/5',
      borderColor: 'border-rose-500/30',
      activeBorder: 'ring-2 ring-rose-500 bg-rose-50/50 dark:bg-rose-950/30',
      iconBg: 'bg-rose-500 text-white shadow-rose-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = selectedStatus === card.id;

        return (
          <div
            key={card.id}
            onClick={() => onSelectStatus(card.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectStatus(card.id);
              }
            }}
            className={`relative overflow-hidden rounded-2xl p-5 border bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1 ${
              isSelected
                ? `${card.activeBorder} ${card.borderColor}`
                : 'border-slate-200 dark:border-slate-700/60 hover:border-slate-300'
            }`}
          >
            {/* Fondo de gradiente suave */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none opacity-60`}
            />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {card.value}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      card.color === 'blue'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                        : card.color === 'emerald'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
                        : card.color === 'amber'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3" />
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${card.iconBg}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
