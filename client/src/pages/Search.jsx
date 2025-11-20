import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchManga } from '../api';
import MangaCard from '../components/MangaCard';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [mangaList, setMangaList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true);
            try {
                const response = await searchManga(query);
                setMangaList(response.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearch();
        }
    }, [query]);

    const [localQuery, setLocalQuery] = useState(query || '');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (localQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(localQuery)}`);
        }
    };

    return (
        <div className="container mx-auto p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-bold text-gray-900 border-l-4 border-orange-500 pl-4">
                    Search Results {query && `for "${query}"`}
                </h2>

                <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full border border-gray-200 focus-within:border-orange-500 transition-colors overflow-hidden w-full max-w-md shadow-sm">
                    <input
                        type="text"
                        placeholder="Search manga..."
                        className="bg-transparent px-6 py-3 text-gray-900 focus:outline-none w-full placeholder-gray-400"
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                    />
                    <button type="submit" className="p-4 text-gray-400 hover:text-orange-600 transition bg-gray-50 hover:bg-orange-50">
                        <FaSearch />
                    </button>
                </form>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="aspect-[2/3] bg-gray-200 animate-pulse rounded-xl"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {mangaList.length > 0 ? (
                        mangaList.map((manga, index) => (
                            <MangaCard key={manga.id} manga={manga} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <p className="text-gray-500 text-lg">No results found for "{query}".</p>
                            <p className="text-gray-400 text-sm mt-2">Try searching for something else.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
