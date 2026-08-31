import { Test, TestingModule } from '@nestjs/testing';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

const mockEquipment = {
  id: 'uuid-1234',
  name: 'Laptop Dell Latitude',
  brand: 'Dell',
  status: 'Operativo',
  serialNumber: 'DLL-12345',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockEquipmentService = {
  findAll: jest.fn().mockResolvedValue([mockEquipment]),
  findOne: jest.fn().mockResolvedValue(mockEquipment),
  create: jest.fn().mockResolvedValue(mockEquipment),
  update: jest.fn().mockResolvedValue(mockEquipment),
  remove: jest.fn().mockResolvedValue({ message: 'Equipo eliminado exitosamente', id: 'uuid-1234' }),
};

describe('EquipmentController', () => {
  let controller: EquipmentController;
  let service: EquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipmentController],
      providers: [
        {
          provide: EquipmentService,
          useValue: mockEquipmentService,
        },
      ],
    }).compile();

    controller = module.get<EquipmentController>(EquipmentController);
    service = module.get<EquipmentService>(EquipmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all equipments', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockEquipment]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single equipment by ID', async () => {
    const result = await controller.findOne('uuid-1234');
    expect(result).toEqual(mockEquipment);
    expect(service.findOne).toHaveBeenCalledWith('uuid-1234');
  });

  it('should create a new equipment', async () => {
    const dto = {
      name: 'Laptop Dell Latitude',
      brand: 'Dell',
      status: 'Operativo',
      serialNumber: 'DLL-12345',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockEquipment);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update an equipment', async () => {
    const dto = { status: 'En Mantenimiento' };
    const result = await controller.update('uuid-1234', dto);
    expect(result).toEqual(mockEquipment);
    expect(service.update).toHaveBeenCalledWith('uuid-1234', dto);
  });

  it('should delete an equipment', async () => {
    const result = await controller.remove('uuid-1234');
    expect(result).toEqual({ message: 'Equipo eliminado exitosamente', id: 'uuid-1234' });
    expect(service.remove).toHaveBeenCalledWith('uuid-1234');
  });
});
