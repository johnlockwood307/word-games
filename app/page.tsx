"use client";

import { useEffect, useState } from "react";

type WordDoc = {
    id: string;
    word: string;
}

export default function Home() {
    const [words, setWords] = useState<Array<WordDoc>>([]);

    async function getWords() {
        const res = await fetch("/api/dictionary", {
            method: "GET",
        });

        const resJSON = await res.json();
        setWords(resJSON);
    }

    useEffect(() => {
        getWords();
    }, []);

    return (
    <div>
        <h1>hello world...</h1>
        <table>
            <thead>
                <tr>
                    <th>Word</th>
                </tr>
            </thead>
            <tbody>
                {
                    words.map((word, index) =>
                        <tr key={index}>
                            <td>{word.word}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>);
}
