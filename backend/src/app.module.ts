import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma.module';
import { EquipmentModule } from './equipment/equipment.module';

@Module({
  imports: [PrismaModule, EquipmentModule],
})
export class AppModule {}
