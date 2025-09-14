import styles from "./style/LeaderboardTable.module.css";

export type LeaderboardDoc = {
    id: string;
    nickname: string;
    score: number;
    letters: string;
    timestamp: number;
}

type LeaderboardProps = {
    leaderboard: Array<LeaderboardDoc>;
    tableTitle: string;
    recentLeaderboardEntry: LeaderboardDoc | null;
}

export function LeaderboardTable(props: LeaderboardProps) {
    function isEntryRecent(entry: LeaderboardDoc) {
        // null check
        if (props.recentLeaderboardEntry) {
            return props.recentLeaderboardEntry.timestamp == entry.timestamp &&
                props.recentLeaderboardEntry.nickname == entry.nickname &&
                props.recentLeaderboardEntry.letters == entry.letters &&
                props.recentLeaderboardEntry.score == entry.score;
        }
    }
    
    return (
        <div>
            <h2 className={styles.tableTitle}>{props.tableTitle}</h2>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.row}>
                        <th>Nickname</th>
                        <th>Score</th>
                        <th>Letters</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.leaderboard.map((entry, index) =>
                            <tr key={index} 
                                className={`${styles.row} ${isEntryRecent(entry) ? styles.highlightedRow : ""}`}
                            >
                                <td>{entry.nickname}</td>
                                <td>{entry.score}</td>
                                <td>{entry.letters}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}