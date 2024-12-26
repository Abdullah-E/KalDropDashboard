import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Sidebar from './Components/Sidebar'
import Orders from './pages/Orders'
import Supplier from './pages/Supplier'
import Products from './pages/Products'
import Billing from './pages/Billing'
import EditProduct from './pages/EditProduct'
import Login from './pages/Login'
import ProtectedRoute from './Components/ProtectedRoute'

// Layout component for the protected routes
const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/uploader-settings" element={<Supplier />} />
          <Route path="/products" element={<Products />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/billing" element={<Billing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App