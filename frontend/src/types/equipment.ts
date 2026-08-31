export type EquipmentStatus = 'Operativo' | 'En Mantenimiento' | 'De Baja';

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  status: EquipmentStatus | string;
  serialNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEquipmentInput {
  name: string;
  brand: string;
  status: EquipmentStatus | string;
  serialNumber: string;
}

export interface UpdateEquipmentInput {
  name?: string;
  brand?: string;
  status?: EquipmentStatus | string;
  serialNumber?: string;
}

export interface EquipmentStats {
  total: number;
  operativo: number;
  enMantenimiento: number;
  deBaja: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
