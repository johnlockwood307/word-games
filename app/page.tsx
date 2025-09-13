"use client";

import { useEffect, useState } from "react";
import { LeaderboardTable, LeaderboardDoc } from "./LeaderboardTable";
import styles from "./page.module.css";
import TopButtonPane from "./TopButtonPane";

export default function Home() {
    const [scoreLeaderboard, setScoreLeaderboard] = useState<Array<LeaderboardDoc>>([]);
    const [recentLeaderboard, setRecentLeaderboard] = useState<Array<LeaderboardDoc>>([]);

    const panes = ["Play", "Leaderboard", "How to Play"];
    const [curPane, setCurPane] = useState(panes[0]);

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
            console.log(JSON.stringify(resJSON));
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
        <div className={styles.leaderboardPane}>
            <LeaderboardTable tableTitle="High Scores" leaderboard={scoreLeaderboard}/>
            <LeaderboardTable tableTitle="Recent Scores" leaderboard={recentLeaderboard}/>
        </div>
    </div>);
}
