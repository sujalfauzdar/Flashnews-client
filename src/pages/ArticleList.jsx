import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: "#0A1F44",
        borderColor: state.isFocused ? "#1E40AF" : "#374151",
        color: "#ffffff",
        "&:hover": {
            borderColor: "#1E40AF",
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: "#0A1F44",
        color: "#ffffff",
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#1E40AF" : "#0A1F44",
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#1E3A8A",
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: "#ffffff",
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: "#1E40AF",
        color: "#ffffff",
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: "#ffffff",
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: "#ffffff",
        "&:hover": {
            backgroundColor: "#991B1B",
            color: "#ffffff",
        },
    }),
};

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedStates, setSelectedStates] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isFilterSortOpen, setIsFilterSortOpen] = useState(false);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const [articlesRes, statesRes, citiesRes, categoriesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/articles`),
                    axios.get(`${import.meta.env.VITE_API_URL}/articles/states`),
                    axios.get(`${import.meta.env.VITE_API_URL}/articles/cities`),
                    axios.get(`${import.meta.env.VITE_API_URL}/articles/categories`),
                ]);
                setArticles(articlesRes.data);
                setFilteredArticles(articlesRes.data);
                setStates(statesRes.data.map(state => ({ value: state, label: state })));
                setCities(citiesRes.data.map(city => ({ value: city, label: city })));
                setCategories(categoriesRes.data.map(category => ({ value: category, label: category })));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching (success or failure)
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterAndSortArticles = () => {
            let result = [...articles];
            if (searchQuery.trim()) {
                result = result.filter(article =>
                    article.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            if (selectedStates.length > 0) {
                const stateValues = selectedStates.map(s => s.value);
                result = result.filter(article => stateValues.includes(article.state));
            }
            if (selectedCities.length > 0) {
                const cityValues = selectedCities.map(c => c.value);
                result = result.filter(article => cityValues.includes(article.city));
            }
            if (selectedCategories.length > 0) {
                const categoryValues = selectedCategories.map(c => c.value);
                result = result.filter(article => categoryValues.includes(article.category));
            }
            result.sort((a, b) => {
                const dateA = new Date(a.publishedAt);
                const dateB = new Date(b.publishedAt);
                return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            });
            setFilteredArticles(result);
        };
        filterAndSortArticles();
    }, [selectedStates, selectedCities, selectedCategories, searchQuery, sortOrder, articles]);

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { 
                duration: 0.5, 
                ease: 'easeOut', 
                type: 'spring', 
                stiffness: 100, 
                damping: 15 
            } 
        },
    };

    // Loading State with Colorful SVG
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

    return (
        <div className="p-4 bg-[#121212] text-[#FFFFFF]">
            {/* Search and Filter/Sort Section */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles by title..."
                        className="w-full p-2 border border-[#374151] rounded bg-[#0A1F44] text-[#FFFFFF] focus:border-[#1E40AF] focus:outline-none"
                    />
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsFilterSortOpen(!isFilterSortOpen)}
                        className="focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6 text-[#FFFFFF]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 4h13M3 8h9M3 12h6m-6 4h13M21 8l-4 4m0 0l-4-4m4 4V4m0 12l-4-4m4 4l-4 4"
                            />
                        </svg>
                    </button>
                    {isFilterSortOpen && (
                        <div className="absolute top-10 right-0 bg-[#0A1F44] text-[#FFFFFF] rounded-md shadow-lg p-4 w-64 z-10">
                            <div className="mb-2">
                                <p className="text-sm font-medium mb-1">Sort by Date</p>
                                <button
                                    onClick={() => setSortOrder('desc')}
                                    className={`block w-full text-left p-2 hover:bg-[#1E3A8A] ${sortOrder === 'desc' ? 'bg-[#1E40AF]' : ''}`}
                                >
                                    Newest First
                                </button>
                                <button
                                    onClick={() => setSortOrder('asc')}
                                    className={`block w-full text-left p-2 hover:bg-[#1E3A8A] ${sortOrder === 'asc' ? 'bg-[#1E40AF]' : ''}`}
                                >
                                    Oldest First
                                </button>
                            </div>
                            <div className="mb-2">
                                <p className="text-sm font-medium mb-1">Filter by State</p>
                                <Select
                                    isMulti
                                    options={states}
                                    value={selectedStates}
                                    onChange={setSelectedStates}
                                    placeholder="States..."
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                />
                            </div>
                            <div className="mb-2">
                                <p className="text-sm font-medium mb-1">Filter by City</p>
                                <Select
                                    isMulti
                                    options={cities}
                                    value={selectedCities}
                                    onChange={setSelectedCities}
                                    placeholder="Cities..."
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-1">Filter by Category</p>
                                <Select
                                    isMulti
                                    options={categories}
                                    value={selectedCategories}
                                    onChange={setSelectedCategories}
                                    placeholder="Categories..."
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    styles={customStyles}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Article List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <motion.div
                            key={article._id}
                            className="bg-[#1E1E1E] shadow-md rounded p-4 relative"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2
                                className="text-xl font-extrabold text-[#FF4500]"
                                style={{ fontFamily: "'Lora', sans-serif" }}
                            >
                                {article.title},
                                <span className="text-md text-white font-normal"> {article.city}, {article.state}</span>
                            </h2>
                            {article.imageUrl && (
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="rounded-lg mt-2"
                                />
                            )}
                            <p className="text-sm text-gray-400 absolute bottom-2 right-2">
                                {new Date(article.publishedAt).toLocaleDateString()}
                            </p>
                            <Link
                                to={`/articles/${article._id}`}
                                className="text-blue-500 hover:underline mt-2 inline-block"
                            >
                                Read More
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">
                        No articles match your filters.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ArticleList;