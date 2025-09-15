"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import { LeaderboardTable, LeaderboardDoc } from "./LeaderboardTable";
import styles from "./style/page.module.css";
import TopButtonPane from "./TopButtonPane";
import HowToPlay from "./HowToPlay";
import PreGamePane from "./PreGame";
import GamePane from "./Game";
import { buildTrie } from "./gameUtils";

export default function Home() {
    useEffect(() => {
        document.title = "Play Anagrams";
    }, []);

    const [scoreLeaderboard, setScoreLeaderboard] = useState<Array<LeaderboardDoc>>([]);
    const [recentLeaderboard, setRecentLeaderboard] = useState<Array<LeaderboardDoc>>([]);
    const [recentLeaderboardEntry, setRecentLeaderboardEntry] = useState<LeaderboardDoc | null>(null);

    const panes = ["Play", "Leaderboard", "How to Play"];
    const [curPane, setCurPane] = useState(panes[0]);

    const [nickname, setNickname] = useState("");
    const [validNickname, setValidNickname] = useState(true);

    const [inGame, setInGame] = useState(false);
    const [gameCount, setGameCount] = useState<number>(0);

    const [trie, setTrie] = useState<any>(null);


    // build trie once on startup
    useEffect(() => {
        fetch('/collins_scrabble_words.txt')
            .then((res) => res.text())
            .then((text) => {
                const words = text
                    .split('\n')                                // turns text into array of words
                    .map((w) => w.trim().toLowerCase())         // removes newlines, makes lower case
                    .filter(Boolean)                            // removes any falsy values
                
                setTrie(buildTrie(words))
            })
    }, []);

    // fetch leaderboard, sort into high scores and recent scores
    useEffect(() => {
        async function getLeaderboardEntries() {
            const res = await fetch("/api/anagrams-leaderboard", {
                method: "GET",
            });

            const resJSON = await res.json();
            setScoreLeaderboard(resJSON.sort((entry1: LeaderboardDoc, entry2: LeaderboardDoc) => (
                entry2.score - entry1.score
            )).slice(0, 10));
            setRecentLeaderboard(resJSON.sort((entry1: LeaderboardDoc, entry2: LeaderboardDoc) => (
                entry2.timestamp - entry1.timestamp
            )).slice(0, 10));
        }

        // fetch on startup and when inGame set to false (continue clicked)
        if (!inGame) {
            getLeaderboardEntries();
        }
    }, [inGame]);


    // wrapper for setState, passed as props to TopButtonPane
    function changePane(pane: string) {
        setCurPane(pane);
    }


    return (<>
    <Head>
        <title>Play Anagrams</title>
    </Head>

    <div className={styles.page}>
        <h1 className={styles.title}>Anagrams</h1>
        <TopButtonPane panes={panes} curPane={curPane} changePane={changePane} inGame={inGame}/>

        {/* Play pane */}
        <div className={`${styles.playPane} ${styles.body}`} style={{ display: (curPane === "Play") ? "block" : "none" }}>
            <PreGamePane setNickname={setNickname} setValidNickname={setValidNickname}
                setInGame={setInGame} validNickname={validNickname} inGame={inGame} setGameCount={setGameCount}/>
            <GamePane inGame={inGame} setInGame={setInGame} endTime={Date.now() + 60000}
                trie={trie} gameCount={gameCount} nickname={nickname} setRecentLeaderboardEntry={setRecentLeaderboardEntry}/>
        </div>

        {/* Leaderboard pane */}
        <div className={`${styles.leaderboardPane} ${styles.body}`} style={{ display: (curPane === "Leaderboard") ? "block" : "none" }}>
            <LeaderboardTable tableTitle="Recent Scores" leaderboard={recentLeaderboard} recentLeaderboardEntry={recentLeaderboardEntry}/>
            <br/>
            <br/>
            <LeaderboardTable tableTitle="High Scores" leaderboard={scoreLeaderboard} recentLeaderboardEntry={recentLeaderboardEntry}/>
        </div>

        {/* How to Play pane */}
        <div className={`${styles.howToPlayPane} ${styles.body}`} style={{ display: (curPane === "How to Play") ? "block" : "none" }}>
            <HowToPlay/>
        </div>
    </div></>);
}
