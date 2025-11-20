import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaBookOpen } from 'react-icons/fa';

const HeroCarousel = ({ mangaList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % Math.min(5, mangaList.length));
        }, 5000);
        return () => clearInterval(timer);
    }, [mangaList]);

    if (!mangaList || mangaList.length === 0) return null;

    const currentManga = mangaList[currentIndex];
    const title = currentManga.attributes.title.en || Object.values(currentManga.attributes.title)[0];
    const description = currentManga.attributes.description.en || 'No description available.';
    const coverArt = currentManga.relationships.find(rel => rel.type === 'cover_art');
    const coverUrl = coverArt
        ? `https://uploads.mangadex.org/covers/${currentManga.id}/${coverArt.attributes.fileName}.512.jpg`
        : 'https://via.placeholder.com/512x720?text=No+Cover';

    return (
        <div className="relative h-[500px] w-full overflow-hidden rounded-2xl mb-10 group">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentManga.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    {/* Background Image with Blur */}
                    <div
                        className="absolute inset-0 bg-cover bg-center blur-sm scale-110"
                        style={{ backgroundImage: `url(${coverUrl})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

                    <div className="relative z-10 h-full flex items-center p-8 md:p-16 gap-8">
                        <motion.img
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            src={coverUrl}
                            alt={title}
                            className="hidden md:block h-[350px] w-[240px] object-cover rounded-lg shadow-2xl transform group-hover:scale-105 transition duration-500"
                        />

                        <div className="flex-1 max-w-2xl">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                                    Trending Now
                                </span>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight line-clamp-2">
                                    {title}
                                </h1>
                                <p className="text-gray-300 text-lg mb-8 line-clamp-3 leading-relaxed">
                                    {description}
                                </p>

                                <div className="flex gap-4">
                                    <Link
                                        to={`/manga/${currentManga.id}`}
                                        className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition flex items-center gap-2"
                                    >
                                        <FaBookOpen /> Read Now
                                    </Link>
                                    <button className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition flex items-center gap-2">
                                        <FaStar className="text-yellow-400" /> Add to Favorites
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            <div className="absolute bottom-6 right-8 flex gap-2 z-20">
                {mangaList.slice(0, 5).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
