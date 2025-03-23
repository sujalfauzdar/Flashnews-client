import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleForm from './pages/ArticleForm';
import ArticleList from './pages/ArticleList';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ArticleDetail from './pages/ArticleDetail';

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/add" element={<ArticleForm />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
        </Routes>
    </Router>
);

export default App;
