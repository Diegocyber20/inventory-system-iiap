# 🖥️ Sistema de Gestión de Inventario de Equipos de Cómputo - IIAP

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.0-ea2849.svg?logo=nestjs)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9-2D3748.svg?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg?logo=docker)](https://www.docker.com/)
[![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D.svg?logo=swagger)](http://localhost:3000/api/docs)

> **Sistema de Gestión de Inventario de Equipos de Cómputo — IIAP**  
> Aplicación web integral para la administración y control de inventario de equipos de cómputo del laboratorio (CRUD completo).

---

## 📋 Tabla de Contenidos
- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Documentación Interactiva (Swagger)](#-documentación-interactiva-swagger)
- [Requisitos Previos](#-requisitos-previos)
- [Instrucciones de Ejecución con Docker (Recomendado)](#-instrucciones-de-ejecución-con-docker-recomendado)
- [Instrucciones de Ejecución en Local (Sin Docker)](#-instrucciones-de-ejecución-en-local-sin-docker)
- [Variables de Entorno](#-variables-de-entorno)
- [Endpoints de la API REST](#-endpoints-de-la-api-rest)
- [Estrategia de Ramas y Control de Versiones (Git)](#-estrategia-de-ramas-y-control-de-versiones-git)
- [Estructura del Repositorio](#-estructura-del-repositorio)

---

## 🚀 Descripción del Proyecto

El **Sistema de Gestión de Inventario IIAP** permite a los administradores y encargados de laboratorio registrar, consultar, auditar, actualizar el estado operativo y dar de baja a los equipos de cómputo (laptops, monitores, periféricos, servidores y dispositivos de red).

### 🎯 Funcionalidades CRUD:
1. **Crear Equipo (`POST /api/equipments`):** Registro de nuevos dispositivos con nombre, marca, estado inicial y número de serie único validado.
2. **Listar Equipos (`GET /api/equipments`):** Consulta global con búsqueda reactiva en tiempo real y filtrado por estado (`Operativo`, `En Mantenimiento`, `De Baja`).
3. **Detalle Técnico (`GET /api/equipments/:id`):** Visualización de metadatos completos, UUID y marcas de tiempo de auditoría (`created_at`, `updated_at`).
4. **Actualizar Equipo (`PATCH /api/equipments/:id`):** Modificación parcial o total de datos, como el cambio de estado de *"Operativo"* a *"En Mantenimiento"*.
5. **Eliminar Equipo (`DELETE /api/equipments/:id`):** Retiro permanente de registros con confirmación modal de seguridad.

---

## ✨ Características Principales

- **TypeScript Estricto:** Tipado completo tanto en Frontend como en Backend (cero uso de `any`, DTOs con `class-validator` e interfaces explícitas).
- **Métricas en Tiempo Real:** Tarjetas dinámicas con conteo de equipos totales, operativos, en mantenimiento y de baja.
- **UI Moderna y Responsiva:** Interfaz construida con React 19, Tailwind CSS, iconografía Lucide, modales interactivos y alertas Toast.
- **Resiliencia y Manejo de Errores:** Control de excepciones HTTP (400 Bad Request, 404 Not Found, 409 Conflict por número de serie duplicado).
- **Dockerización Total:** Orquestación de 3 servicios (Base de Datos PostgreSQL, API Backend NestJS y SPA Frontend en Nginx) en un solo comando.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Descripción |
| :--- | :--- | :--- |
| **Backend** | **NestJS 11** | Framework progresivo sobre Node.js con arquitectura modular y controladores/servicios desacoplados. |
| **ORM** | **Prisma 7** | Mapeo objeto-relacional tipo-seguro y cliente optimizado para PostgreSQL. |
| **Base de Datos** | **PostgreSQL 16** | Base de datos relacional robusta con restricciones de unicidad e índices. |
| **Documentación** | **Swagger / OpenAPI 3.0** | Documentación interactiva accesible desde navegador para probar endpoints. |
| **Frontend** | **React 19 + Vite** | SPA rápida, reactiva y optimizada con TypeScript. |
| **Estilos UI** | **Tailwind CSS** | Sistema de diseño moderno, limpio y adaptable a cualquier resolución. |
| **Contenedores** | **Docker & Docker Compose** | Entorno reproducible y despliegue multi-contenedor con Nginx. |

---

## 📚 Documentación Interactiva (Swagger)

Una vez iniciado el backend, la documentación de la API y el explorador interactivo OpenAPI están disponibles en:

👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

Desde esta interfaz podrás:
- Inspeccionar todos los esquemas DTO (`CreateEquipmentDto`, `UpdateEquipmentDto`).
- Ejecutar peticiones en vivo (`Try it out`) contra la base de datos.
- Validar códigos de respuesta y ejemplos de payload.

---

## ⚙️ Requisitos Previos

- **Docker y Docker Desktop** (Recomendado para ejecución con un solo comando), ó
- **Node.js (v18 o superior)** y **npm** (para ejecución local).
- **PostgreSQL (v14 o superior)** (en caso de correr en local sin Docker).

---

## 🐳 Instrucciones de Ejecución con Docker (Recomendado)

Todo el ecosistema (PostgreSQL, Backend y Frontend) se levanta con un solo comando.

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd inventory-system-iiap
```

### 2. Configurar variables de entorno
Crea el archivo `.env` en la raíz copiando el ejemplo proporcionado:
```bash
cp .env.example .env
```

### 3. Levantar la aplicación con Docker Compose
```bash
docker-compose up --build
```
*(O en segundo plano con `docker-compose up -d --build`)*

### 4. Acceso a las aplicaciones
- 🌐 **Frontend (Interfaz de Usuario):** [http://localhost:5173](http://localhost:5173)
- 🔌 **Backend (API REST):** [http://localhost:3000/api](http://localhost:3000/api)
- 📚 **Swagger (Documentación):** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

### Para detener los servicios:
```bash
docker-compose down
```

---

## 💻 Instrucciones de Ejecución en Local (Sin Docker)

Si deseas ejecutar el proyecto de forma nativa en tu máquina:

### 1. Iniciar la Base de Datos PostgreSQL
Asegúrate de tener una base de datos PostgreSQL llamada `inventory_db` activa en el puerto `5432`.

### 2. Configurar y Ejecutar el Backend
```bash
cd backend

# 1. Instalar dependencias
npm install

# 2. Configurar archivo .env en /backend
cp .env.example .env
# Ajusta DATABASE_URL si tu usuario/contraseña difieren

# 3. Generar cliente de Prisma y ejecutar migraciones
npx prisma generate
npx prisma migrate dev --name init

# 4. (Opcional) Poblar base de datos con datos de prueba
npm run prisma:seed

# 5. Iniciar backend en modo desarrollo
npm run start:dev
```
El servidor backend estará escuchando en `http://localhost:3000/api`.

### 3. Configurar y Ejecutar el Frontend
En otra terminal:
```bash
cd frontend

# 1. Instalar dependencias
npm install

# 2. Configurar archivo .env en /frontend
cp .env.example .env

# 3. Iniciar servidor de desarrollo Vite
npm run dev
```
La aplicación web se abrirá en `http://localhost:5173`.

---

## 🔑 Variables de Entorno

El archivo [`.env.example`](file:///.env.example) contiene la plantilla con las siguientes variables:

```env
# Base de Datos PostgreSQL
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=inventory_db
DB_PORT=5432

# Backend NestJS
BACKEND_PORT=3000

# Frontend React + Vite
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:3000/api
VITE_SWAGGER_URL=http://localhost:3000/api/docs
```

---

## 📡 Endpoints de la API REST

Todos los endpoints están prefijados con `/api`:

| Método | Endpoint | Descripción | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/equipments` | Registrar un nuevo equipo | `201 Created`, `400 Bad Request`, `409 Conflict` |
| `GET` | `/api/equipments` | Listar todos los equipos (filtros: `?search=` y `?status=`) | `200 OK` |
| `GET` | `/api/equipments/:id` | Obtener ficha técnica por UUID | `200 OK`, `404 Not Found` |
| `PATCH` | `/api/equipments/:id` | Actualizar datos de un equipo | `200 OK`, `400 Bad Request`, `404 Not Found`, `409 Conflict` |
| `DELETE` | `/api/equipments/:id` | Eliminar un equipo del inventario | `200 OK`, `404 Not Found` |

### Ejemplo de Payload para Crear Equipo (`POST /api/equipments`):
```json
{
  "name": "Laptop Lenovo ThinkPad T14 Gen 3",
  "brand": "Lenovo",
  "status": "Operativo",
  "serialNumber": "LNV-TP14-2024-001"
}
```

### Ejemplo de Payload para Actualizar Estado (`PATCH /api/equipments/:id`):
```json
{
  "status": "En Mantenimiento"
}
```

---

## 🌿 Estrategia de Ramas y Control de Versiones (Git)

Siguiendo las mejores prácticas de **GitFlow** y commits convencionales (*Conventional Commits*):

- `main`: Rama principal de producción con versiones estables.
- `development`: Rama integradora del desarrollo activo.
- `feature/backend-crud`: Implementación del CRUD en NestJS, modelos Prisma, validaciones y pruebas unitarias.
- `feature/swagger-docs`: Configuración de OpenAPI / Swagger en `/api/docs`.
- `feature/frontend-ui`: Interfaz de usuario en React + Vite + TypeScript, consumo de API, modales y filtros.
- `feature/docker-setup`: Dockerfiles multi-stage, `docker-compose.yml` y variables de entorno.

### Historial de Pull Requests integrados:
1. **PR #1:** `feature/backend-crud` ➔ `development` (*Implementación de API REST, Prisma y Swagger*)
2. **PR #2:** `feature/frontend-ui` ➔ `development` (*UI React, métricas, filtros y modales*)
3. **PR #3:** `feature/docker-setup` ➔ `development` (*Orquestación Docker Compose y variables de entorno*)

---

## 📁 Estructura del Repositorio

```text
inventory-system-iiap/
├── .env.example             # Plantilla de variables de entorno global
├── .gitignore               # Exclusiones globales de Git
├── docker-compose.yml       # Orquestador multi-contenedor (Postgres, Backend, Frontend)
├── README.md                # Documentación principal del proyecto
│
├── backend/                 # API RESTful en NestJS + TypeScript + Prisma
│   ├── Dockerfile           # Construcción multi-stage de Node.js Alpine
│   ├── .dockerignore
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/              # Esquema de base de datos y scripts de seed
│   │   ├── schema.prisma    # Modelo relacional 'Equipment'
│   │   └── seed.ts          # Datos iniciales de prueba
│   └── src/
│       ├── main.ts          # Inicialización, Swagger, CORS y ValidationPipe
│       ├── app.module.ts    # Módulo raíz
│       ├── prisma.service.ts# Conexión con PostgreSQL
│       ├── prisma.module.ts
│       └── equipment/       # Módulo de Equipos
│           ├── equipment.controller.ts  # Endpoints REST y decoradores Swagger
│           ├── equipment.service.ts     # Lógica de negocio y manejo de errores
│           ├── equipment.module.ts
│           ├── equipment.controller.spec.ts # Pruebas unitarias del controlador
│           ├── equipment.service.spec.ts    # Pruebas unitarias del servicio
│           └── dto/
│               ├── create-equipment.dto.ts  # Validaciones con class-validator
│               └── update-equipment.dto.ts  # DTO parcial
│
└── frontend/                # Aplicación Web React 19 + Vite + TypeScript
    ├── Dockerfile           # Construcción con Vite y servidor Nginx
    ├── nginx.conf           # Configuración Nginx para SPA y Gzip
    ├── .dockerignore
    ├── .env.example
    ├── package.json
    ├── vite.config.ts
    ├── index.html           # Plantilla HTML con Google Fonts Inter
    └── src/
        ├── App.tsx          # Componente principal con estado y filtros
        ├── index.css        # Estilos base y Tailwind CSS
        ├── types/           # Interfaces TypeScript estrictas
        │   └── equipment.ts
        ├── services/        # Cliente HTTP con fetch y manejo de errores
        │   └── equipmentService.ts
        └── components/      # Componentes modulares
            ├── Navbar.tsx             # Barra superior con estado de API y Swagger
            ├── StatsCards.tsx         # Tarjetas de métricas interactivas
            ├── FiltersBar.tsx         # Búsqueda y selector de estados
            ├── EquipmentTable.tsx     # Tabla de inventario y acciones
            ├── EquipmentModal.tsx     # Modal para crear y editar equipos
            ├── EquipmentDetailsModal.tsx # Ficha técnica de equipo
            ├── DeleteConfirmModal.tsx # Diálogo de confirmación
            ├── StatusBadge.tsx        # Indicadores de estado visuales
            ├── Toast.tsx              # Notificaciones emergentes
            ├── LoadingSkeleton.tsx    # Esqueleto de carga
            └── ErrorState.tsx         # Pantalla de reconexión
```

---

## 👨‍💻 Información del Proyecto

- **Organización / Proyecto:** IIAP
- **Repositorio:** [inventory-system-iiap](https://github.com/...)
