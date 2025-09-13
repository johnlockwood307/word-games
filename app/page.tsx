"use client";

import { useEffect, useState } from "react";
import { LeaderboardTable, LeaderboardDoc } from "./LeaderboardTable";
import styles from "./page.module.css";
import TopButtonPane from "./TopButtonPane";
import HowToPlay from "./HowToPlay";
import PreGamePane from "./PreGame";
import GamePane from "./Game";

export default function Home() {
    const [scoreLeaderboard, setScoreLeaderboard] = useState<Array<LeaderboardDoc>>([]);
    const [recentLeaderboard, setRecentLeaderboard] = useState<Array<LeaderboardDoc>>([]);

    const panes = ["Play", "Leaderboard", "How to Play"];
    const [curPane, setCurPane] = useState(panes[0]);

    const [nickname, setNickname] = useState("");
    const [validNickname, setValidNickname] = useState(true);

    const [inGame, setInGame] = useState(false);


    // fetch leaderboard once on startup, sort into high scores and recent scores
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

        getLeaderboardEntries();
    }, []);


    // wrapper for setState, passed as props to TopButtonPane
    function changePane(pane: string) {
        setCurPane(pane);
    }


    return (
    <div className={styles.page}>
        <h1 className={styles.title}>Anagrams</h1>
        <TopButtonPane panes={panes} curPane={curPane} changePane={changePane} />

        {/* Play pane */}
        <div className={`${styles.playPane} ${styles.body}`} style={{ display: (curPane === "Play") ? "block" : "none" }}>
            <PreGamePane setNickname={setNickname} setValidNickname={setValidNickname}
                setInGame={setInGame} validNickname={validNickname} inGame={inGame}/>
            <GamePane inGame={inGame}/>
        </div>

        {/* Leaderboard pane */}
        <div className={`${styles.leaderboardPane} ${styles.body}`} style={{ display: (curPane === "Leaderboard") ? "block" : "none" }}>
            <LeaderboardTable tableTitle="High Scores" leaderboard={scoreLeaderboard}/>
            <br/>
            <br/>
            <LeaderboardTable tableTitle="Recent Scores" leaderboard={recentLeaderboard}/>
        </div>

        {/* How to Play pane */}
        <div className={`${styles.howToPlayPane} ${styles.body}`} style={{ display: (curPane === "How to Play") ? "block" : "none" }}>
            <HowToPlay/>
        </div>
    </div>);
}
