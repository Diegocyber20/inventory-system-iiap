import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

export interface EquipmentEntity {
  id: string;
  name: string;
  brand: string;
  status: string;
  serialNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crear un nuevo equipo en el inventario
   */
  async create(createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity> {
    try {
      const existing = await this.prisma.equipment.findUnique({
        where: { serialNumber: createEquipmentDto.serialNumber },
      });

      if (existing) {
        throw new ConflictException(
          `Ya existe un equipo con el número de serie '${createEquipmentDto.serialNumber}'`,
        );
      }

      return await this.prisma.equipment.create({
        data: {
          name: createEquipmentDto.name.trim(),
          brand: createEquipmentDto.brand.trim(),
          status: createEquipmentDto.status.trim(),
          serialNumber: createEquipmentDto.serialNumber.trim(),
        },
      });
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      // Prisma unique constraint error code P2002
      if ((error as { code?: string })?.code === 'P2002') {
        throw new ConflictException(
          `El número de serie '${createEquipmentDto.serialNumber}' ya está en uso.`,
        );
      }
      throw new InternalServerErrorException(
        'Ocurrió un error al registrar el equipo: ' + (error as Error).message,
      );
    }
  }

  /**
   * Listar todos los equipos con soporte de búsqueda y filtro por estado
   */
  async findAll(search?: string, status?: string): Promise<EquipmentEntity[]> {
    const whereClause: Record<string, unknown> = {};

    if (status && status.trim() !== '') {
      whereClause.status = status.trim();
    }

    if (search && search.trim() !== '') {
      const query = search.trim();
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
        { serialNumber: { contains: query, mode: 'insensitive' } },
      ];
    }

    return await this.prisma.equipment.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Obtener un equipo por su ID único
   */
  async findOne(id: string): Promise<EquipmentEntity> {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new NotFoundException(`No se encontró el equipo con el ID: ${id}`);
    }

    return equipment;
  }

  /**
   * Actualizar los datos de un equipo existente
   */
  async update(
    id: string,
    updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<EquipmentEntity> {
    // Validar existencia previa
    await this.findOne(id);

    // Si se envía número de serie, verificar que no colisione con otro equipo
    if (updateEquipmentDto.serialNumber) {
      const serialConflict = await this.prisma.equipment.findFirst({
        where: {
          serialNumber: updateEquipmentDto.serialNumber.trim(),
          NOT: { id },
        },
      });

      if (serialConflict) {
        throw new ConflictException(
          `El número de serie '${updateEquipmentDto.serialNumber}' ya pertenece a otro equipo.`,
        );
      }
    }

    try {
      return await this.prisma.equipment.update({
        where: { id },
        data: {
          ...(updateEquipmentDto.name && { name: updateEquipmentDto.name.trim() }),
          ...(updateEquipmentDto.brand && { brand: updateEquipmentDto.brand.trim() }),
          ...(updateEquipmentDto.status && { status: updateEquipmentDto.status.trim() }),
          ...(updateEquipmentDto.serialNumber && {
            serialNumber: updateEquipmentDto.serialNumber.trim(),
          }),
        },
      });
    } catch (error) {
      if ((error as { code?: string })?.code === 'P2002') {
        throw new ConflictException('El número de serie ingresado ya está registrado.');
      }
      throw new InternalServerErrorException(
        'Error al actualizar el equipo: ' + (error as Error).message,
      );
    }
  }

  /**
   * Eliminar un equipo del inventario
   */
  async remove(id: string): Promise<{ message: string; id: string }> {
    // Validar existencia previa
    await this.findOne(id);

    await this.prisma.equipment.delete({
      where: { id },
    });

    return {
      message: 'Equipo eliminado exitosamente',
      id,
    };
  }
}
