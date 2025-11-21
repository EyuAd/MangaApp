import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaHeart, FaSignOutAlt, FaUser, FaBookOpen } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const navItems = [
        { path: '/', icon: FaHome, label: 'Home' },
        { path: '/search', icon: FaSearch, label: 'Search' },
        { path: '/favorites', icon: FaHeart, label: 'Favorites' },
    ];

    return (
        <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 bottom-0 w-20 md:w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col z-50 shadow-sm"
        >
            <div className="p-6 flex items-center justify-center md:justify-start gap-3 border-b border-gray-100">
                <FaBookOpen className="text-3xl text-orange-500" />
                <span className="hidden md:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
                    Manga-LOB
                </span>
            </div>

            <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'bg-orange-50 text-orange-600 border border-orange-100'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className={`text-xl ${isActive ? 'text-orange-500' : 'group-hover:text-white transition-colors'}`} />
                            <span className="hidden md:block font-medium">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 w-1 h-8 bg-orange-500 rounded-r-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200">
                {user ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-md">
                                {user.name[0].toUpperCase()}
                            </div>
                            <div className="hidden md:block overflow-hidden">
                                <p className="text-gray-900 font-medium truncate">{user.username}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition w-full"
                        >
                            <FaSignOutAlt className="text-xl" />
                            <span className="hidden md:block font-medium">Logout</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <Link to="/login" className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 p-3 rounded-xl transition">
                            <FaUser />
                            <span className="hidden md:block">Login</span>
                        </Link>
                        <Link to="/register" className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-xl hover:opacity-90 transition shadow-md">
                            <span className="hidden md:block">Sign Up</span>
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Sidebar;
