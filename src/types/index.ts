export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  typeId: string;
  manufacturerId: string;
  parentProductId?: string;
}

export interface ProductType {
  id: string;
  name: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  contactInfo: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface PriceList {
  id: string;
  productId: string;
  customerId?: string;
  price: number;
  validFrom: Date;
  validTo?: Date;
}

export interface DeliveryNote {
  id: string;
  noteNumber: string;
  date: Date;
  items: DeliveryNoteItem[];
}

export interface DeliveryNoteItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface RecipientNote {
  id: string;
  noteNumber: string;
  date: Date;
  items: RecipientNoteItem[];
}

export interface RecipientNoteItem {
  id: string;
  productId: string;
  quantity: number;
}

export interface StockLevel {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
}