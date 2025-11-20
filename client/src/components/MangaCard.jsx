import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MangaCard = ({ manga, index }) => {
    const title = manga.attributes.title.en || Object.values(manga.attributes.title)[0];
    const coverArt = manga.relationships.find(rel => rel.type === 'cover_art');
    const coverFileName = coverArt ? coverArt.attributes.fileName : null;
    const coverUrl = coverFileName
        ? `https://uploads.mangadex.org/covers/${manga.id}/${coverFileName}.256.jpg`
        : 'https://via.placeholder.com/256x360?text=No+Cover';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Link to={`/manga/${manga.id}`} className="group block relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                <div className="aspect-[2/3] overflow-hidden relative">
                    <img
                        src={coverUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>
                <div className="p-3">
                    <h3 className="text-gray-900 font-bold text-sm line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                        {title}
                    </h3>
                </div>
            </Link>
        </motion.div>
    );
};

export default MangaCard;
