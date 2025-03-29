import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OverlayProvider } from '@react-aria/overlays';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import PriceLists from './pages/PriceLists';
import DeliveryNotes from './pages/DeliveryNotes';
import RecipientNotes from './pages/RecipientNotes';
import RecipientNoteDetails from './pages/RecipientNoteDetails';
import Manufacturers from './pages/master-data/Manufacturers';
import ProductTypes from './pages/master-data/ProductTypes';

function App() {
  return (
    <OverlayProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/price-lists" element={<PriceLists />} />
              <Route path="/delivery-notes" element={<DeliveryNotes />} />
              <Route path="/recipient-notes" element={<RecipientNotes />} />
              <Route path="/recipient-notes/:id" element={<RecipientNoteDetails />} />
              <Route path="/master-data/manufacturers" element={<Manufacturers />} />
              <Route path="/master-data/product-types" element={<ProductTypes />} />
            </Routes>
          </main>
        </div>
      </Router>
    </OverlayProvider>
  );
}

export default App;