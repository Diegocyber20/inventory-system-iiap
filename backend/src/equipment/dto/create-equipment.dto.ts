import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum EquipmentStatus {
  OPERATIVE = 'Operativo',
  MAINTENANCE = 'En Mantenimiento',
  OUT_OF_SERVICE = 'De Baja',
}

export class CreateEquipmentDto {
  @ApiProperty({
    description: 'Nombre del equipo',
    example: 'Laptop Dell Latitude',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @ApiProperty({
    description: 'Marca del equipo',
    example: 'Dell',
  })
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  brand: string;

  @ApiProperty({
    description: 'Estado del equipo',
    enum: EquipmentStatus,
    example: 'Operativo',
  })
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsEnum(EquipmentStatus, {
    message: 'El estado debe ser uno de los siguientes: Operativo, En Mantenimiento, De Baja',
  })
  status: string;

  @ApiProperty({
    description: 'Número de serie único',
    example: 'CN-0ABC12-34567-89A-BCDE',
  })
  @IsNotEmpty({ message: 'El número de serie es obligatorio' })
  @IsString({ message: 'El número de serie debe ser una cadena de texto' })
  serialNumber: string;
}
