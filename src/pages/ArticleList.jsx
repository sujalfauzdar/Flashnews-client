import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';

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
    const [sortOrder, setSortOrder] = useState('desc'); // Default: newest first

    // Fetch articles, states, cities, and categories on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [articlesRes, statesRes, citiesRes, categoriesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/articles`),
                    axios.get(`${import.meta.env.VITE_API_URL}/articles/states`),
                    axios.get(`${import.meta.env.VITE_API_URL}/articles/cities`),
                    axios.get(`${import.meta.env.VITE_API_URL}/articles/categories`) // New endpoint
                ]);
                setArticles(articlesRes.data);
                setFilteredArticles(articlesRes.data); // Initially show all articles
                setStates(statesRes.data.map(state => ({ value: state, label: state })));
                setCities(citiesRes.data.map(city => ({ value: city, label: city })));
                setCategories(categoriesRes.data.map(category => ({ value: category, label: category })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    // Filter and sort articles when selections or search changes
    useEffect(() => {
        const filterAndSortArticles = () => {
            let result = [...articles]; // Create a copy to avoid mutating original array

            // Apply search filter by title
            if (searchQuery.trim()) {
                result = result.filter(article =>
                    article.title.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }

            // Apply state filter
            if (selectedStates.length > 0) {
                const stateValues = selectedStates.map(s => s.value);
                result = result.filter(article => stateValues.includes(article.state));
            }

            // Apply city filter
            if (selectedCities.length > 0) {
                const cityValues = selectedCities.map(c => c.value);
                result = result.filter(article => cityValues.includes(article.city));
            }

            // Apply category filter
            if (selectedCategories.length > 0) {
                const categoryValues = selectedCategories.map(c => c.value);
                result = result.filter(article => categoryValues.includes(article.category));
            }

            // Sort by date
            result.sort((a, b) => {
                const dateA = new Date(a.publishedAt);
                const dateB = new Date(b.publishedAt);
                return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            });

            setFilteredArticles(result);
        };
        filterAndSortArticles();
    }, [selectedStates, selectedCities, selectedCategories, searchQuery, sortOrder, articles]);

    return (
        <div className="p-4">
            {/* Search and Sort Section */}
            <div className="mb-6 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Search by Title</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search articles..."
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort by Date</label>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by State</label>
                        <Select
                            isMulti
                            options={states}
                            value={selectedStates}
                            onChange={setSelectedStates}
                            placeholder="Select states..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by City</label>
                        <Select
                            isMulti
                            options={cities}
                            value={selectedCities}
                            onChange={setSelectedCities}
                            placeholder="Select cities..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category</label>
                        <Select
                            isMulti
                            options={categories}
                            value={selectedCategories}
                            onChange={setSelectedCategories}
                            placeholder="Select categories..."
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </div>
                </div>
            </div>

            {/* Article List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map(article => (
                        <div key={article._id} className="bg-white shadow-md rounded p-4">
                            <h2 className="text-lg font-bold">{article.title}</h2>
                            <p className="text-sm text-gray-500">Category: {article.category}</p>
                            <p className="text-sm text-gray-500">State: {article.state}</p>
                            <p className="text-sm text-gray-500">City: {article.city}</p>
                            <p className="text-sm text-gray-500">
                                Published: {new Date(article.publishedAt).toLocaleDateString()}
                            </p>
                            {article.imageUrl && (
                                <img
                                    src={article.imageUrl}
                                    alt={article.title}
                                    className="rounded-lg mt-2 "
                                />
                            )}
                            <Link
                                to={`/articles/${article._id}`}
                                className="text-blue-500 hover:underline mt-2 inline-block"
                            >
                                Read More
                            </Link>
                        </div>
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