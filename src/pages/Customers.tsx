import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Customer } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import { DataTable } from '../components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

const Customers = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useStore();
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
  });

  const columns = useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
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
              onClick={() => deleteCustomer(row.original.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [deleteCustomer]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer, formData);
      setEditingCustomer(null);
    } else {
      addCustomer(formData);
    }
    setFormData({ name: '', email: '' });
    setIsAddingCustomer(false);
  };

  const handleEdit = (customer: Customer) => {
    setFormData(customer);
    setEditingCustomer(customer.id);
    setIsAddingCustomer(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button onClick={() => setIsAddingCustomer(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Drawer
        isOpen={isAddingCustomer}
        onClose={() => {
          setIsAddingCustomer(false);
          setEditingCustomer(null);
          setFormData({ name: '', email: '' });
        }}
        title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddingCustomer(false);
                setEditingCustomer(null);
                setFormData({ name: '', email: '' });
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingCustomer ? 'Update Customer' : 'Add Customer'}
            </Button>
          </div>
        </form>
      </Drawer>

      <DataTable columns={columns} data={customers} />
    </div>
  );
};

export default Customers;