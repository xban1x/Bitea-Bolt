import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Product } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import { DataTable } from '../components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

const Products = () => {
  const {
    products,
    productTypes,
    manufacturers,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useStore();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    sku: '',
    description: '',
    typeId: '',
    manufacturerId: '',
  });

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
      },
      {
        id: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const type = productTypes.find((t) => t.id === row.original.typeId);
          return type?.name || '-';
        },
      },
      {
        id: 'manufacturer',
        header: 'Manufacturer',
        cell: ({ row }) => {
          const manufacturer = manufacturers.find((m) => m.id === row.original.manufacturerId);
          return manufacturer?.name || '-';
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleEdit(row.original)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteProduct(row.original.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [productTypes, manufacturers, deleteProduct]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
    }
    setFormData({
      name: '',
      sku: '',
      description: '',
      typeId: '',
      manufacturerId: '',
    });
    setIsAddingProduct(false);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingProduct(product.id);
    setIsAddingProduct(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setIsAddingProduct(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Drawer
        isOpen={isAddingProduct}
        onClose={() => {
          setIsAddingProduct(false);
          setEditingProduct(null);
          setFormData({
            name: '',
            sku: '',
            description: '',
            typeId: '',
            manufacturerId: '',
          });
        }}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="SKU"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={formData.typeId}
              onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Type</option>
              {productTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
            <select
              value={formData.manufacturerId}
              onChange={(e) => setFormData({ ...formData, manufacturerId: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
                setFormData({
                  name: '',
                  sku: '',
                  description: '',
                  typeId: '',
                  manufacturerId: '',
                });
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </Drawer>

      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default Products;