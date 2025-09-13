import { collection, getDocs } from "firebase/firestore";
import { db } from "../util/FirebaseInit.js";



export async function GET() {
    console.log("getting anagrams leaderboard entries");
    const collectionRef = collection(db, "anagrams-leaderboard");
	const collectionSnap = await getDocs(collectionRef)
	const docs = []
    
    collectionSnap.forEach((doc) => {
		docs.push(doc.data())
	})

    return new Response(JSON.stringify(docs), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

