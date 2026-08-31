import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { EquipmentService, EquipmentEntity } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@ApiTags('Equipos (Equipments)')
@Controller('equipments')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Registrar un nuevo equipo',
    description:
      'Crea un nuevo equipo de cómputo en el inventario con nombre, marca, estado y número de serie único.',
  })
  @ApiResponse({
    status: 201,
    description: 'Equipo registrado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o faltantes en el cuerpo de la petición.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflicto: Ya existe un equipo con el número de serie proporcionado.',
  })
  create(@Body() createEquipmentDto: CreateEquipmentDto): Promise<EquipmentEntity> {
    return this.equipmentService.create(createEquipmentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos los equipos',
    description:
      'Obtiene la lista completa de equipos de cómputo registrados, con posibilidad de filtrar por estado o buscar por nombre/marca/serie.',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Término de búsqueda por nombre, marca o número de serie',
    example: 'Dell',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por estado del equipo (Operativo, En Mantenimiento, De Baja)',
    example: 'Operativo',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de equipos obtenida correctamente.',
  })
  findAll(
    @Query('search') search?: string,
    @Query('status') status?: string,
  ): Promise<EquipmentEntity[]> {
    return this.equipmentService.findAll(search, status);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un equipo por ID',
    description: 'Retorna los datos detallados de un equipo específico utilizando su identificador UUID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador único (UUID) del equipo',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo encontrado.',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró ningún equipo con el ID especificado.',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<EquipmentEntity> {
    return this.equipmentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar información de un equipo',
    description:
      'Actualiza de forma parcial o total los datos de un equipo existente (ej. cambiar estado a "En Mantenimiento", actualizar marca o número de serie).',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del equipo a modificar',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo actualizado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de actualización inválidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Equipo no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflicto: El número de serie ya pertenece a otro equipo.',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ): Promise<EquipmentEntity> {
    return this.equipmentService.update(id, updateEquipmentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un equipo del inventario',
    description: 'Elimina permanentemente un equipo del registro de inventario mediante su UUID.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID del equipo a eliminar',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipo eliminado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Equipo no encontrado.',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<{ message: string; id: string }> {
    return this.equipmentService.remove(id);
  }
}
