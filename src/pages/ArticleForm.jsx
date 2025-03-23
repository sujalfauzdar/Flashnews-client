import { useState } from 'react';
import axios from 'axios';

const ArticleForm = () => {
    const [article, setArticle] = useState({
        title: '',
        content: '',
        category: '',
        state: '', // Lowercase to match schema
        city: '',  // Lowercase to match schema
        author: '',
        imageUrl: ''
    });

    const handleChange = (e) => {
        setArticle({ ...article, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', article); // Log the exact data being sent

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/articles`, article, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response from server:', response.data); // Log success response
            alert('Article added successfully!');
            // Optional: Reset form after success
            setArticle({
                title: '',
                content: '',
                category: '',
                state: '',
                city: '',
                author: '',
                imageUrl: ''
            });
        } catch (error) {
            console.error('Error adding article:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            alert('Failed to add article: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded bg-white shadow-md">
            <input
                type="text"
                name="title"
                value={article.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <textarea
                name="content"
                value={article.content}
                onChange={handleChange}
                placeholder="Content"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="text"
                name="category"
                value={article.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="text"
                name="state" // Changed from "State" to lowercase
                value={article.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="text"
                name="city" // Changed from "City" to lowercase
                value={article.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="text"
                name="author"
                value={article.author}
                onChange={handleChange}
                placeholder="Author"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="text"
                name="imageUrl"
                value={article.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full p-2 border rounded mb-2"
            />
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Add Article
            </button>
        </form>
    );
};

export default ArticleForm;