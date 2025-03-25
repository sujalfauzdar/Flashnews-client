import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Reader'
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', formData.username);
                localStorage.setItem('email', formData.email);
                localStorage.setItem('role', formData.role);
            }
            alert('Signup successful!');
            navigate('/articles');
        } catch (error) {
            alert(error.response?.data?.error || 'Signup failed');
        }
    };

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

    // Rest of the component remains the same
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-white">
            <motion.div 
            className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-lg"
            variants={formVariants}
            initial="hidden"
            animate="visible">
                <div className="flex items-center justify-center mb-6">
                    <svg
                        className="w-8 h-8 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-300">Signup</h2>
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
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM12 5a7 7 0 00-7 7c0 1.657.579 3.182 1.541 4.392"
                                />
                            </svg>
                            Role
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Reader">Reader</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Signup
                    </button>
                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Signup;