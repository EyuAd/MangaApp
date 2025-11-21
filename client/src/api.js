import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
    withCredentials: true,
});

export const getTrendingManga = (limit = 20, offset = 0) =>
    api.get('/manga', { params: { limit, offset } });

export const searchManga = (title, limit = 20, offset = 0) =>
    api.get('/manga', { params: { title, limit, offset } });

export const getMangaDetails = (id) =>
    api.get(`/manga/${id}`);

export const getMangaFeed = (id, limit = 100, offset = 0, languages = ['en']) =>
    api.get(`/manga/${id}/feed`, { params: { limit, offset, translatedLanguage: languages } });

export const getChapterPages = (id) =>
    api.get(`/manga/chapter/${id}`);

export const getFavorites = () =>
    api.get('/favorites');

export const addFavorite = (manga) =>
    api.post('/favorites', manga);

export const removeFavorite = (mangaId) =>
    api.delete(`/favorites/${mangaId}`);

export const checkFavorite = (mangaId) =>
    api.get(`/favorites/check/${mangaId}`);

export default api;
