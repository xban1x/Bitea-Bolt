import React, { useState, useMemo } from 'react';
import { useStore } from '../../store';
import { Plus, Trash2 } from 'lucide-react';
import type { ProductType } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Drawer } from '../../components/ui/Drawer';
import { DataTable } from '../../components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

const ProductTypes = () => {
  const { productTypes, addProductType, deleteProductType } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<ProductType, 'id'>>({
    name: '',
  });

  const columns = useMemo<ColumnDef<ProductType>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteProductType(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        ),
      },
    ],
    [deleteProductType]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProductType(formData);
    setFormData({ name: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Product Types</h1>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product Type
        </Button>
      </div>

      <Drawer
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        title="Add New Product Type"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ name: e.target.value })}
            required
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsAdding(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">
              Add Product Type
            </Button>
          </div>
        </form>
      </Drawer>

      <DataTable columns={columns} data={productTypes} />
    </div>
  );
};

export default ProductTypes;