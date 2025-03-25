import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleForm from './pages/ArticleForm';
import ArticleList from './pages/ArticleList';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArticleDetail from './pages/ArticleDetail';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/about' element={<AboutUs />} />
            <Route
                path="/contact"
                element={
                    <PrivateRoute>
                        <ContactUs />
                    </PrivateRoute>
                }
            />
            <Route
                path="/articles"
                element={
                    <PrivateRoute>
                        <ArticleList />
                    </PrivateRoute>
                }
            />
            <Route
                path="/articles/:id"
                element={
                    <PrivateRoute>
                        <ArticleDetail />
                    </PrivateRoute>
                }
            />
            <Route
                path="/add"
                element={
                    <AdminRoute>
                        <ArticleForm />
                    </AdminRoute>
                }
            />
        </Routes>
        <Footer/>
    </Router>
);

export default App;