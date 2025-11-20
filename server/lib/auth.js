const { betterAuth } = require("better-auth");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manga-app');
const db = client.db();

const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    emailVerification: {
        sendOnSignUp: false,
        requireEmailVerification: false
    },
    trustedOrigins: ["http://localhost:5173", "http://127.0.0.1:5173"],
    debug: true
});

module.exports = { auth };
