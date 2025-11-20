import React, { useEffect, useState, useContext } from 'react';
import { getFavorites } from '../api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FaHeartBroken, FaSignInAlt } from 'react-icons/fa';

const Favorites = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchFavorites = async () => {
                try {
                    const response = await getFavorites();
                    setFavorites(response.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (authLoading || loading) return (
        <div className="p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-gray-800 rounded-xl animate-pulse"></div>)}
        </div>
    );

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
                <FaSignInAlt className="text-6xl text-gray-600 mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Login to view favorites</h2>
                <p className="text-gray-400 mb-8 max-w-md">
                    Create an account or login to save your favorite manga and access them from any device.
                </p>
                <Link to="/login" className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition">
                    Login Now
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4">My Favorites</h2>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {favorites.map((fav, index) => (
                        <motion.div
                            key={fav._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link to={`/manga/${fav.mangaId}`} className="group block bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/20 transition duration-300 h-full flex flex-col">
                                <div className="relative aspect-[2/3] overflow-hidden">
                                    <img
                                        src={fav.coverUrl || 'https://via.placeholder.com/256x360?text=No+Cover'}
                                        alt={fav.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-orange-400 transition-colors">{fav.title}</h3>
                                    <span className="text-xs text-gray-500 mt-2 block">Added {new Date(fav.addedAt).toLocaleDateString()}</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
                    <FaHeartBroken className="text-6xl text-gray-700 mb-6" />
                    <div className="text-gray-500 text-xl mb-4">No favorites yet</div>
                    <Link to="/" className="text-orange-500 hover:underline">Browse Manga</Link>
                </div>
            )}
        </div>
    );
};

export default Favorites;
