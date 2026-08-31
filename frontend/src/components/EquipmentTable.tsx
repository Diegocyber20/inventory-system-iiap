import React, { useState } from 'react';
import type { Equipment } from '../types/equipment';
import { StatusBadge } from './StatusBadge';
import {
  Laptop,
  Monitor,
  Keyboard,
  Cpu,
  Server,
  HardDrive,
  Copy,
  Check,
  Eye,
  Pencil,
  Trash2,
  Calendar,
  Layers,
} from 'lucide-react';

interface EquipmentTableProps {
  equipments: Equipment[];
  onView: (equipment: Equipment) => void;
  onEdit: (equipment: Equipment) => void;
  onDelete: (equipment: Equipment) => void;
  onOpenCreate: () => void;
}

export const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipments,
  onView,
  onEdit,
  onDelete,
  onOpenCreate,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getEquipmentIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('laptop') || lower.includes('notebook')) return Laptop;
    if (lower.includes('monitor') || lower.includes('pantalla')) return Monitor;
    if (lower.includes('teclado') || lower.includes('keyboard')) return Keyboard;
    if (lower.includes('switch') || lower.includes('router') || lower.includes('red')) return Server;
    if (lower.includes('desktop') || lower.includes('cpu') || lower.includes('pc')) return Cpu;
    return HardDrive;
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  if (equipments.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 mx-auto flex items-center justify-center mb-4">
          <Layers className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No se encontraron equipos
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-6">
          No hay registros que coincidan con los criterios de búsqueda actuales o el inventario está vacío.
        </p>
        <button
          type="button"
          onClick={onOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
        >
          Registrar Primer Equipo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-4 px-4 sm:px-6">Equipo & Marca</th>
              <th className="py-4 px-4 sm:px-6">N° de Serie</th>
              <th className="py-4 px-4 sm:px-6">Estado</th>
              <th className="py-4 px-4 sm:px-6 hidden md:table-cell">Fecha de Registro</th>
              <th className="py-4 px-4 sm:px-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 text-sm">
            {equipments.map((eq) => {
              const Icon = getEquipmentIcon(eq.name);
              const isCopied = copiedId === eq.id;

              return (
                <tr
                  key={eq.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-750/50 transition-colors group"
                >
                  {/* Nombre y Marca */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block hover:text-blue-600 transition-colors">
                          {eq.name}
                        </span>
                        <span className="inline-flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
                          {eq.brand}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Número de Serie */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono font-medium px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800">
                        {eq.serialNumber}
                      </code>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(eq.serialNumber, eq.id)}
                        className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title={isCopied ? '¡Copiado!' : 'Copiar número de serie'}
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="py-4 px-4 sm:px-6">
                    <StatusBadge status={eq.status} />
                  </td>

                  {/* Fecha */}
                  <td className="py-4 px-4 sm:px-6 hidden md:table-cell text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(eq.createdAt)}</span>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onView(eq)}
                        className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(eq)}
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition-colors"
                        title="Editar equipo"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(eq)}
                        className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                        title="Eliminar equipo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
