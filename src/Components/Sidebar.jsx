import React from 'react';
import { Settings, Package, CreditCard, Upload, LayoutDashboard, ShoppingCart, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../providers/supabaseAuth';
import Vendra from '../assets/Vendra.jpg';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="w-64 bg-white shadow-lg flex flex-col h-full">
            <div className="p-4 border-b">
                <img src={Vendra} alt="Vendra" className='w-40' />
            </div>
            
            <nav className="p-4 flex-1">
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

            {/* Sign Out Button at bottom */}
            <div className="p-4 border-t">
                <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;