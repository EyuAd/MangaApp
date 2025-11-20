import React, { useEffect, useState } from 'react';
import { getTrendingManga } from '../api';
import MangaCard from '../components/MangaCard';
import Skeleton from '../components/Skeleton';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const response = await getTrendingManga();
                setMangaList(response.data.data);
            } catch (err) {
                setError('Failed to load trending manga.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="p-6 md:p-10">
            {!loading && <HeroCarousel mangaList={mangaList} />}

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-orange-500 pl-4">Latest Updates</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {loading ? (
                    Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="aspect-[2/3]">
                            <Skeleton className="w-full h-full rounded-xl" />
                        </div>
                    ))
                ) : (
                    mangaList.map((manga, index) => (
                        <MangaCard key={manga.id} manga={manga} index={index} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
