import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200"
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                    Manga-LOB
                </Link>

                <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full border border-gray-200 focus-within:border-orange-500 transition-colors overflow-hidden mx-4 max-w-md w-full">
                    <input
                        type="text"
                        placeholder="Search manga..."
                        className="bg-transparent px-4 py-2 text-gray-900 focus:outline-none w-full placeholder-gray-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="p-3 text-gray-500 hover:text-orange-600 transition">
                        <FaSearch />
                    </button>
                </form>

                <Link to="/favorites" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition group font-medium">
                    <FaHeart className="group-hover:scale-110 transition-transform text-red-500" />
                    <span className="hidden sm:inline">Favorites</span>
                </Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;
