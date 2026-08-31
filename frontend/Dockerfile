# ==========================================
# Build Stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Argumentos de compilación para variables de entorno de Vite
ARG VITE_API_URL=http://localhost:3000/api
ARG VITE_SWAGGER_URL=http://localhost:3000/api/docs

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SWAGGER_URL=$VITE_SWAGGER_URL

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar la aplicación React con Vite
RUN npm run build

# ==========================================
# Production Stage with Nginx
# ==========================================
FROM nginx:alpine AS runner

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos compilados desde el builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
