import styles from "./PreGame.module.css";

type PreGameProps = {
    setNickname: any;
    setValidNickname: any;
    setInGame: any;
    validNickname: boolean;
    inGame: boolean;
}

export default function PreGamePane(props: PreGameProps) {
    return (
        <div style={{ display: (props.inGame) ? "none" : "block" }}>
            <p>(Optional) Enter a nickname (1-3 characters) in order to save your scores:</p>
            <br/>
            <input type="text" className={styles.input} placeholder="AAA" onChange={(event) => {
                const entry = event.target.value;
                if (entry.length <= 3) {
                    props.setValidNickname(true);
                    props.setNickname(entry);
                } else {
                    props.setValidNickname(false);
                }
            }}></input>
            <br/>
            <br/>
            <br/>
            <div className={styles.startButtonContainer}>
                <button className={`${styles.startButton} ${props.validNickname ? styles.startButtonReady : styles.startButtonUnready}`}
                    onClick={() => {
                        if(props.validNickname) {
                            props.setInGame(true);
                        }
                    }}>
                    Start Game
                </button>
                <p className={styles.nicknameWarning}>
                    {props.validNickname ? "" : "Your nickname is too long!"}
                </p>
            </div>
        </div>
    );
}