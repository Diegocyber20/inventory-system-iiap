# ==========================================
# Build Stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias necesarias para compilar módulos nativos si los hubiera
RUN apk add --no-cache openssl

# Copiar archivos de definición de paquetes
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

# Instalar todas las dependencias
RUN npm ci

# Generar el cliente de Prisma
RUN npx prisma generate

# Copiar código fuente
COPY . .

# Compilar la aplicación NestJS
RUN npm run build

# ==========================================
# Production Stage
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV PORT=3000

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma.config.ts ./
COPY prisma ./prisma/

# Instalar únicamente dependencias de producción
RUN npm ci --omit=dev

# Generar el cliente de Prisma en producción
RUN npx prisma generate

# Copiar la aplicación compilada desde el builder
COPY --from=builder /app/dist ./dist

# Exponer el puerto del backend
EXPOSE 3000

# Comando para sincronizar base de datos y arrancar el servidor
CMD ["sh", "-c", "npx prisma db push && node dist/main.js"]
