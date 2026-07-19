import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db('NextFabric');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    // গুগলের সোশ্যাল লগইন সচল করার জন্য এই অংশটুকু যুক্ত করতে হবে ⚡
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
});