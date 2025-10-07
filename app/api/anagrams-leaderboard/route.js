// import { addDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../util/FirebaseInit.js";
import { db } from "../util/firebaseAdmin.js";


export async function GET() {
    try {
        console.log("getting anagrams leaderboard entries");
        
        // const collectionRef = collection(db, "anagrams-leaderboard");
        // const collectionSnap = await getDocs(collectionRef)
        const collectionRef = db.collection("anagrams-leaderboard");
        const collectionSnap = await collectionRef.get();
        const docs = []
        
        collectionSnap.forEach((doc) => {
            docs.push(doc.data())
        })

        return new Response(
            JSON.stringify(docs), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error("error fetching documents: ", error);

        return new Response(
            JSON.stringify({ success: false, error: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}


export async function POST(request) {
    try {
        console.log("posting anagrams leaderboard entry");

        // const collectionRef = collection(db, "anagrams-leaderboard");
        const collectionRef = db.collection("anagrams-leaderboard");
        const body = await request.json();

        if (!body || typeof body !== "object" || !body.nickname || !body.score || !body.letters
            || !body.timestamp || body.nickname.length < 1 || body.nickname.length > 3 || body.letters.length != 6
        ) {
            return new Response(
                JSON.stringify({ success: false, error: "Invalid request body" }), {
                    status: 400,
                    headers: { "Content-Type": "application/json" }
                }
            );
        }
        // const docRef = await addDoc(collectionRef, body);
        const docRef = await collectionRef.add(body);

        return new Response(
            JSON.stringify({ id: docRef.id, success: true }), {
                status: 201,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error("error adding document: ", error);

        return new Response(
            JSON.stringify({ success: false, error: error.message }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}