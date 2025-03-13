import React from 'react';
import { Settings, Package, CreditCard, Upload, LayoutDashboard, ShoppingCart, GraduationCap, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from '../providers/supabaseAuth';
import Vendra from '../assets/Vendra.png';
import { motion } from 'framer-motion';

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
        { to: '/academy', icon: GraduationCap, label: 'Academy' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-72 bg-gradient-to-br from-[#F9FBFF] to-[#e9e9e9] shadow-lg flex flex-col h-4/4 text-[#e8f1ff] border-r border-[#e5eaf3]"
        >
            {/* Logo Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 flex justify-center"
            >
                <img src={Vendra} alt="Vendra" className="w-48" />
            </motion.div>

            {/* Navigation Links */}
            <nav className="p-6 flex-1">
                <div className="space-y-3">
                    {menuItems.map(({ to, icon: Icon, label }) => (
                        <motion.div
                            key={to}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to={to}
                                className={`flex items-center px-5 py-4 rounded-lg transition duration-200 text-lg ${
                                    location.pathname === to
                                        ? 'bg-[#4f6ed3] text-white font-semibold' // Active Link
                                        : 'hover:bg-white text-black hover:text-[#3E6FED]'
                                }`}
                            >
                                <Icon className="w-6 h-6 mr-4" />
                                <span>{label}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </nav>

            {/* Sign Out Button */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-6"
            >
                <button
                    onClick={handleSignOut}
                    className="flex items-center px-5 py-4 bg-[#c53030] hover:bg-[#9b2c2c] rounded-lg w-full transition duration-200 text-white text-lg"
                >
                    <LogOut className="w-6 h-6 mr-4" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Sidebar;
