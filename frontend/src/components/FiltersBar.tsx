import React from 'react';
import { Search, Filter, X, ArrowUpDown } from 'lucide-react';
import type { EquipmentStatus } from '../types/equipment';

interface FiltersBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  sortBy: 'name' | 'createdAt' | 'brand';
  onSortByChange: (sort: 'name' | 'createdAt' | 'brand') => void;
  sortOrder: 'asc' | 'desc';
  onToggleSortOrder: () => void;
  onResetFilters: () => void;
  totalFiltered: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onToggleSortOrder,
  onResetFilters,
  totalFiltered,
}) => {
  const statusOptions: { value: string; label: string }[] = [
    { value: 'ALL', label: 'Todos los estados' },
    { value: 'Operativo' as EquipmentStatus, label: 'Operativo' },
    { value: 'En Mantenimiento' as EquipmentStatus, label: 'En Mantenimiento' },
    { value: 'De Baja' as EquipmentStatus, label: 'De Baja' },
  ];

  const hasActiveFilters = searchQuery !== '' || selectedStatus !== 'ALL';

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/60 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        {/* Barra de Búsqueda */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por equipo, marca o N° de serie..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Limpiar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtros y Opciones */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Selector de Estado */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className="px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenar por */}
          <div className="flex items-center gap-1.5">
            <select
              value={sortBy}
              onChange={(e) =>
                onSortByChange(e.target.value as 'name' | 'createdAt' | 'brand')
              }
              className="px-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="createdAt">Fecha de registro</option>
              <option value="name">Nombre de equipo</option>
              <option value="brand">Marca</option>
            </select>

            <button
              type="button"
              onClick={onToggleSortOrder}
              className="p-2.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition-colors"
              title={`Orden: ${sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}`}
            >
              <ArrowUpDown
                className={`w-4 h-4 transition-transform ${
                  sortOrder === 'asc' ? 'rotate-180 text-blue-500' : ''
                }`}
              />
            </button>
          </div>

          {/* Limpiar Filtros */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Resumen de resultados */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>
          Mostrando <strong className="text-slate-800 dark:text-slate-200">{totalFiltered}</strong>{' '}
          {totalFiltered === 1 ? 'equipo encontrado' : 'equipos encontrados'}
        </span>
        {hasActiveFilters && (
          <span className="text-blue-600 dark:text-blue-400">Filtros activos aplicados</span>
        )}
      </div>
    </div>
  );
};
