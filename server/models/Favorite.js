import { Schema, model } from 'mongoose';

const FavoriteSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    mangaId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    coverUrl: {
        type: String,
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});


FavoriteSchema.index({ user: 1, mangaId: 1 }, { unique: true });

export default model('Favorite', FavoriteSchema);
