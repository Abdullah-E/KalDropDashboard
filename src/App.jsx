import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Sidebar from './Components/Sidebar'
import Orders from './pages/Orders'
import Supplier from './pages/Supplier'
import Products from './pages/Products'
import Billing from './pages/Billing'
import EditProduct from './pages/EditProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className='flex h-screen'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/uploader-settings" element={<Supplier />} />
          <Route path="/products" element={<Products />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
