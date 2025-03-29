import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type {
  Product,
  ProductType,
  Manufacturer,
  Customer,
  PriceList,
  DeliveryNote,
  RecipientNote,
  StockLevel,
} from '../types';
import { seedProducts, seedProductTypes, seedManufacturers, seedCustomers } from '../data/seed';

interface Store {
  products: Product[];
  productTypes: ProductType[];
  manufacturers: Manufacturer[];
  customers: Customer[];
  priceLists: PriceList[];
  deliveryNotes: DeliveryNote[];
  recipientNotes: RecipientNote[];
  
  // Products
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Product Types
  addProductType: (productType: Omit<ProductType, 'id'>) => void;
  deleteProductType: (id: string) => void;
  
  // Manufacturers
  addManufacturer: (manufacturer: Omit<Manufacturer, 'id'>) => void;
  deleteManufacturer: (id: string) => void;
  
  // Customers
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  // Price Lists
  addPriceList: (priceList: Omit<PriceList, 'id'>) => void;
  updatePriceList: (id: string, priceList: Partial<PriceList>) => void;
  deletePriceList: (id: string) => void;
  
  // Delivery Notes
  addDeliveryNote: (note: Omit<DeliveryNote, 'id'>) => void;
  updateDeliveryNote: (id: string, note: Partial<DeliveryNote>) => void;
  deleteDeliveryNote: (id: string) => void;
  
  // Recipient Notes
  addRecipientNote: (note: Omit<RecipientNote, 'id'>) => ReturnType<typeof createRecipientNote>;
  updateRecipientNote: (id: string, note: Partial<RecipientNote>) => void;
  deleteRecipientNote: (id: string) => void;
  
  // Stock Levels
  getStockLevels: () => StockLevel[];
}

const createRecipientNote = (note: Omit<RecipientNote, 'id'>) => ({
  ...note,
  id: uuidv4(),
});

export const useStore = create<Store>((set, get) => ({
  products: seedProducts,
  productTypes: seedProductTypes,
  manufacturers: seedManufacturers,
  customers: seedCustomers,
  priceLists: [],
  deliveryNotes: [],
  recipientNotes: [],
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: uuidv4() }],
  })),
  
  updateProduct: (id, product) => set((state) => ({
    products: state.products.map((p) => 
      p.id === id ? { ...p, ...product } : p
    ),
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((p) => p.id !== id),
  })),
  
  addProductType: (productType) => set((state) => ({
    productTypes: [...state.productTypes, { ...productType, id: uuidv4() }],
  })),

  deleteProductType: (id) => set((state) => ({
    productTypes: state.productTypes.filter((t) => t.id !== id),
  })),
  
  addManufacturer: (manufacturer) => set((state) => ({
    manufacturers: [...state.manufacturers, { ...manufacturer, id: uuidv4() }],
  })),

  deleteManufacturer: (id) => set((state) => ({
    manufacturers: state.manufacturers.filter((m) => m.id !== id),
  })),
  
  addCustomer: (customer) => set((state) => ({
    customers: [...state.customers, { ...customer, id: uuidv4() }],
  })),

  updateCustomer: (id, customer) => set((state) => ({
    customers: state.customers.map((c) => 
      c.id === id ? { ...c, ...customer } : c
    ),
  })),

  deleteCustomer: (id) => set((state) => ({
    customers: state.customers.filter((c) => c.id !== id),
  })),
  
  addPriceList: (priceList) => set((state) => ({
    priceLists: [...state.priceLists, { ...priceList, id: uuidv4() }],
  })),
  
  updatePriceList: (id, priceList) => set((state) => ({
    priceLists: state.priceLists.map((p) => 
      p.id === id ? { ...p, ...priceList } : p
    ),
  })),

  deletePriceList: (id) => set((state) => ({
    priceLists: state.priceLists.filter((p) => p.id !== id),
  })),
  
  addDeliveryNote: (note) => set((state) => ({
    deliveryNotes: [...state.deliveryNotes, { ...note, id: uuidv4() }],
  })),

  updateDeliveryNote: (id, note) => set((state) => ({
    deliveryNotes: state.deliveryNotes.map((n) => 
      n.id === id ? { ...n, ...note } : n
    ),
  })),

  deleteDeliveryNote: (id) => set((state) => ({
    deliveryNotes: state.deliveryNotes.filter((n) => n.id !== id),
  })),
  
  addRecipientNote: (note) => {
    const newNote = createRecipientNote(note);
    set((state) => ({
      recipientNotes: [...state.recipientNotes, newNote],
    }));
    return newNote;
  },

  updateRecipientNote: (id, note) => set((state) => ({
    recipientNotes: state.recipientNotes.map((n) => 
      n.id === id ? { ...n, ...note } : n
    ),
  })),

  deleteRecipientNote: (id) => set((state) => ({
    recipientNotes: state.recipientNotes.filter((n) => n.id !== id),
  })),
  
  getStockLevels: () => {
    const { products, deliveryNotes, recipientNotes } = get();
    
    return products.map((product) => {
      const deliveredQuantity = deliveryNotes
        .flatMap((note) => note.items)
        .filter((item) => item.productId === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);
        
      const receivedQuantity = recipientNotes
        .flatMap((note) => note.items)
        .filter((item) => item.productId === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);
        
      return {
        productId: product.id,
        productName: product.name,
        sku: product.sku,
        currentStock: deliveredQuantity - receivedQuantity,
      };
    });
  },
}));