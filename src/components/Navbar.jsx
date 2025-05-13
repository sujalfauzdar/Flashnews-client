import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { assets } from '../assets/assets.js';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const token = localStorage.getItem('token');
    const popupRef = useRef(null); // Ref to track the popup element

    let userDetails = { username: 'Guest', email: 'N/A', role: 'N/A' };

    if (token) {
        try {
            const decoded = jwtDecode(token);
            userDetails = {
                username: localStorage.getItem('username') || decoded.username || decoded.sub || 'Guest',
                email: localStorage.getItem('email') || decoded.email || 'N/A',
                role: localStorage.getItem('role') || decoded.role || 'N/A'
            };
            console.log('User Details:', userDetails);
        } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        setIsOpen(false);
        navigate('/');
    };

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on unmount or when isOpen changes
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="text-[#00C2FF] p-4 flex justify-between items-center shadow-md shadow-[#0A1F44]">
            {/* Left Side: User Icon */}
            <div className="relative flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none bg-white rounded-full w-12 h-12 p-3"
                >
                    <svg
                        className="w-7 h-7 text-[#FF4500]"
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
                </button>
                {isOpen && token && (
                    <div
                        ref={popupRef} // Attach ref to the popup
                        className="absolute top-12 left-0 text-white bg-gray-950 rounded-md shadow-lg p-4 w-64 z-10"
                    >
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-medium">
                                Username: <span className="font-normal">{userDetails.username}</span>
                            </p>
                            <p className="text-sm font-medium">
                                Email: <span className="font-normal">{userDetails.email}</span>
                            </p>
                            <p className="text-sm font-medium">
                                Role: <span className="font-normal">{userDetails.role}</span>
                            </p>
                            {userDetails.role === 'Admin' && (
                                <button
                                    onClick={() => navigate('/add')}
                                    className="mt-2 bg-[#0A1F44] text-white px-3 py-1 rounded hover:bg-purple-800 transition duration-200"
                                >
                                    Add Article
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="mt-2 bg-[#0A1F44] text-white px-3 py-1 rounded hover:bg-purple-800 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Centered Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <img
                    src={assets.logo}
                    alt="logo"
                    style={{ width: '192px', height: '44px' }}
                />
            </div>

            {/* Right Side: Navigation Links */}
            <div className="flex items-center gap-4">
                {/* Home */}
                <button
                    onClick={() => navigate('/articles')}
                    className={`flex flex-col items-center ${location.pathname === '/articles' ? 'text-[#00FFFF] underline underline-offset-4' : ''}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                    <span className="hidden lg:block text-sm mt-1">Home</span>
                </button>

                {/* About Us */}
                <button
                    onClick={() => navigate('/about')}
                    className={`flex flex-col items-center ${location.pathname === '/about' ? 'text-[#00FFFF] underline underline-offset-4' : ''}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="hidden lg:block text-sm mt-1">About Us</span>
                </button>

                {/* Contact Us */}
                <button
                    onClick={() => navigate('/contact')}
                    className={`flex flex-col items-center ${location.pathname === '/contact' ? 'text-[#00FFFF] underline underline-offset-4' : ''}`}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                    <span className="hidden lg:block text-sm mt-1">Contact Us</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;