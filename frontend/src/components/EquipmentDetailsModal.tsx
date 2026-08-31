import React, { useState } from 'react';
import type { Equipment } from '../types/equipment';
import { StatusBadge } from './StatusBadge';
import {
  X,
  Laptop,
  Tag,
  Hash,
  Calendar,
  Clock,
  Fingerprint,
  Pencil,
  Copy,
  Check,
} from 'lucide-react';

interface EquipmentDetailsModalProps {
  equipment: Equipment | null;
  onClose: () => void;
  onEdit: (equipment: Equipment) => void;
}

export const EquipmentDetailsModal: React.FC<EquipmentDetailsModalProps> = ({
  equipment,
  onClose,
  onEdit,
}) => {
  const [copied, setCopied] = useState<string | null>(null);

  if (!equipment) return null;

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('es-PE', {
        dateStyle: 'full',
        timeStyle: 'medium',
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20 text-white flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Ficha Técnica del Equipo
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detalles completos y auditoría de registro
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-5">
          {/* Tarjeta Principal */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  {equipment.brand}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {equipment.name}
                </h3>
              </div>
              <StatusBadge status={equipment.status} />
            </div>
          </div>

          {/* Grid de Propiedades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Número de Serie */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Hash className="w-3.5 h-3.5 text-blue-500" />
                  N° de Serie
                </span>
                <button
                  type="button"
                  onClick={() => copyText(equipment.serialNumber, 'serial')}
                  className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
                >
                  {copied === 'serial' ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copied === 'serial' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <code className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 block truncate">
                {equipment.serialNumber}
              </code>
            </div>

            {/* Marca */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
                <Tag className="w-3.5 h-3.5 text-blue-500" />
                Fabricante / Marca
              </span>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {equipment.brand}
              </p>
            </div>

            {/* ID Único (UUID) */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800 sm:col-span-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <Fingerprint className="w-3.5 h-3.5 text-blue-500" />
                  Identificador UUID
                </span>
                <button
                  type="button"
                  onClick={() => copyText(equipment.id, 'uuid')}
                  className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
                >
                  {copied === 'uuid' ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copied === 'uuid' ? 'Copiado' : 'Copiar'}
                </button>
              </div>
              <code className="text-[11px] font-mono text-slate-600 dark:text-slate-400 block truncate">
                {equipment.id}
              </code>
            </div>

            {/* Fecha Creación */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                Registrado
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {formatDate(equipment.createdAt)}
              </p>
            </div>

            {/* Fecha Actualización */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                Última Modificación
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300">
                {formatDate(equipment.updatedAt)}
              </p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Cerrar
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(equipment);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all"
            >
              <Pencil className="w-4 h-4" />
              <span>Editar Equipo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
