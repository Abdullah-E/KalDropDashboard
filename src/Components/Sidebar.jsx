import React from 'react';
import { Settings, Package, CreditCard, Upload, LayoutDashboard, ShoppingCart, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../providers/supabaseAuth';
import Vendra from '../assets/Vendra.png';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const menuItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/products', icon: ShoppingCart, label: 'Products' },
        { to: '/uploader-settings', icon: Upload, label: 'Uploader Settings' },
        { to: '/billing', icon: CreditCard, label: 'Billing' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="w-72 bg-gradient-to-br from-[#1a2b4d] to-[#2a4270] shadow-lg flex flex-col h-4/4 text-[#e8f1ff]">
            {/* Logo Section */}
            <div className="p-8 flex justify-center">
                <img src={Vendra} alt="Vendra" className="w-48" />
            </div>
            
            {/* Navigation Links */}
            <nav className="p-6 flex-1">
                <div className="space-y-3">
                    {menuItems.map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`flex items-center px-5 py-4 rounded-lg transition duration-200 text-lg ${
                                location.pathname === to
                                    ? 'bg-[#4f6ed3] text-white font-semibold' // Active Link
                                    : 'hover:bg-[#2a3f6d] text-[#c3d4f0] hover:text-white'
                            }`}
                        >
                            <Icon className="w-6 h-6 mr-4" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Sign Out Button */}
            <div className="p-6">
                <button
                    onClick={handleSignOut}
                    className="flex items-center px-5 py-4 bg-[#c53030] hover:bg-[#9b2c2c] rounded-lg w-full transition duration-200 text-white text-lg"
                >
                    <LogOut className="w-6 h-6 mr-4" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;