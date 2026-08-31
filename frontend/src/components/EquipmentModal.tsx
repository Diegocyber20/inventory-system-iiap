import React, { useState, useEffect } from 'react';
import type {
  Equipment,
  CreateEquipmentInput,
  UpdateEquipmentInput,
  EquipmentStatus,
} from '../types/equipment';
import {
  X,
  Plus,
  Pencil,
  AlertCircle,
  Laptop,
  Tag,
  ShieldAlert,
  Hash,
  Loader2,
} from 'lucide-react';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateEquipmentInput | UpdateEquipmentInput) => Promise<void>;
  equipmentToEdit?: Equipment | null;
  isSaving: boolean;
  errorMessage?: string | null;
}

const COMMON_BRANDS = [
  'Lenovo',
  'Dell',
  'HP',
  'Logitech',
  'LG',
  'Samsung',
  'Asus',
  'Acer',
  'Cisco',
  'Epson',
  'Apple',
  'Kingston',
];

const STATUS_OPTIONS: { value: EquipmentStatus; label: string; desc: string }[] = [
  {
    value: 'Operativo',
    label: 'Operativo',
    desc: 'Disponible para uso inmediato',
  },
  {
    value: 'En Mantenimiento',
    label: 'En Mantenimiento',
    desc: 'En revisión técnica o reparación',
  },
  {
    value: 'De Baja',
    label: 'De Baja',
    desc: 'Inoperativo o retirado del servicio',
  },
];

export const EquipmentModal: React.FC<EquipmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  equipmentToEdit,
  isSaving,
  errorMessage,
}) => {
  const isEditing = Boolean(equipmentToEdit);

  const [formData, setFormData] = useState<CreateEquipmentInput>({
    name: '',
    brand: '',
    status: 'Operativo',
    serialNumber: '',
  });

  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    brand?: string;
    serialNumber?: string;
  }>({});

  useEffect(() => {
    if (equipmentToEdit) {
      setFormData({
        name: equipmentToEdit.name,
        brand: equipmentToEdit.brand,
        status: equipmentToEdit.status,
        serialNumber: equipmentToEdit.serialNumber,
      });
    } else {
      setFormData({
        name: '',
        brand: '',
        status: 'Operativo',
        serialNumber: '',
      });
    }
    setValidationErrors({});
  }, [equipmentToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errors: { name?: string; brand?: string; serialNumber?: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre del equipo es obligatorio';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.brand.trim()) {
      errors.brand = 'La marca es obligatoria';
    }

    if (!formData.serialNumber.trim()) {
      errors.serialNumber = 'El número de serie es obligatorio';
    } else if (formData.serialNumber.trim().length < 4) {
      errors.serialNumber = 'El número de serie debe tener al menos 4 caracteres';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                isEditing
                  ? 'bg-amber-500 shadow-amber-500/20'
                  : 'bg-blue-600 shadow-blue-500/20'
              } shadow-lg`}
            >
              {isEditing ? (
                <Pencil className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5 stroke-[2.5]" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isEditing ? 'Editar Información del Equipo' : 'Registrar Nuevo Equipo'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEditing
                  ? 'Modifique los campos necesarios para actualizar el registro'
                  : 'Complete los datos técnicos del equipo para agregarlo al inventario'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-start gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre del Equipo */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-blue-500" />
              <span>Nombre del Equipo *</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ej. Laptop Lenovo ThinkPad T14"
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                validationErrors.name
                  ? 'border-rose-400 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {validationErrors.name && (
              <p className="mt-1 text-xs text-rose-500">{validationErrors.name}</p>
            )}
          </div>

          {/* Marca */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-500" />
              <span>Marca *</span>
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              placeholder="Ej. Lenovo, Dell, HP, Logitech"
              className={`w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/60 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                validationErrors.brand
                  ? 'border-rose-400 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {/* Sugerencias Rápidas de Marca */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {COMMON_BRANDS.slice(0, 6).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setFormData({ ...formData, brand: b })}
                  className="px-2 py-0.5 text-[11px] rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  {b}
                </button>
              ))}
            </div>
            {validationErrors.brand && (
              <p className="mt-1 text-xs text-rose-500">{validationErrors.brand}</p>
            )}
          </div>

          {/* Número de Serie */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-500" />
              <span>Número de Serie Único *</span>
            </label>
            <input
              type="text"
              value={formData.serialNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  serialNumber: e.target.value.toUpperCase(),
                })
              }
              placeholder="Ej. SN-LNV-2024-8841"
              className={`w-full px-3.5 py-2.5 text-sm font-mono bg-slate-50 dark:bg-slate-900/60 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 ${
                validationErrors.serialNumber
                  ? 'border-rose-400 focus:ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-blue-500/20 focus:border-blue-500'
              }`}
            />
            {validationErrors.serialNumber && (
              <p className="mt-1 text-xs text-rose-500">
                {validationErrors.serialNumber}
              </p>
            )}
          </div>

          {/* Estado del Equipo */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
              <span>Estado del Equipo *</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {STATUS_OPTIONS.map((opt) => {
                const isSelected = formData.status === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => setFormData({ ...formData, status: opt.value })}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? opt.value === 'Operativo'
                          ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                          : opt.value === 'En Mantenimiento'
                          ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20'
                          : 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span className="block text-xs font-bold">{opt.label}</span>
                    <span className="block text-[10px] opacity-75 mt-0.5">
                      {opt.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer / Botones de Acción */}
          <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <span>{isEditing ? 'Guardar Cambios' : 'Registrar Equipo'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
