import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { DeliveryNote } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Drawer } from '../components/ui/Drawer';
import { DataTable } from '../components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';

const DeliveryNotes = () => {
  const { products, deliveryNotes, addDeliveryNote, updateDeliveryNote, deleteDeliveryNote } = useStore();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<DeliveryNote, 'id'>>({
    noteNumber: '',
    date: new Date(),
    items: [],
  });

  const columns = useMemo<ColumnDef<DeliveryNote>[]>(
    () => [
      {
        accessorKey: 'noteNumber',
        header: 'Note Number',
      },
      {
        id: 'date',
        header: 'Date',
        cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
      },
      {
        id: 'items',
        header: 'Items',
        cell: ({ row }) => row.original.items.length,
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
              onClick={() => deleteDeliveryNote(row.original.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ),
      },
    ],
    [deleteDeliveryNote]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNote) {
      updateDeliveryNote(editingNote, formData);
      setEditingNote(null);
    } else {
      addDeliveryNote(formData);
    }
    setFormData({
      noteNumber: '',
      date: new Date(),
      items: [],
    });
    setIsAddingNote(false);
  };

  const handleEdit = (note: DeliveryNote) => {
    setFormData(note);
    setEditingNote(note.id);
    setIsAddingNote(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Delivery Notes</h1>
        <Button onClick={() => setIsAddingNote(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Delivery Note
        </Button>
      </div>

      <Drawer
        isOpen={isAddingNote}
        onClose={() => {
          setIsAddingNote(false);
          setEditingNote(null);
          setFormData({
            noteNumber: '',
            date: new Date(),
            items: [],
          });
        }}
        title={editingNote ? 'Edit Delivery Note' : 'Add New Delivery Note'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Note Number"
            value={formData.noteNumber}
            onChange={(e) => setFormData({ ...formData, noteNumber: e.target.value })}
            required
          />

          <Input
            label="Date"
            type="date"
            value={new Date(formData.date).toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
            required
          />

          {/* Items section will be implemented later */}

          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => {
                setIsAddingNote(false);
                setEditingNote(null);
                setFormData({
                  noteNumber: '',
                  date: new Date(),
                  items: [],
                });
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingNote ? 'Update Delivery Note' : 'Add Delivery Note'}
            </Button>
          </div>
        </form>
      </Drawer>

      <DataTable columns={columns} data={deliveryNotes} />
    </div>
  );
};

export default DeliveryNotes;