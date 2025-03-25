import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Animation Variants
    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut',
                staggerChildren: 0.2
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.footer
            className="bg-[#0A1F44] text-[#FFFFFF] py-8 px-6 mt-12"
            variants={footerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Section */}
                <motion.div variants={itemVariants}>
                    <h3 className="text-2xl font-bold text-[#00FFFF] mb-4">FlashNews</h3>
                    <p className="text-gray-300 text-sm">
                        Keeping you updated with the latest news, anytime, anywhere.
                    </p>
                </motion.div>

                {/* Navigation Links */}
                <motion.div variants={itemVariants}>
                    <h4 className="text-lg font-semibold text-[#FF4500] mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>
                            <Link to="/articles" className="hover:text-[#00FFFF] transition-colors duration-300">
                                Articles
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-[#00FFFF] transition-colors duration-300">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-[#00FFFF] transition-colors duration-300">
                                Contact Us
                            </Link>
                        </li>
                        {localStorage.getItem('role') === 'Admin' && (
                            <li>
                                <Link to="/add" className="hover:text-[#00FFFF] transition-colors duration-300">
                                    Add Article
                                </Link>
                            </li>
                        )}
                    </ul>
                </motion.div>

                {/* Social Media & Contact */}
                <motion.div variants={itemVariants}>
                    <h4 className="text-lg font-semibold text-[#FF4500] mb-4">Connect With Us</h4>
                    <div className="flex space-x-4 mb-4">
                        {/* Social Media SVGs */}
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.04c-5.5 0-10 4.5-10 10 0 4.99 3.66 9.13 8.44 9.88v-6.98h-2.54v-2.9h2.54v-2.2c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.78-1.64 1.58v1.82h2.8l-.45 2.9h-2.35v6.98c4.78-.75 8.44-4.89 8.44-9.88 0-5.5-4.5-10-10-10z" />
                            </svg>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#00FFFF] hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" strokeWidth="2" />
        <circle cx="18" cy="6" r="1" strokeWidth="2" />
    </svg>
                        </a>
                    </div>
                    <p className="text-gray-300 text-sm">
                        <strong>Email:</strong> karanfauzdar442@gmail.com
                    </p>
                    <p className="text-gray-300 text-sm">
                        <strong>Phone:</strong> +91 9414025728
                    </p>
                </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
                className="text-center mt-8 text-gray-400 text-sm border-t border-[#374151] pt-4"
                variants={itemVariants}
            >
                &copy; {new Date().getFullYear()} FlashNews. All rights reserved.
            </motion.div>
        </motion.footer>
    );
};

export default Footer;