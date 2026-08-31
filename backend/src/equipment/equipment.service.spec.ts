import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentService } from './equipment.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

const mockEquipment = {
  id: 'uuid-1234',
  name: 'Laptop Dell Latitude',
  brand: 'Dell',
  status: 'Operativo',
  serialNumber: 'DLL-12345',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  equipment: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('EquipmentService', () => {
  let service: EquipmentService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EquipmentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EquipmentService>(EquipmentService);
    prisma = module.get(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of equipments', async () => {
      prisma.equipment.findMany.mockResolvedValue([mockEquipment]);
      const result = await service.findAll();
      expect(result).toEqual([mockEquipment]);
      expect(prisma.equipment.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single equipment when found', async () => {
      prisma.equipment.findUnique.mockResolvedValue(mockEquipment);
      const result = await service.findOne('uuid-1234');
      expect(result).toEqual(mockEquipment);
    });

    it('should throw NotFoundException when equipment is not found', async () => {
      prisma.equipment.findUnique.mockResolvedValue(null);
      await expect(service.findOne('invalid-uuid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should successfully create an equipment', async () => {
      prisma.equipment.findUnique.mockResolvedValue(null);
      prisma.equipment.create.mockResolvedValue(mockEquipment);

      const result = await service.create({
        name: 'Laptop Dell Latitude',
        brand: 'Dell',
        status: 'Operativo',
        serialNumber: 'DLL-12345',
      });

      expect(result).toEqual(mockEquipment);
      expect(prisma.equipment.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if serialNumber already exists', async () => {
      prisma.equipment.findUnique.mockResolvedValue(mockEquipment);

      await expect(
        service.create({
          name: 'Laptop Dell Latitude',
          brand: 'Dell',
          status: 'Operativo',
          serialNumber: 'DLL-12345',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('update', () => {
    it('should successfully update an equipment', async () => {
      prisma.equipment.findUnique.mockResolvedValue(mockEquipment);
      prisma.equipment.findFirst.mockResolvedValue(null);
      prisma.equipment.update.mockResolvedValue({
        ...mockEquipment,
        status: 'En Mantenimiento',
      });

      const result = await service.update('uuid-1234', {
        status: 'En Mantenimiento',
      });

      expect(result.status).toEqual('En Mantenimiento');
    });
  });

  describe('remove', () => {
    it('should delete an existing equipment', async () => {
      prisma.equipment.findUnique.mockResolvedValue(mockEquipment);
      prisma.equipment.delete.mockResolvedValue(mockEquipment);

      const result = await service.remove('uuid-1234');
      expect(result).toEqual({
        message: 'Equipo eliminado exitosamente',
        id: 'uuid-1234',
      });
    });
  });
});
