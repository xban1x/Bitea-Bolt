import type { Product, ProductType, Manufacturer, Customer } from '../types';

export const seedProductTypes: ProductType[] = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Furniture' },
  { id: '3', name: 'Office Supplies' },
  { id: '4', name: 'Books' },
];

export const seedManufacturers: Manufacturer[] = [
  { id: '1', name: 'TechCorp', contactInfo: 'contact@techcorp.com' },
  { id: '2', name: 'FurnishPro', contactInfo: 'sales@furnishpro.com' },
  { id: '3', name: 'OfficeMax', contactInfo: 'support@officemax.com' },
  { id: '4', name: 'BookHouse', contactInfo: 'info@bookhouse.com' },
];

export const seedProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro X1',
    sku: 'TECH-001',
    description: 'High-performance laptop for professionals',
    typeId: '1',
    manufacturerId: '1',
  },
  {
    id: '2',
    name: 'Office Chair Deluxe',
    sku: 'FURN-001',
    description: 'Ergonomic office chair with lumbar support',
    typeId: '2',
    manufacturerId: '2',
  },
  {
    id: '3',
    name: 'Wireless Mouse',
    sku: 'TECH-002',
    description: 'Bluetooth wireless mouse',
    typeId: '1',
    manufacturerId: '1',
  },
  {
    id: '4',
    name: 'Standing Desk',
    sku: 'FURN-002',
    description: 'Adjustable height standing desk',
    typeId: '2',
    manufacturerId: '2',
  },
  {
    id: '5',
    name: 'Premium Notebook',
    sku: 'OFF-001',
    description: 'A4 premium lined notebook',
    typeId: '3',
    manufacturerId: '3',
  },
  {
    id: '6',
    name: 'Business Strategy Guide',
    sku: 'BOOK-001',
    description: 'Comprehensive business strategy guide',
    typeId: '4',
    manufacturerId: '4',
  },
];

export const seedCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
  },
  {
    id: '3',
    name: 'Tech Solutions Inc.',
    email: 'procurement@techsolutions.com',
  },
  {
    id: '4',
    name: 'Global Office Supplies',
    email: 'orders@globaloffice.com',
  },
  {
    id: '5',
    name: 'Education Center',
    email: 'purchases@educenter.org',
  },
];