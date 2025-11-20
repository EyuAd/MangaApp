const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('MangaDex API Proxy Server is running');
});

// Routes
const { toNodeHandler } = require("better-auth/node");
const { auth } = require("./lib/auth");

// Routes
app.all("/api/auth/*", toNodeHandler(auth));
// app.use('/api/auth', require('./routes/auth'));
app.use('/api/manga', require('./routes/manga'));
app.use('/api/favorites', require('./routes/favorites'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manga-app')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
