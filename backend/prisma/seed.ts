import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:123456@localhost:5432/inventory_db?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando la siembra de datos de inventario...');

  // Limpiar datos existentes
  await prisma.equipment.deleteMany();

  const initialEquipments = [
    {
      name: 'Laptop ThinkPad T14 Gen 3',
      brand: 'Lenovo',
      status: 'Operativo',
      serialNumber: 'LNV-TP14-2024-001',
    },
    {
      name: 'Laptop Latitude 5420',
      brand: 'Dell',
      status: 'Operativo',
      serialNumber: 'DLL-LAT54-2024-002',
    },
    {
      name: 'Monitor UltraGear 27"',
      brand: 'LG',
      status: 'Operativo',
      serialNumber: 'LG-UG27-2023-010',
    },
    {
      name: 'Desktop ProDesk 400 G6',
      brand: 'HP',
      status: 'En Mantenimiento',
      serialNumber: 'HP-PD400-2022-045',
    },
    {
      name: 'Teclado Mecánico MX Keys',
      brand: 'Logitech',
      status: 'Operativo',
      serialNumber: 'LOG-MXK-2023-088',
    },
    {
      name: 'Monitor Curvo 24" CR50',
      brand: 'Samsung',
      status: 'De Baja',
      serialNumber: 'SAM-CR50-2021-019',
    },
    {
      name: 'Switch Catalyst 2960-X 24 Puertos',
      brand: 'Cisco',
      status: 'Operativo',
      serialNumber: 'CSCO-2960X-2023-007',
    },
    {
      name: 'Mouse Ergonómico MX Master 3S',
      brand: 'Logitech',
      status: 'Operativo',
      serialNumber: 'LOG-MXM3S-2024-012',
    },
    {
      name: 'Proyector PowerLite FH52+',
      brand: 'Epson',
      status: 'En Mantenimiento',
      serialNumber: 'EPS-PLFH52-2022-003',
    },
  ];

  for (const eq of initialEquipments) {
    const created = await prisma.equipment.create({
      data: eq,
    });
    console.log(`✓ Creado: ${created.name} (${created.serialNumber}) - [${created.status}]`);
  }

  console.log('✅ Siembra de datos completada exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la siembra de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
