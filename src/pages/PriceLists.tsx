import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { PriceList } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import { DataTable } from '../components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

const PriceLists = () => {
  const { products, customers, priceLists, addPriceList, updatePriceList, deletePriceList } = useStore();
  const [isAddingPriceList, setIsAddingPriceList] = useState(false);
  const [editingPriceList, setEditingPriceList] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<PriceList, 'id'>>({
    productId: '',
    customerId: '',
    price: 0,
    validFrom: new Date(),
    validTo: undefined,
  });

  const columns = useMemo<ColumnDef<PriceList>[]>(
    () => [
      {
        id: 'product',
        header: 'Product',
        cell: ({ row }) => {
          const product = products.find((p) => p.id === row.original.productId);
          return product?.name || '-';
        },
      },
      {
        id: 'customer',
        header: 'Customer',
        cell: ({ row }) => {
          const customer = customers.find((c) => c.id === row.original.customerId);
          return customer?.name || 'All Customers';
        },
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      },
      {
        id: 'validFrom',
        header: 'Valid From',
        cell: ({ row }) => new Date(row.original.validFrom).toLocaleDateString(),
      },
      {
        id: 'validTo',
        header: 'Valid To',
        cell: ({ row }) => row.original.validTo ? new Date(row.original.validTo).toLocaleDateString() : '-',
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
              onClick={() => deletePriceList(row.original.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [products, customers, deletePriceList]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPriceList) {
      updatePriceList(editingPriceList, formData);
      setEditingPriceList(null);
    } else {
      addPriceList(formData);
    }
    setFormData({
      productId: '',
      customerId: '',
      price: 0,
      validFrom: new Date(),
      validTo: undefined,
    });
    setIsAddingPriceList(false);
  };

  const handleEdit = (priceList: PriceList) => {
    setFormData(priceList);
    setEditingPriceList(priceList.id);
    setIsAddingPriceList(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Price Lists</h1>
        <Button onClick={() => setIsAddingPriceList(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Price List
        </Button>
      </div>

      <Drawer
        isOpen={isAddingPriceList}
        onClose={() => {
          setIsAddingPriceList(false);
          setEditingPriceList(null);
          setFormData({
            productId: '',
            customerId: '',
            price: 0,
            validFrom: new Date(),
            validTo: undefined,
          });
        }}
        title={editingPriceList ? 'Edit Price List' : 'Add New Price List'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Product</label>
            <select
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Customer (Optional)</label>
            <select
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Customers</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
          />

          <Input
            label="Valid From"
            type="date"
            value={new Date(formData.validFrom).toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, validFrom: new Date(e.target.value) })}
            required
          />

          <Input
            label="Valid To (Optional)"
            type="date"
            value={formData.validTo ? new Date(formData.validTo).toISOString().split('T')[0] : ''}
            onChange={(e) => setFormData({ ...formData, validTo: e.target.value ? new Date(e.target.value) : undefined })}
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddingPriceList(false);
                setEditingPriceList(null);
                setFormData({
                  productId: '',
                  customerId: '',
                  price: 0,
                  validFrom: new Date(),
                  validTo: undefined,
                });
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingPriceList ? 'Update Price List' : 'Add Price List'}
            </Button>
          </div>
        </form>
      </Drawer>

      <DataTable columns={columns} data={priceLists} />
    </div>
  );
};

export default PriceLists;