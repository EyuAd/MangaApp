import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const client = new MongoClient(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manga-app');
const db = client.db();

export const auth = betterAuth({
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
