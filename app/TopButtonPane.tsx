import styles from "./TopButtonPane.module.css";

type TopButtonPaneProps = {
    panes: Array<string>;
    curPane: string;
    changePane: any
}

export default function TopButtonPane(props: TopButtonPaneProps) {
    return (
        <div className={styles.buttonPane}>
            {/* <button className={styles.button}></button>
            <button className={styles.button}>Leaderboard</button>
            <button className={styles.button}>How to Play</button> */}

            {props.panes.map((pane) => (
                <button key={pane} className={styles.button} onClick={() => props.changePane(pane)}>
                    {pane}
                </button>
            ))}
        </div>
    );
}