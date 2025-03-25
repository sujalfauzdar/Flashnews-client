import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`);
                setArticle(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching article:', error);
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    // Animation Variants
    const headlineVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const metaVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
    };

    if (loading) {
        return (
            <div className="text-4xl text-center p-4 text-[#FFFFFF]">
                <svg
                    className="w-16 h-16 mx-auto mb-4 animate-spin"
                    viewBox="0 0 50 50"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        stroke="url(#gradient)"
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="90 150"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00FFFF" />
                            <stop offset="100%" stopColor="#FF4500" />
                        </linearGradient>
                    </defs>
                </svg>
                Loading...
            </div>
        );
    }

    if (!article) {
        return <div className="text-center p-4 text-[#FFFFFF]">Article not found</div>;
    }

    // Split title for red highlight (e.g., first 3 words)
    const titleParts = article.title.split(' ');
    const highlightedPart = titleParts.slice(0, 3).join(' ');
    const restOfTitle = titleParts.slice(3).join(' ');

    return (
        <div className="bg-[#121212] min-h-screen p-4 text-[#FFFFFF]">
            <div className="max-w-2xl mx-auto lg:max-w-6xl lg:flex lg:gap-6">
                {/* Large Screen Layout */}
                <div className="lg:flex-1">
                    <motion.h1
                        className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-2"
                        variants={headlineVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <span className="text-[#FF4500]">{highlightedPart}</span>{' '}
                        {restOfTitle}
                    </motion.h1>
                    <motion.p
                        className="text-sm text-gray-600 mb-6 lg:mb-4"
                        variants={metaVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {article.city} | {new Date(article.publishedAt).toLocaleDateString()}
                    </motion.p>

                    {/* Small/Medium Screen Image - Moved Above Metadata */}
                    {article.imageUrl && (
                        <motion.div
                            className="lg:hidden mb-4"
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full rounded-lg"
                            />
                        </motion.div>
                    )}

                    <motion.p
                        className="text-gray-100 mb-4 lg:text-lg"
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {article.content}
                    </motion.p>
                    <motion.div
                        className="space-y-2 text-sm text-gray-600"
                        variants={metaVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p>
                            Report by: <span className="text-[#1E90FF]">{article.author}</span>
                        </p>
                        <p>{article.state}</p>
                    </motion.div>
                </div>

                {/* Image for Large Screens */}
                {article.imageUrl && (
                    <motion.div
                        className="hidden lg:block lg:w-1/3"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-auto rounded-lg object-cover"
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ArticleDetail;