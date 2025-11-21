import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMangaDetails, getMangaFeed, checkFavorite, addFavorite, removeFavorite } from '../api';
import { AuthContext } from '../context/AuthContext';

const MangaDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [manga, setManga] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [mangaRes, feedRes] = await Promise.all([
                    getMangaDetails(id),
                    getMangaFeed(id)
                ]);
                setManga(mangaRes.data.data);
                setChapters(feedRes.data.data);

                if (user) {
                    try {
                        const favRes = await checkFavorite(id);
                        setIsFavorite(favRes.data.isFavorite);
                    } catch (err) {
                        console.error('Error checking favorite:', err);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, user]);

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await removeFavorite(id);
            } else {
                const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0];
                const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
                const coverFileName = coverArt ? coverArt.attributes.fileName : null;
                const coverUrl = coverFileName
                    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`
                    : '';

                await addFavorite({ mangaId: id, title, coverUrl });
            }
            setIsFavorite(!isFavorite);
        } catch (err) {
            console.error('Error toggling favorite:', err);
        }
    };

    if (loading) return <div className="text-white p-4 text-center mt-20">Loading...</div>;
    if (!manga) return <div className="text-white p-4 text-center mt-20">Manga not found</div>;

    const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0];
    const description = manga.attributes.description.en || 'No description available.';
    const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
    const coverUrl = coverArt
        ? `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.512.jpg`
        : 'https://via.placeholder.com/512x720?text=No+Cover';

    return (
        <div className="relative min-h-screen">
            {/* Background Blur */}
            <div
                className="fixed inset-0 z-0 opacity-20 blur-3xl bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: `url(${coverUrl})` }}
            />

            <div className="container mx-auto p-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    {/* Cover Image */}
                    <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                        <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                            <img src={coverUrl} alt={title} className="w-full" />
                        </div>
                        <button
                            onClick={toggleFavorite}
                            className={`mt-6 w-full py-3 px-4 rounded-lg font-bold transition shadow-lg flex items-center justify-center gap-2 ${isFavorite
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-white text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                            {title}
                        </h1>
                        <div className="glass p-6 rounded-xl mb-8">
                            <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
                        </div>

                        <h3 className="text-2xl font-semibold mb-4 text-orange-600">Chapters</h3>
                        <div className="glass rounded-xl overflow-hidden border border-gray-200">
                            {chapters.length > 0 ? (
                                <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto custom-scrollbar">
                                    {chapters.map(chapter => (
                                        <li key={chapter.id} className="hover:bg-gray-50 transition">
                                            <Link to={`/read/${chapter.id}`} className="p-4 flex justify-between items-center group">
                                                <div>
                                                    <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                                                        Chapter {chapter.attributes.chapter || 'Oneshot'}
                                                    </span>
                                                    {chapter.attributes.title && (
                                                        <span className="ml-2 text-gray-500 group-hover:text-gray-700">- {chapter.attributes.title}</span>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-500 group-hover:text-gray-700">
                                                    {new Date(chapter.attributes.publishAt).toLocaleDateString()}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-8 text-center text-gray-500">No chapters found in English.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MangaDetails;
