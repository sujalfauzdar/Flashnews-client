import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Reader'  // Default role as Reader
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
            alert('Signup successful!');
        } catch (error) {
            alert(error.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded bg-white shadow-md">
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded mb-2"
                required
            />
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
            >
                <option value="Reader">Reader</option>
                <option value="Admin">Admin</option>
            </select>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Signup
            </button>
        </form>
    );
};

export default Signup;
