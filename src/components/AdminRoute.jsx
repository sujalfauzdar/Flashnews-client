import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';// Install: npm install jwt-decode

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/" />;

    try {
        const decoded = jwtDecode(token);
        return decoded.role === 'Admin' ? children : <Navigate to="/articles" />;
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token'); // Clear invalid token
        return <Navigate to="/" />;
    }
};

export default AdminRoute;