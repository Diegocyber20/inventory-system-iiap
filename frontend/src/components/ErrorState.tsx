import React from 'react';
import { AlertCircle, RefreshCw, Terminal } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 p-8 sm:p-12 text-center max-w-2xl mx-auto my-12 shadow-lg shadow-rose-500/5">
      <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
        Error al Conectar con el Servidor
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 mb-6 max-w-md mx-auto">
        {message}
      </p>

      <div className="p-4 rounded-xl bg-slate-900 text-slate-200 text-left text-xs font-mono mb-6 max-w-md mx-auto flex items-start gap-2.5 overflow-x-auto">
        <Terminal className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-400">// Iniciar backend en local:</span>
          <p className="text-emerald-400 mt-1">cd backend && npm run start:dev</p>
          <span className="text-slate-400 block mt-2">// O con Docker:</span>
          <p className="text-emerald-400 mt-1">docker-compose up --build</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-md shadow-rose-500/25 transition-all hover:scale-105"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Reintentar Conexión</span>
      </button>
    </div>
  );
};
