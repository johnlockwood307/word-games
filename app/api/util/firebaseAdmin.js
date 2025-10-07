import admin from "firebase-admin"

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
        });
    } catch (error) {
        console.error("failed to initialize firebase admin sdk:", err);
        throw err;
    }
}

export const db = admin.firestore();