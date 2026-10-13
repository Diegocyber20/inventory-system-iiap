import { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  Equipment,
  CreateEquipmentInput,
  UpdateEquipmentInput,
  EquipmentStats,
  ToastMessage,
} from './types/equipment';
import { equipmentService } from './services/equipmentService';
import { Navbar } from './components/Navbar';
import { StatsCards } from './components/StatsCards';
import { FiltersBar } from './components/FiltersBar';
import { EquipmentTable } from './components/EquipmentTable';
import { EquipmentModal } from './components/EquipmentModal';
import { EquipmentDetailsModal } from './components/EquipmentDetailsModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ToastContainer } from './components/Toast';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';

export function App() {
  // Datos principales
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isApiOnline, setIsApiOnline] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'createdAt' | 'brand'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [equipmentToEdit, setEquipmentToEdit] = useState<Equipment | null>(null);
  const [equipmentToView, setEquipmentToView] = useState<Equipment | null>(null);
  const [equipmentToDelete, setEquipmentToDelete] = useState<Equipment | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [modalErrorMessage, setModalErrorMessage] = useState<string | null>(null);

  // Notificaciones Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Carga de Equipos desde el Backend
  const loadEquipments = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setIsRefreshing(true);
    try {
      const data = await equipmentService.getAll();
      setEquipments(data);
      setIsApiOnline(true);
      setErrorMessage(null);
    } catch (err: unknown) {
      setIsApiOnline(false);
      const msg =
        err instanceof Error
          ? err.message
          : 'Error desconocido al conectar con el backend.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadEquipments();
  }, [loadEquipments]);

  // Cálculo de Estadísticas
  const stats: EquipmentStats = useMemo(() => {
    const total = equipments.length;
    const operativo = equipments.filter((e) => e.status === 'Operativo').length;
    const enMantenimiento = equipments.filter(
      (e) => e.status === 'En Mantenimiento',
    ).length;
    const deBaja = equipments.filter((e) => e.status === 'De Baja').length;
    return { total, operativo, enMantenimiento, deBaja };
  }, [equipments]);

  // Filtrado y Ordenamiento
  const filteredEquipments = useMemo(() => {
    return equipments
      .filter((eq) => {
        // Filtro por Estado
        if (selectedStatus !== 'ALL' && eq.status !== selectedStatus) {
          return false;
        }
        // Filtro por Búsqueda (Nombre, Marca o Número de serie)
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase().trim();
          const matchName = eq.name.toLowerCase().includes(query);
          const matchBrand = eq.brand.toLowerCase().includes(query);
          const matchSerial = eq.serialNumber.toLowerCase().includes(query);
          return matchName || matchBrand || matchSerial;
        }
        return true;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortBy === 'name') {
          comp = a.name.localeCompare(b.name);
        } else if (sortBy === 'brand') {
          comp = a.brand.localeCompare(b.brand);
        } else if (sortBy === 'createdAt') {
          comp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [equipments, selectedStatus, searchQuery, sortBy, sortOrder]);

  // Guardar (Crear o Editar)
  const handleSaveEquipment = async (
    data: CreateEquipmentInput | UpdateEquipmentInput,
  ) => {
    setIsSaving(true);
    setModalErrorMessage(null);
    try {
      if (equipmentToEdit) {
        // Actualizar
        const updated = await equipmentService.update(equipmentToEdit.id, data);
        setEquipments((prev) =>
          prev.map((item) => (item.id === updated.id ? updated : item)),
        );
        addToast({
          type: 'success',
          title: 'Equipo Actualizado',
          message: `Se actualizaron los datos de '${updated.name}' correctamente.`,
        });
        setEquipmentToEdit(null);
      } else {
        // Crear
        const created = await equipmentService.create(data as CreateEquipmentInput);
        setEquipments((prev) => [created, ...prev]);
        addToast({
          type: 'success',
          title: 'Equipo Registrado',
          message: `El equipo '${created.name}' fue registrado en el inventario.`,
        });
        setIsCreateModalOpen(false);
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Error al procesar la solicitud del equipo.';
      setModalErrorMessage(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Confirmar Eliminación
  const handleConfirmDelete = async () => {
    if (!equipmentToDelete) return;
    setIsDeleting(true);
    try {
      await equipmentService.delete(equipmentToDelete.id);
      setEquipments((prev) =>
        prev.filter((item) => item.id !== equipmentToDelete.id),
      );
      addToast({
        type: 'info',
        title: 'Equipo Eliminado',
        message: `El equipo '${equipmentToDelete.name}' ha sido retirado del inventario.`,
      });
      setEquipmentToDelete(null);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Error al eliminar el equipo.';
      addToast({
        type: 'error',
        title: 'Error al Eliminar',
        message: msg,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased transition-colors">
      {/* Barra de Navegación */}
      <Navbar
        onOpenCreateModal={() => {
          setModalErrorMessage(null);
          setIsCreateModalOpen(true);
        }}
        onRefresh={() => loadEquipments(true)}
        isRefreshing={isRefreshing}
        isApiOnline={isApiOnline}
      />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : errorMessage ? (
          <ErrorState message={errorMessage} onRetry={() => loadEquipments()} />
        ) : (
          <>
            {/* Tarjetas de Métricas */}
            <StatsCards
              stats={stats}
              selectedStatus={selectedStatus}
              onSelectStatus={(status) => setSelectedStatus(status)}
            />

            {/* Barra de Filtros y Búsqueda */}
            <FiltersBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              sortOrder={sortOrder}
              onToggleSortOrder={() =>
                setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
              }
              onResetFilters={() => {
                setSearchQuery('');
                setSelectedStatus('ALL');
              }}
              totalFiltered={filteredEquipments.length}
            />

            {/* Tabla de Equipos */}
            <EquipmentTable
              equipments={filteredEquipments}
              onView={(eq) => setEquipmentToView(eq)}
              onEdit={(eq) => {
                setModalErrorMessage(null);
                setEquipmentToEdit(eq);
              }}
              onDelete={(eq) => setEquipmentToDelete(eq)}
              onOpenCreate={() => {
                setModalErrorMessage(null);
                setIsCreateModalOpen(true);
              }}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} IIAP - Sistema de Gestión de Inventario de Equipos
          </p>
          <div className="flex items-center gap-4">
            <span>TypeScript • NestJS • React • PostgreSQL • Docker</span>
          </div>
        </div>
      </footer>

      {/* Modal Crear / Editar */}
      <EquipmentModal
        isOpen={isCreateModalOpen || Boolean(equipmentToEdit)}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEquipmentToEdit(null);
          setModalErrorMessage(null);
        }}
        onSave={handleSaveEquipment}
        equipmentToEdit={equipmentToEdit}
        isSaving={isSaving}
        errorMessage={modalErrorMessage}
      />

      {/* Modal Ficha Técnica / Detalles */}
      <EquipmentDetailsModal
        equipment={equipmentToView}
        onClose={() => setEquipmentToView(null)}
        onEdit={(eq) => {
          setEquipmentToView(null);
          setModalErrorMessage(null);
          setEquipmentToEdit(eq);
        }}
      />

      {/* Modal Confirmación de Eliminación */}
      <DeleteConfirmModal
        isOpen={Boolean(equipmentToDelete)}
        equipment={equipmentToDelete}
        onClose={() => setEquipmentToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Contenedor de Notificaciones Toast */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
