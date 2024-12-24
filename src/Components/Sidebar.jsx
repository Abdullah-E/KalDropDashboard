
import React from 'react';
import { Settings, Package, CreditCard, Upload, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    

    return (
        <div className="w-64 bg-white shadow-lg">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold">Noar Academy</h1>
            </div>
            
            <nav className="p-4">
                <div className="space-y-2">
                    <Link to="/" className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg">
                        <LayoutDashboard className="w-5 h-5 mr-3" />
                        Dashboard
                    </Link>
                    <Link to="/orders" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Orders
                    </Link>
                    <Link to="/products" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Products
                    </Link>
                    <Link to="/uploader-settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Upload className="w-5 h-5 mr-3" />
                        Uploader Settings
                    </Link>
                    <Link to="/billing" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <CreditCard className="w-5 h-5 mr-3" />
                        Billing
                    </Link>
                    <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;