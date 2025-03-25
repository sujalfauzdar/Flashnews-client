import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInEmail = localStorage.getItem('email'); // Get logged-in user's email

        // Check if entered email matches logged-in email
        if (formData.email !== loggedInEmail) {
            alert('Failed: Email must match your logged-in email.');
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token for auth
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
            alert('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message: ' + (error.response?.data?.error || error.message));
        }
    };

    // Animation Variants
    const headerVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const formVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
    };

    const inputVariants = {
        rest: { scale: 1 },
        focus: { scale: 1.02, boxShadow: '0 0 15px #00FFFF', transition: { duration: 0.3 } },
    };

    const buttonVariants = {
        rest: { scale: 1, rotate: 0 },
        hover: { rotate: 5, scale: 1.05, transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    const infoVariants = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <div className="min-h-screen bg-[#121212] text-[#FFFFFF] p-6 overflow-hidden">
            <motion.div
                className="text-center mb-12"
                variants={headerVariants}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-5xl font-bold text-[#00FFFF] tracking-wide">Contact Us</h1>
                <p className="text-lg text-[#FF4500] mt-2 font-semibold">
                    Got a scoop, question, or feedback? We’re all ears!
                </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-12">
                <motion.section
                    className="bg-[#0A1F44] p-6 rounded-lg shadow-lg shadow-[#00FFFF]/30 hover:shadow-[#00FFFF]/50 transition-shadow duration-300"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-3xl font-bold text-[#00FFFF] mb-4">Send Us a Message</h2>
                    <p className="text-gray-300 mb-6">
                        Whether it’s a hot tip, a feature request,Got a question or a problem? Let us know, and we’ll fix it!
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <motion.div variants={inputVariants} initial="rest" whileFocus="focus">
                            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                                <svg
                                    className="w-5 h-5 text-[#00FFFF] mr-2"
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
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none"
                                required
                            />
                        </motion.div>

                        {/* Email Field */}
                        <motion.div variants={inputVariants} initial="rest" whileFocus="focus">
                            <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                                <svg
                                    className="w-5 h-5 text-[#00FFFF] mr-2"
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
                                Your Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none"
                                required
                            />
                        </motion.div>

                        {/* Message Field */}
                        <motion.div variants={inputVariants} initial="rest" whileFocus="focus">
                            <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                                <svg
                                    className="w-5 h-5 text-[#00FFFF] mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                    />
                                </svg>
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Enter your Query"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none h-32 resize-none"
                                required
                            />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={buttonVariants} initial="rest" whileHover="hover">
                            <button
                                type="submit"
                                className="w-full bg-[#FF4500] text-white px-6 py-3 rounded-full hover:bg-[#00FFFF] hover:text-[#0A1F44] transition-all duration-300 font-semibold"
                            >
                                Send Message
                            </button>
                        </motion.div>
                    </form>
                </motion.section>

                <motion.section
                    className="bg-[#0A1F44] p-6 rounded-lg shadow-lg shadow-[#FF4500]/30 hover:shadow-[#FF4500]/50 transition-shadow duration-300"
                    variants={infoVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-[#FF4500] mb-4">Get in Touch</h2>
                    <p className="text-gray-300 mb-6">
                        We’re here to keep the news flowing and your voice heard. Reach out anytime!
                    </p>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">✉️</span>
                            <span><strong>Email:</strong> karanfauzdar442@gmail.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">📞</span>
                            <span><strong>Phone:</strong> +91 9414025728</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-[#00FFFF]">📍</span>
                            <span><strong>Address:</strong> Near narsing mandir, santar road, Dhaulpur 328001</span>
                        </li>
                    </ul>
                </motion.section>
            </div>

            <motion.div
                className="text-center mt-12 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                Built with hardwork by the FlashNews | Let’s keep the conversation alive!
            </motion.div>
        </div>
    );
};

export default ContactUs;