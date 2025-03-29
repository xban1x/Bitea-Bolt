import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Tags, 
  Truck as TruckLoading, 
  Warehouse,
  Database,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const [isMasterDataOpen, setIsMasterDataOpen] = useState(false);

  const mainNavItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/customers', icon: Users, label: 'Customers' },
    { to: '/price-lists', icon: Tags, label: 'Price Lists' },
    { to: '/delivery-notes', icon: TruckLoading, label: 'Delivery Notes' },
    { to: '/recipient-notes', icon: Warehouse, label: 'Recipient Notes' },
  ];

  const masterDataItems = [
    { to: '/master-data/manufacturers', icon: Database, label: 'Manufacturers' },
    { to: '/master-data/product-types', icon: Database, label: 'Product Types' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Pro</h1>
      </div>
      <nav className="mt-6">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Master Data Section */}
        <div className="mt-4">
          <button
            onClick={() => setIsMasterDataOpen(!isMasterDataOpen)}
            className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100"
          >
            <Database className="w-5 h-5 mr-3" />
            <span>Master Data</span>
            {isMasterDataOpen ? (
              <ChevronDown className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-auto" />
            )}
          </button>
          {isMasterDataOpen && (
            <div className="bg-gray-50">
              {masterDataItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 pl-12 ${
                      isActive ? 'bg-gray-100 border-r-4 border-blue-500' : ''
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;