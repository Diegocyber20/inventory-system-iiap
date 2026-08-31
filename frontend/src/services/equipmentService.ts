import type {
  Equipment,
  CreateEquipmentInput,
  UpdateEquipmentInput,
} from '../types/equipment';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  statusCode: number;
  details?: string[];

  constructor(message: string, statusCode: number, details?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `Error en la petición: ${response.statusText}`;
    let details: string[] | undefined;

    try {
      const errorBody = await response.json();
      if (errorBody.message) {
        if (Array.isArray(errorBody.message)) {
          details = errorBody.message;
          errorMessage = errorBody.message.join(', ');
        } else {
          errorMessage = errorBody.message;
        }
      }
    } catch {
      // Si la respuesta no es JSON, conservar mensaje por defecto
    }

    throw new ApiError(errorMessage, response.status, details);
  }

  // Manejar respuesta vacía o con contenido
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return (await response.json()) as T;
  }
  return {} as T;
}

export const equipmentService = {
  /**
   * Obtener lista de equipos con filtros opcionales de búsqueda y estado
   */
  async getAll(search?: string, status?: string): Promise<Equipment[]> {
    const params = new URLSearchParams();
    if (search && search.trim() !== '') {
      params.append('search', search.trim());
    }
    if (status && status.trim() !== '' && status !== 'ALL') {
      params.append('status', status.trim());
    }

    const url = `${API_BASE_URL}/equipments${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse<Equipment[]>(response);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError(
        'No se pudo conectar con el servidor backend. Verifique que el servicio esté activo.',
        0,
      );
    }
  },

  /**
   * Obtener un equipo por ID
   */
  async getById(id: string): Promise<Equipment> {
    try {
      const response = await fetch(`${API_BASE_URL}/equipments/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse<Equipment>(response);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Error al obtener el equipo', 0);
    }
  },

  /**
   * Crear un nuevo equipo en el sistema
   */
  async create(data: CreateEquipmentInput): Promise<Equipment> {
    try {
      const response = await fetch(`${API_BASE_URL}/equipments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse<Equipment>(response);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Error al crear el equipo', 0);
    }
  },

  /**
   * Actualizar un equipo existente
   */
  async update(id: string, data: UpdateEquipmentInput): Promise<Equipment> {
    try {
      const response = await fetch(`${API_BASE_URL}/equipments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await handleResponse<Equipment>(response);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Error al actualizar el equipo', 0);
    }
  },

  /**
   * Eliminar un equipo por su ID
   */
  async delete(id: string): Promise<{ message: string; id: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/equipments/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await handleResponse<{ message: string; id: string }>(response);
    } catch (err) {
      if (err instanceof ApiError) throw err;
      throw new ApiError('Error al eliminar el equipo', 0);
    }
  },

  /**
   * Verificar estado de salud del backend
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/equipments`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};
