import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUpWithEmail } from '../providers/supabaseAuth';
import Vendra from '../assets/Vendra.png';
import { motion } from 'framer-motion';
import { Mail, Lock, User, MapPin } from 'lucide-react';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const country = e.target.country.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setIsLoading(false);
            return;
        }

        try {
            await signUpWithEmail(email, password, { first_name:firstName, last_name:lastName, email, country });
            navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <motion.img
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    src={Vendra}
                    alt="Vendra"
                    className="m-auto mb-6"
                />
                <h2 className="text-2xl font-normal text-center mb-6">CREATE ACCOUNT</h2>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
                    >
                        {error}
                    </motion.div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-light text-gray-700">
                            First Name
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                id="firstName"
                                required
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your first name"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-light text-gray-700">
                            Last Name
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                id="lastName"
                                required
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your last name"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-light text-gray-700">
                            Country
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                id="country"
                                required
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your country"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MapPin className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-light text-gray-700">
                            Email
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                id="email"
                                required
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-light text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="password"
                                id="password"
                                required
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Create a password"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-light text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                type="password"
                                id="confirmPassword"
                                required
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 pl-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="Confirm your password"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-blue-600 px-4 py-2 text-black font-light hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </motion.button>
                </form>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-center text-sm text-gray-600"
                >
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700">
                        Sign in
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default SignUp;