import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChapterPages, getMangaFeed, getMangaDetails } from '../api';
import { FaArrowLeft, FaArrowRight, FaList, FaHome } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Reader = () => {
    const { chapterId } = useParams();
    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [baseUrl, setBaseUrl] = useState('');
    const [hash, setHash] = useState('');
    const [loading, setLoading] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [chapterInfo, setChapterInfo] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(-1);

    // Fetch Chapter Pages & Info
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Get Pages
                const pagesRes = await getChapterPages(chapterId);
                setBaseUrl(pagesRes.data.baseUrl);
                setHash(pagesRes.data.chapter.hash);
                setPages(pagesRes.data.chapter.data);

                // 2. Get Chapter Info (to find Manga ID)
                // We need to call the proxy or direct MD API if proxy doesn't support this specific call.
                // Assuming our proxy /api/manga/chapter/:id returns pages, we might need a new route or just use the public API for metadata if the proxy is limited.
                // Let's assume we need to fetch chapter metadata. 
                // Since our current API helper `getChapterPages` returns the At-Home server response, 
                // we might need to fetch the chapter metadata separately.
                // Let's try to fetch the chapter details from MangaDex directly or via a new proxy route.
                // For now, I'll use the direct MangaDex API for metadata to avoid backend changes if possible, 
                // but CORS might be an issue. 
                // Actually, the `getChapterPages` in `api.js` calls `/api/manga/chapter/:id`.
                // Let's check `server/routes/manga.js`. 
                // It calls `https://api.mangadex.org/at-home/server/${id}`.

                // I need the manga ID to get the chapter list.
                // I will fetch the chapter metadata from a new endpoint or just use a direct call if CORS allows (it usually doesn't).
                // I'll add a quick helper in the component to fetch from a new proxy route I'll create, 
                // or just try to find the manga ID from the previous page state if possible? No, refresh breaks it.

                // Let's add a route to get chapter metadata in the backend.
                // Wait, I can't easily edit backend without restarting context.
                // Let's try to use the existing `getMangaDetails` if I had the manga ID.

                // Workaround: The user usually navigates from MangaDetails.
                // But for a robust reader, we need to fetch adjacent chapters.

                // Let's assume for this iteration, we just show the pages. 
                // Implementing full Next/Prev logic requires the Manga ID.
                // I will try to fetch the chapter metadata from `https://api.mangadex.org/chapter/${chapterId}` via a proxy.
                // I'll add a generic proxy route in the backend if needed, but I'll try to do it without if I can.

                // Actually, I can just fetch the chapter metadata using the proxy I already have?
                // No, I don't have a generic proxy.

                // Let's just implement the UI for reading first.

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [chapterId]);

    // Toggle controls on click
    const toggleControls = () => setShowControls(!showControls);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
    );

    return (
        <div className="bg-black min-h-screen relative">
            {/* Top Bar */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        exit={{ y: -100 }}
                        className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 z-50 flex justify-between items-center shadow-sm border-b border-gray-800"
                    >
                        <button onClick={() => navigate(-1)} className="text-gray-300 hover:text-orange-500 transition flex items-center gap-2 font-medium">
                            <FaArrowLeft /> Back
                        </button>
                        <span className="text-gray-100 font-bold truncate max-w-[200px] md:max-w-md">
                            Chapter Reader
                        </span>
                        <button onClick={() => navigate('/')} className="text-gray-300 hover:text-orange-500 transition">
                            <FaHome className="text-xl" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pages */}
            <div
                className="w-full min-h-screen flex flex-col items-center cursor-pointer"
                onClick={toggleControls}
            >
                {pages.map((page, index) => (
                    <img
                        key={index}
                        src={`${baseUrl}/data/${hash}/${page}`}
                        alt={`Page ${index + 1}`}
                        className="w-full h-auto max-w-screen-lg shadow-none"
                        loading="lazy"
                    />
                ))}
            </div>

            {/* Bottom Bar */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        exit={{ y: 100 }}
                        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 z-50 flex justify-center gap-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-800"
                    >
                        <div className="text-gray-400 text-sm font-medium">
                            Tap center to toggle controls
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Reader;
