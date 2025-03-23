import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

    if (loading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (!article) {
        return <div className="text-center p-4">Article not found</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
            {article.imageUrl && (
                <img src={article.imageUrl} alt="Article" className="w-full rounded-lg mb-4" />
            )}
            <p className="text-gray-700 mb-4">{article.content}</p>
            <p className="text-sm text-gray-500">Category: {article.category}</p>
            <p className="text-sm text-gray-500">State: {article.state}</p>    {/* Added State */}
            <p className="text-sm text-gray-500">City: {article.city}</p>      {/* Added City */}
            <p className="text-sm text-gray-500">Author: {article.author}</p>
            <p className="text-sm text-gray-500">
                Published: {new Date(article.publishedAt).toLocaleDateString()}
            </p>
        </div>
    );
};

export default ArticleDetail;