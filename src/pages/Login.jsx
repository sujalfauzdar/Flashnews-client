import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data._id || response.data.id);
            localStorage.setItem('username', response.data.username || 'Guest');
            localStorage.setItem('email', response.data.email || formData.email);
            localStorage.setItem('role', response.data.role || 'Reader');
            alert('Login successful!');
            navigate('/articles');
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed');
        }
    };

    // Animation Variants
    const formVariants = {
        hidden: { 
            opacity: 0, 
            y: '100vh' // Starts from below the viewport
        },
        visible: { 
            opacity: 1, 
            y: 0, // Moves up to centered position
            transition: { 
                duration: 0.8, 
                ease: 'easeOut', 
                type: 'spring', 
                stiffness: 80, 
                damping: 15 
            } 
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-white">
            <motion.div
                className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-lg"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex items-center justify-center mb-6">
                    <svg
                        className="w-8 h-8 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-300">Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
                            <svg
                                className="w-5 h-5 text-gray-300 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label className="flex items-center text-sm font-medium text-gray-500 mb-1">
                            <svg
                                className="w-5 h-5 text-gray-300 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2c0 .738.402 1.376 1 1.723V15a1 1 0 001 1h2a1 1 0 001-1v-2.277c.598-.347 1-.985 1-1.723zm9-2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h1V5a4 4 0 018 0v2h1a2 2 0 012 2z"
                                />
                            </svg>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Login
                    </button>
                    <p className="text-center text-sm text-gray-400">
                        Don’t have an account?{' '}
                        <Link to="/signup" className="text-green-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;