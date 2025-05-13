import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [sameDayArticles, setSameDayArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedArticle, setUpdatedArticle] = useState({
        title: '',
        content: '',
        imageUrl: '',
        state: '',
        city: '',
    });
    const [replyText, setReplyText] = useState({});
    const [showReplyForm, setShowReplyForm] = useState({});
    const [editCommentText, setEditCommentText] = useState({});
    const [editReplyText, setEditReplyText] = useState({});
    const [isEditingComment, setIsEditingComment] = useState({});
    const [isEditingReply, setIsEditingReply] = useState({});
    const [showReplies, setShowReplies] = useState({});

    useEffect(() => {
        const fetchArticleAndComments = async () => {
            try {
                const articleResponse = await axios.get(`${import.meta.env.VITE_API_URL}/articles/${id}`);
                setArticle(articleResponse.data);
                setUpdatedArticle({
                    title: articleResponse.data.title,
                    content: articleResponse.data.content,
                    imageUrl: articleResponse.data.imageUrl || '',
                    state: articleResponse.data.state,
                    city: articleResponse.data.city,
                });

                const commentsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/comments/article/${id}`);
                setComments(commentsResponse.data);

                const articleDate = new Date(articleResponse.data.publishedAt).toISOString().split('T')[0];
                const sameDayResponse = await axios.get(`${import.meta.env.VITE_API_URL}/articles?date=${articleDate}`);
                const filteredArticles = sameDayResponse.data
                    .filter((a) => a._id !== id)
                    .slice(0, 10);
                setSameDayArticles(filteredArticles);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching article, comments, or same-day articles:', error);
                setLoading(false);
            }
        };
        fetchArticleAndComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/comments`,
                { article: id, text: newComment },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setComments(comments.filter((comment) => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleReplySubmit = async (commentId, e) => {
        e.preventDefault();
        const text = replyText[commentId];
        if (!text?.trim()) return;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/comments/${commentId}/reply`,
                { text },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setComments(comments.map(c => c._id === commentId ? response.data : c));
            setReplyText({ ...replyText, [commentId]: '' });
            setShowReplyForm({ ...showReplyForm, [commentId]: false });
        } catch (error) {
            console.error('Error posting reply:', error);
            alert('Failed to post reply: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleLikeComment = async (commentId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/comments/${commentId}/like`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setComments(comments.map(c => c._id === commentId ? response.data : c));
        } catch (error) {
            console.error('Error liking comment:', error);
            alert('Failed to like comment: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleDislikeComment = async (commentId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/comments/${commentId}/dislike`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setComments(comments.map(c => c._id === commentId ? response.data : c));
        } catch (error) {
            console.error('Error disliking comment:', error);
            alert('Failed to dislike comment: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleEditComment = async (commentId, e) => {
        e.preventDefault();
        const text = editCommentText[commentId];
        if (!text?.trim()) return;

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/comments/${commentId}`,
                { text },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setComments(comments.map(c => c._id === commentId ? response.data : c));
            setIsEditingComment({ ...isEditingComment, [commentId]: false });
        } catch (error) {
            console.error('Error editing comment:', error);
            alert('Failed to edit comment: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleEditReply = async (commentId, replyId, e) => {
        e.preventDefault();
        const text = editReplyText[replyId];
        if (!text?.trim()) return;

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/comments/${commentId}/reply/${replyId}`,
                { text },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setComments(comments.map(c => c._id === commentId ? response.data : c));
            setIsEditingReply({ ...isEditingReply, [replyId]: false });
        } catch (error) {
            console.error('Error editing reply:', error);
            alert('Failed to edit reply: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        if (!window.confirm('Are you sure you want to delete this reply?')) return;

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/comments/${commentId}/reply/${replyId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setComments(comments.map(c => c._id === commentId ? response.data : c));
        } catch (error) {
            console.error('Error deleting reply:', error);
            alert('Failed to delete reply: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleDeleteArticle = async () => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/articles/${id}`);
            alert('Article deleted successfully');
            navigate('/articles');
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Failed to delete article: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleUpdateArticle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/articles/${id}`,
                updatedArticle
            );
            setArticle(response.data);
            setIsEditing(false);
            alert('Article updated successfully');
        } catch (error) {
            console.error('Error updating article:', error);
            alert('Failed to update article: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleLikeArticle = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/articles/${id}/like`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setArticle(response.data.article);
        } catch (error) {
            console.error('Error liking article:', error);
            alert('Failed to like article: ' + (error.response?.data?.error || error.message));
        }
    };

    const handleDislikeArticle = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/articles/${id}/dislike`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setArticle(response.data.article);
        } catch (error) {
            console.error('Error disliking article:', error);
            alert('Failed to dislike article: ' + (error.response?.data?.error || error.message));
        }
    };

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

    const commentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    const formVariants = {
        rest: { scale: 1 },
        focus: { scale: 1.02, boxShadow: '0 0 15px #00FFFF', transition: { duration: 0.3 } },
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

    const titleParts = article.title.split(' ');
    const highlightedPart = titleParts.slice(0, 3).join(' ');
    const restOfTitle = titleParts.slice(3).join(' ');

    const loggedInUsername = localStorage.getItem('username');
    const isAuthor = article.author === loggedInUsername;
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className="bg-[#121212] min-h-screen p-4 text-[#FFFFFF] relative">
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
                <span className="text-sm font-semibold">Back to Articles</span>
            </button>

            <div className="max-w-2xl mx-auto lg:max-w-6xl lg:flex lg:gap-6">
                <div className="lg:flex-1 mt-12">
                    {isEditing ? (
                        <motion.form
                            onSubmit={handleUpdateArticle}
                            className="space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <input
                                type="text"
                                value={updatedArticle.title}
                                onChange={(e) => setUpdatedArticle({ ...updatedArticle, title: e.target.value })}
                                placeholder="Article Title"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none"
                                required
                            />
                            <textarea
                                value={updatedArticle.content}
                                onChange={(e) => setUpdatedArticle({ ...updatedArticle, content: e.target.value })}
                                placeholder="Article Content"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none h-32 resize-none"
                                required
                            />
                            <input
                                type="text"
                                value={updatedArticle.imageUrl}
                                onChange={(e) => setUpdatedArticle({ ...updatedArticle, imageUrl: e.target.value })}
                                placeholder="Image URL (optional)"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none"
                            />
                            <input
                                type="text"
                                value={updatedArticle.state}
                                onChange={(e) => setUpdatedArticle({ ...updatedArticle, state: e.target.value })}
                                placeholder="State"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none"
                                required
                            />
                            <input
                                type="text"
                                value={updatedArticle.city}
                                onChange={(e) => setUpdatedArticle({ ...updatedArticle, city: e.target.value })}
                                placeholder="City"
                                className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none"
                                required
                            />
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="bg-[#FF4500] text-white px-6 py-2 rounded hover:bg-[#00FFFF] hover:text-[#0A1F44] transition-all duration-300"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-500 transition-all duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <>
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

                            {article.imageUrl && (
                                <motion.div
                                    className="lg:hidden mb-4"
                                    variants={imageVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <img src={article.imageUrl} alt={article.title} className="w-full rounded-lg" />
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

                            <div className="mt-4 flex items-center gap-4">
                                <div className="flex items-center">
                                    <button
                                        onClick={handleLikeArticle}
                                        disabled={!isLoggedIn}
                                        className={`flex items-center gap-2 px-3 py-1 rounded ${isLoggedIn ? 'hover:text-[#00FFFF]' : 'opacity-50 cursor-not-allowed'}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-blue-500"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M1 21h4V9H1v12zM23 10c0-.55-.45-1-1-1h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2l-5 5V21h10c.55 0 1-.45 1-1v-6l1.29-1.29c.19-.18.29-.44.29-.71V10z" />
                                        </svg>
                                        <span>{article.likes.length}</span>
                                    </button>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={handleDislikeArticle}
                                        disabled={!isLoggedIn}
                                        className={`flex items-center gap-2 px-3 py-1 rounded ${isLoggedIn ? 'hover:text-[#FF4500]' : 'opacity-50 cursor-not-allowed'}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-red-500"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M23 3h-4v12h4V3zM1 13c0 .55.45 1 1 1h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 22l5-5V3H4c-.55 0-1 .45-1 1v6l-1.29 1.29c-.19-.18-.29-.44-.29-.71V13z" />
                                        </svg>
                                        <span>{article.dislikes.length}</span>
                                    </button>
                                </div>
                                {!isLoggedIn && (
                                    <span className="text-gray-400 text-sm">Log in to like/dislike</span>
                                )}
                            </div>

                            {isAuthor && (
                                <div className="mt-4 flex gap-4">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-[#1E90FF] text-white px-4 py-2 rounded hover:bg-[#00FFFF] transition-all duration-300"
                                    >
                                        Update Article
                                    </button>
                                    <button
                                        onClick={handleDeleteArticle}
                                        className="bg-[#FF4500] text-white px-4 py-2 rounded hover:bg-[#FF6347] transition-all duration-300"
                                    >
                                        Delete Article
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {article.imageUrl && !isEditing && (
                    <motion.div
                        className="hidden lg:block lg:w-1/3 mt-36"
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

            <div className="max-w-2xl mx-auto lg:max-w-6xl mt-12">
                <h2 className="text-2xl font-bold text-[#FF4500] mb-6 text-center">Comments</h2>

                <div
                    className="max-h-64 overflow-y-auto space-y-4 mb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <AnimatePresence>
                        {comments.length === 0 ? (
                            <p className="text-gray-400 text-center">No comments yet. Be the first to comment!</p>
                        ) : (
                            comments.map((comment) => (
                                <motion.div
                                    key={comment._id}
                                    className="p-4 border-b border-gray-700"
                                    variants={commentVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="flex justify-between items-start">
                                        {isEditingComment[comment._id] ? (
                                            <motion.form
                                                onSubmit={(e) => handleEditComment(comment._id, e)}
                                                className="w-full"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <textarea
                                                    value={editCommentText[comment._id] || comment.text}
                                                    onChange={(e) => setEditCommentText({ ...editCommentText, [comment._id]: e.target.value })}
                                                    className="w-full p-2 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none h-20 resize-none"
                                                    required
                                                />
                                                <div className="flex gap-2 mt-2">
                                                    <button
                                                        type="submit"
                                                        className="bg-[#FF4500] text-white px-4 py-1 rounded hover:bg-[#00FFFF] hover:text-[#0A1F44] transition-all duration-300"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsEditingComment({ ...isEditingComment, [comment._id]: false })}
                                                        className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-500 transition-all duration-300"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </motion.form>
                                        ) : (
                                            <div>
                                                <p className="text-sm text-gray-400">
                                                    <span className="text-gray-400 font-medium">
                                                        @{comment.user.username}
                                                        {comment.user.role === 'Admin' && (
                                                            <span className="ml-1 px-2 py-0.5 bg-[#0A1F44] text-[#FF4500] text-xs font-extrabold rounded-full">
                                                                Admin
                                                            </span>
                                                        )}
                                                    </span>{' '}
                                                    • {new Date(comment.createdAt).toLocaleDateString()}
                                                </p>
                                                <p className="text-white mt-2">{comment.text}</p>
                                            </div>
                                        )}
                                        {comment.user.username === loggedInUsername && !isEditingComment[comment._id] && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditCommentText({ ...editCommentText, [comment._id]: comment.text });
                                                        setIsEditingComment({ ...isEditingComment, [comment._id]: true });
                                                    }}
                                                    className="text-[#1E90FF] hover:text-[#00FFFF] transition-colors duration-300"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="text-[#FF4500] hover:text-[#00FFFF] transition-colors duration-300"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M4 7h16M10 11v6m4-6v6M3 7l1 14a2 2 0 002 2h12a2 2 0 002-2l1-14m-9-4h4a1 1 0 011 1v2H9V4a1 1 0 011-1h4"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Like/Dislike/Reply Buttons */}
                                    {!isEditingComment[comment._id] && (
                                        <div className="mt-2 flex items-center gap-4">
                                            <button
                                                onClick={() => handleLikeComment(comment._id)}
                                                disabled={!isLoggedIn}
                                                className={`flex items-center gap-1 text-sm ${isLoggedIn ? 'hover:text-[#00FFFF]' : 'opacity-50 cursor-not-allowed'}`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-blue-500"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M1 21h4V9H1v12zM23 10c0-.55-.45-1-1-1h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 2l-5 5V21h10c.55 0 1-.45 1-1v-6l1.29-1.29c.19-.18.29-.44.29-.71V10z" />
                                                </svg>
                                                {comment.likes.length}
                                            </button>
                                            <button
                                                onClick={() => handleDislikeComment(comment._id)}
                                                disabled={!isLoggedIn}
                                                className={`flex items-center gap-1 text-sm ${isLoggedIn ? 'hover:text-[#FF4500]' : 'opacity-50 cursor-not-allowed'}`}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5 text-red-500"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M23 3h-4v12h4V3zM1 13c0 .55.45 1 1 1h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 22l5-5V3H4c-.55 0-1 .45-1 1v6l-1.29 1.29c-.19-.18-.29-.44-.29-.71V13z" />
                                                </svg>
                                                {comment.dislikes.length}
                                            </button>
                                            <button
                                                onClick={() => setShowReplyForm({ ...showReplyForm, [comment._id]: !showReplyForm[comment._id] })}
                                                className="text-sm text-[#1E90FF] hover:text-[#00FFFF]"
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    )}

                                    {/* Reply Form */}
                                    {isLoggedIn && showReplyForm[comment._id] && !isEditingComment[comment._id] && (
                                        <motion.form
                                            onSubmit={(e) => handleReplySubmit(comment._id, e)}
                                            className="mt-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <textarea
                                                value={replyText[comment._id] || ''}
                                                onChange={(e) => setReplyText({ ...replyText, [comment._id]: e.target.value })}
                                                placeholder="Type your reply..."
                                                className="w-full p-2 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none h-20 resize-none"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="mt-2 bg-[#FF4500] text-white px-4 py-1 rounded hover:bg-[#00FFFF] hover:text-[#0A1F44] transition-all duration-300"
                                            >
                                                Post Reply
                                            </button>
                                        </motion.form>
                                    )}

                                    {/* Replies Toggle */}
                                    {comment.replies.length > 0 && !isEditingComment[comment._id] && (
                                        <div className="mt-2">
                                            <button
                                                onClick={() => setShowReplies({ ...showReplies, [comment._id]: !showReplies[comment._id] })}
                                                className="text-sm text-[#1E90FF] hover:text-[#00FFFF]"
                                            >
                                                {showReplies[comment._id] ? 'Hide Replies' : `View ${comment.replies.length} Replies`}
                                            </button>
                                        </div>
                                    )}

                                    {/* Replies Display */}
                                    {showReplies[comment._id] && comment.replies.length > 0 && (
                                        <div className="ml-6 mt-2 space-y-2">
                                            <AnimatePresence>
                                                {comment.replies.map((reply) => (
                                                    <motion.div
                                                        key={reply._id}
                                                        className="text-sm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        {isEditingReply[reply._id] ? (
                                                            <motion.form
                                                                onSubmit={(e) => handleEditReply(comment._id, reply._id, e)}
                                                                className="w-full"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                <textarea
                                                                    value={editReplyText[reply._id] || reply.text}
                                                                    onChange={(e) => setEditReplyText({ ...editReplyText, [reply._id]: e.target.value })}
                                                                    className="w-full p-2 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none h-20 resize-none"
                                                                    required
                                                                />
                                                                <div className="flex gap-2 mt-2">
                                                                    <button
                                                                        type="submit"
                                                                        className="bg-[#FF4500] text-white px-4 py-1 rounded hover:bg-[#00FFFF] hover:text-[#0A1F44] transition-all duration-300"
                                                                    >
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setIsEditingReply({ ...isEditingReply, [reply._id]: false })}
                                                                        className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-500 transition-all duration-300"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </motion.form>
                                                        ) : (
                                                            <>
                                                                <p className="text-gray-400">
                                                                    <span className="font-medium">@{reply.user.username}</span>{' '}
                                                                    • {new Date(reply.createdAt).toLocaleDateString()}
                                                                </p>
                                                                <p className="text-white">{reply.text}</p>
                                                                {reply.user.username === loggedInUsername && (
                                                                    <div className="flex gap-2 mt-1">
                                                                        <button
                                                                            onClick={() => {
                                                                                setEditReplyText({ ...editReplyText, [reply._id]: reply.text });
                                                                                setIsEditingReply({ ...isEditingReply, [reply._id]: true });
                                                                            }}
                                                                            className="text-[#1E90FF] hover:text-[#00FFFF] transition-colors duration-300"
                                                                        >
                                                                            <svg
                                                                                className="w-4 h-4"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth="2"
                                                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteReply(comment._id, reply._id)}
                                                                            className="text-[#FF4500] hover:text-[#00FFFF] transition-colors duration-300"
                                                                        >
                                                                            <svg
                                                                                className="w-4 h-4"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                viewBox="0 0 24 24"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    d="M4 7h16M10 11v6m4-6v6M3 7l1 14a2 2 0 002 2h12a2 2 0 002-2l1-14m-9-4h4a1 1 0 011 1v2H9V4a1 1 0 011-1h4"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                    <style jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                </div>

                {isLoggedIn ? (
                    <motion.form
                        onSubmit={handleCommentSubmit}
                        className="space-y-4 lg:max-w-full mx-auto"
                        variants={formVariants}
                        initial="rest"
                        whileFocus="focus"
                    >
                        <label className="block text-center text-gray-300 text-sm font-medium mb-1">
                            Add your comment...
                        </label>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Type your comment here..."
                            className="w-full p-3 bg-[#121212] border border-[#374151] rounded text-[#FFFFFF] focus:border-[#00FFFF] focus:outline-none h-24 resize-none"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#FF4500] text-white px-6 py-3 rounded-full hover:bg-[#00FFFF] hover:text-[#0A1F44] transition-all duration-300 font-semibold"
                        >
                            Post Comment
                        </button>
                    </motion.form>
                ) : (
                    <p className="text-gray-400 text-center">Please log in to comment.</p>
                )}
            </div>

            {sameDayArticles.length > 0 && (
                <div className="mt-12 min-w-full bg-[#121212] rounded-sm">
                    <h2 className="text-xl font-bold text-gray-600 mb-6 text-center">Discover More Headlines</h2>
                    <div className="flex flex-col gap-0.5">
                        {sameDayArticles.map((sameDayArticle) => (
                            <motion.div
                                key={sameDayArticle._id}
                                className="bg-[#000000] p-6 rounded-lg cursor-pointer hover:bg-[#121212] transition-colors duration-300 border-b border-white"
                                onClick={() => {
                                    navigate(`/articles/${sameDayArticle._id}`);
                                    window.location.reload();
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h3 className="text-gray-100 text-xl font-semibold">{sameDayArticle.title}</h3>
                                <p className="text-gray-400 text-sm mt-2 border border-gray-400 rounded-full px-3 py-1 inline-block">
                                    {sameDayArticle.city}, {sameDayArticle.state}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleDetail;