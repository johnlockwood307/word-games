import styles from "./style/PreGame.module.css";

type PreGameProps = {
    setNickname: React.Dispatch<React.SetStateAction<string>>;
    setValidNickname: React.Dispatch<React.SetStateAction<boolean>>;
    setInGame: React.Dispatch<React.SetStateAction<boolean>>;
    validNickname: boolean;
    inGame: boolean;
    setGameCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function PreGamePane(props: PreGameProps) {
    return (
        <div style={{ display: (props.inGame) ? "none" : "block" }}>
            <p>(Optional) Enter a nickname (1-3 characters) to save your scores to the leaderboard:</p>
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
                            props.setGameCount(prev => prev + 1);
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