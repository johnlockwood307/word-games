// import serverless from "serverless-http";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../util/FirebaseInit.js";



export async function GET() {
    console.log("getting dictionary words");
    const collectionRef = collection(db, "collins-scrabble-words");
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


// const handler = serverless(app);