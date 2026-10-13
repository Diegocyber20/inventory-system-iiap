import React from 'react';
import {
  Monitor,
  Plus,
  FileCode2,
  RefreshCw,
  Server,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isApiOnline: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCreateModal,
  onRefresh,
  isRefreshing,
  isApiOnline,
}) => {
  const swaggerUrl =
    import.meta.env.VITE_SWAGGER_URL || 'http://localhost:3000/api/docs';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo y Título */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Monitor className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  IIAP <span className="text-blue-600 dark:text-blue-400">Inventario</span>
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  <Sparkles className="w-3 h-3" /> v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Gestión de Equipos de Cómputo del Laboratorio
              </p>
            </div>
          </div>

          {/* Acciones del Header */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Indicador de Estado de la API */}
            <div
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isApiOnline
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800'
              }`}
              title={
                isApiOnline
                  ? 'Conexión con Backend REST establecida'
                  : 'Sin conexión con el Backend'
              }
            >
              <Server className="w-3.5 h-3.5" />
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isApiOnline ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isApiOnline ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
              </span>
              <span>{isApiOnline ? 'API Conectada' : 'API Desconectada'}</span>
            </div>

            {/* Enlace a Swagger */}
            <a
              href={swaggerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all hover:scale-105"
              title="Abrir Documentación Swagger OpenAPI"
            >
              <FileCode2 className="w-4 h-4 text-indigo-500" />
              <span className="hidden sm:inline">Swagger Docs</span>
            </a>

            {/* Botón Refrescar */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-all disabled:opacity-50"
              title="Recargar inventario"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`}
              />
            </button>

            {/* Botón Nuevo Equipo */}
            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Nuevo Equipo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
