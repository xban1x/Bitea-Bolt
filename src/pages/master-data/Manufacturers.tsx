import React, { useState, useMemo } from 'react';
import { useStore } from '../../store';
import { Plus, Trash2 } from 'lucide-react';
import type { Manufacturer } from '../../types';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Drawer } from '../../components/ui/Drawer';
import { DataTable } from '../../components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

const Manufacturers = () => {
  const { manufacturers, addManufacturer, deleteManufacturer } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Manufacturer, 'id'>>({
    name: '',
    contactInfo: '',
  });

  const columns = useMemo<ColumnDef<Manufacturer>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'contactInfo',
        header: 'Contact Info',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteManufacturer(row.original.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        ),
      },
    ],
    [deleteManufacturer]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addManufacturer(formData);
    setFormData({ name: '', contactInfo: '' });
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manufacturers</h1>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Manufacturer
        </Button>
      </div>

      <Drawer
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        title="Add New Manufacturer"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Contact Info"
            value={formData.contactInfo}
            onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
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
              Add Manufacturer
            </Button>
          </div>
        </form>
      </Drawer>

      <DataTable columns={columns} data={manufacturers} />
    </div>
  );
};

export default Manufacturers;