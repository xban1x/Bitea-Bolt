import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import type { RecipientNoteItem } from '../types';

const RecipientNoteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, recipientNotes, updateRecipientNote } = useStore();
  const note = recipientNotes.find(n => n.id === id);
  
  const [items, setItems] = useState<RecipientNoteItem[]>([]);
  const [newItem, setNewItem] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Partial<RecipientNoteItem>>({
    productId: '',
    quantity: 1,
  });

  useEffect(() => {
    if (note) {
      setItems(note.items);
    }
  }, [note]);

  if (!note) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Recipient note not found</p>
        <button
          onClick={() => navigate('/recipient-notes')}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          Back to Recipient Notes
        </button>
      </div>
    );
  }

  const handleSave = () => {
    updateRecipientNote(note.id, { ...note, items });
    setNewItem(false);
    setCurrentItem({ productId: '', quantity: 1 });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleAddItem = () => {
    if (currentItem.productId && currentItem.quantity && currentItem.quantity > 0) {
      setItems([...items, { ...currentItem, id: crypto.randomUUID() } as RecipientNoteItem]);
      setNewItem(false);
      setCurrentItem({ productId: '', quantity: 1 });
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/recipient-notes')}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Recipient Note Details</h1>
          <p className="text-gray-500">Note Number: {note.noteNumber}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">Items</h2>
            <p className="text-gray-500">
              Date: {new Date(note.date).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setNewItem(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => {
                const product = products.find(p => p.id === item.productId);
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product?.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {newItem && (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <select
                      value={currentItem.productId}
                      onChange={(e) => setCurrentItem({ ...currentItem, productId: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {products.find(p => p.id === currentItem.productId)?.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="number"
                      min="1"
                      value={currentItem.quantity}
                      onChange={(e) => setCurrentItem({ ...currentItem, quantity: parseInt(e.target.value) })}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={handleAddItem}
                      className="text-green-500 hover:text-green-700"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientNoteDetails;