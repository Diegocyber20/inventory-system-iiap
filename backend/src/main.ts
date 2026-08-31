import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas API
  app.setGlobalPrefix('api');

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Validación estricta con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión de Inventario de Equipos - SENATI')
    .setDescription(
      'API RESTful para la administración de inventario de equipos de cómputo del laboratorio. Permite registrar, consultar, actualizar y eliminar equipos.',
    )
    .setVersion('1.0.0')
    .addTag('Equipos (Equipments)', 'Operaciones CRUD para la gestión de equipos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'SENATI Inventory API Docs',
    customCss: '.swagger-ui .topbar { background-color: #0B2860; }',
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`🚀 Servidor ejecutándose en: http://localhost:${port}/api`);
  logger.log(`📚 Documentación Swagger disponible en: http://localhost:${port}/api/docs`);
}
bootstrap();
