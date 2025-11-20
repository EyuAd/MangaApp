const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'https://api.mangadex.org';


router.get('/', async (req, res) => {
    try {
        const { title, limit = 20, offset = 0 } = req.query;
        const params = {
            limit,
            offset,
            includes: ['cover_art'],
        };
        if (title) params.title = title;

        const response = await axios.get(`${BASE_URL}/manga`, { params });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/chapter/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${BASE_URL}/at-home/server/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${BASE_URL}/manga/${id}?includes[]=cover_art&includes[]=author&includes[]=artist`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Manga Feed (Chapters)
router.get('/:id/feed', async (req, res) => {
    try {
        const { id } = req.params;
        const { limit = 100, offset = 0, translatedLanguage = ['en'] } = req.query;
        const response = await axios.get(`${BASE_URL}/manga/${id}/feed`, {
            params: {
                limit,
                offset,
                translatedLanguage,
                order: { chapter: 'desc' },
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
