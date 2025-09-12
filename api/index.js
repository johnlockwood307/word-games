import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import { collection, getDocs } from "firebase/firestore";
import { db } from "./util/FirebaseInit.js";


const app = express()


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/dictionary", async (req, res) => {
    console.log("getting dictionary words");
    const collectionRef = collection(db, "collins-scrabble-words");
	const collectionSnap = await getDocs(collectionRef)
	const docs = []
    
    collectionSnap.forEach((doc) => {
		docs.push(doc.data())
	})
	res.send(docs)
});



export default app;