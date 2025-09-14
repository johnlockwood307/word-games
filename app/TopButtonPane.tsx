import { useEffect } from "react";

import styles from "./style/TopButtonPane.module.css";

type TopButtonPaneProps = {
    panes: Array<string>;
    curPane: string;
    changePane: any;
    inGame: boolean;
}

export default function TopButtonPane(props: TopButtonPaneProps) {
    useEffect(() => {
        if (props.inGame) {
            
        }
    }, [props.inGame]);
    
    return (
        <div className={styles.buttonPane}>
            {props.panes.map((pane) => (
                <button key={pane}
                    className={`${styles.button} ${props.curPane == pane ? styles.selected : ""}
                        ${(pane == "Play" || !props.inGame) ? styles.buttonReady : styles.buttonUnready}`}
                    onClick={() => {
                        if(!props.inGame) {
                            props.changePane(pane)
                        }
                    }}>
                    {pane}
                </button>
            ))}
        </div>
    );
}