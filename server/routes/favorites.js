const express = require('express');
const Favorite = require('../models/Favorite');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', auth, async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user.id }).sort({ addedAt: -1 });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/', auth, async (req, res) => {
    try {
        const { mangaId, title, coverUrl } = req.body;
        const newFavorite = new Favorite({
            user: req.user.id,
            mangaId,
            title,
            coverUrl
        });
        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Manga already in favorites' });
        }
        res.status(500).json({ error: error.message });
    }
});


router.delete('/:mangaId', auth, async (req, res) => {
    try {
        const { mangaId } = req.params;
        await Favorite.findOneAndDelete({ mangaId, user: req.user.id });
        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/check/:mangaId', auth, async (req, res) => {
    try {
        const { mangaId } = req.params;
        const exists = await Favorite.exists({ mangaId, user: req.user.id });
        res.json({ isFavorite: !!exists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
