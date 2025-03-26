import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ArticleForm = () => {
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: '',
        content: '',
        category: '',
        state: '',
        city: '',
        author: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', article);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/articles`, article, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response from server:', response.data);
            alert('Article added successfully!');
            setArticle({
                title: '',
                content: '',
                category: '',
                state: '',
                city: '',
                author: '',
                imageUrl: '',
            });
        } catch (error) {
            console.error('Error adding article:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            alert('Failed to add article: ' + (error.response?.data?.error || error.message));
        }
    };

    // Animation Variants
    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.6, 
                ease: 'easeOut', 
                staggerChildren: 0.1 
            } 
        },
    };

    const inputVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
                duration: 0.4, 
                ease: 'easeOut' 
            } 
        },
        focus: { 
            scale: 1.02, 
            boxShadow: '0 0 10px rgba(173, 216, 230, 0.5)', 
            borderColor: '#ADD8E6',
            transition: { duration: 0.3 } 
        },
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { 
            scale: 1.05, 
            backgroundColor: '#ADD8E6', 
            color: '#001F3F', 
            transition: { duration: 0.3 } 
        },
        tap: { scale: 0.98, transition: { duration: 0.1 } },
    };

    return (
        <div className="min-h-screen bg-[#121212] p-4 lg:p-8 relative">
                       <button
                onClick={() => navigate('/articles')}
                className="absolute top-4 left-4 flex items-center hover:text-[#00FFFF] text-[#FF4500] transition-colors duration-300"
            >
                <svg
                    className="w-8 h-8 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                <span className="text-sm font-semibold">Read Articles</span>
            </button> 
            <motion.form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6  rounded-lg shadow-lg shadow-[#80CBC4]/20 text-[#748AA1] 
                           sm:max-w-lg md:max-w-xl lg:max-w-6xl xl:max-w-8xl"
                variants={formVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="space-y-6">
                    {/* Title */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                            <svg className="w-5 h-5 mr-2 text-[#ADD8E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
                            </svg>
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={article.title}
                            onChange={handleChange}
                            placeholder="Enter article title"
                            className="w-full p-3 bg-[#000000] border border-[#2A3A5A] rounded focus:outline-none text-[#FFFFFF] placeholder-gray-500"
                            required
                            whileFocus="focus"
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="content" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                            <svg className="w-5 h-5 mr-2 text-[#ADD8E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Content
                        </label>
                        <textarea
                            name="content"
                            value={article.content}
                            onChange={handleChange}
                            placeholder="Write your article content"
                            className="w-full p-3 bg-[#000000] border border-[#2A3A5A] rounded focus:outline-none text-[#FFFFFF] placeholder-gray-500 h-40 resize-y"
                            required
                            whileFocus="focus"
                        />
                    </motion.div>

                    {/* Category */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="category" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                            <svg className="w-5 h-5 mr-2 text-[#ADD8E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18M3 6h18M3 18h18" />
                            </svg>
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={article.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            className="w-full p-3 bg-[#000000] border border-[#2A3A5A] rounded focus:outline-none text-[#FFFFFF] placeholder-gray-500"
                            required
                            whileFocus="focus"
                        />
                    </motion.div>

                    {/* State */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="state" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                            <svg className="w-5 h-5 mr-2 text-[#ADD8E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            State
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={article.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                            className="w-full p-3 bg-[#000000] border border-[#2A3A5A] rounded focus:outline-none text-[#FFFFFF] placeholder-gray-500"
                            required
                            whileFocus="focus"
                        />
                    </motion.div>

                    {/* City */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="city" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                            <svg className="w-5 h-5 mr-2 text-[#ADD8E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={article.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            className="w-full p-3 bg-[#000000] border border-[#2A3A5A] rounded focus:outline-none text-[#FFFFFF] placeholder-gray-500"
                            required
                            whileFocus="focus"
                        />
                    </motion.div>

                    {/* Author */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="author" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                            <svg className="w-5 h-5 mr-2 text-[#ADD8E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={article.author}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            className="w-full p-3 bg-[#000000] border border-[#2A3A5A] rounded focus:outline-none text-[#FFFFFF] placeholder-gray-500"
                            required
                            whileFocus="focus"
                        />
                    </motion.div>

                    {/* Image URL */}
                    <motion.div className="relative" variants={inputVariants}>
                        <label htmlFor="imageUrl" className="flex items-center text-sm font-medium text-gray-300 mb-1">
                            <svg className="w-5 h-5 mr-2 text-[#ADD8E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Image URL (optional)
                        </label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={article.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            className="w-full p-3 bg-[#000000] border border-[#2A3A5A] rounded focus:outline-none text-[#FFFFFF] placeholder-gray-500"
                            whileFocus="focus"
                        />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        className="w-full bg-[#FF4500] text-white py-3 rounded-full font-semibold"
                        variants={buttonVariants}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Add Article
                    </motion.button>
                </div>
            </motion.form>
        </div>
    );
};

export default ArticleForm;