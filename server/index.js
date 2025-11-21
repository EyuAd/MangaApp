import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import mangaRouter from "./routes/manga.js"
import favRouter from './routes/favorites.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(json());

// Basic route
app.get('/', (req, res) => {
    res.send('MangaDex API Proxy Server is running');
});

// Routes
app.use('/api/auth/*', toNodeHandler(auth))
app.use('/api/manga', mangaRouter);
app.use('/api/favorites', favRouter);

// MongoDB Connection
connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manga-app')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
