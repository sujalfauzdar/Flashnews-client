import { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded bg-white shadow-md">
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
            <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
                Login
            </button>
        </form>
    );
};

export default Login;
