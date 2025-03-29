import React, { useMemo } from 'react';
import { useStore } from '../store';
import { DataTable } from '../components/ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { StockLevel } from '../types';

const Dashboard = () => {
  const stockLevels = useStore((state) => state.getStockLevels());

  const columns = useMemo<ColumnDef<StockLevel>[]>(
    () => [
      {
        accessorKey: 'productName',
        header: 'Product',
      },
      {
        accessorKey: 'sku',
        header: 'SKU',
      },
      {
        accessorKey: 'currentStock',
        header: 'Current Stock',
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Current Stock Levels</h2>
        <DataTable columns={columns} data={stockLevels} />
      </div>
    </div>
  );
};

export default Dashboard;