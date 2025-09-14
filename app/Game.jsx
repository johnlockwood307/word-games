import { useEffect, useState, useRef } from "react";
import Countdown from "react-countdown";
import styles from "./Game.module.css";
import { wordValid } from "./gameUtils";

// scores for word of each length
const scoreMap = new Map([
    [3, 100],
    [4, 400],
    [5, 1200],
    [6, 2000]
]);

function getLetters() {
    return ["A", "B", "C", "D", "E", "F"];
}

export default function GamePane(gProps) {
    const buffer = 25;
    const cellX = 50;
    const activeY = buffer + 25;
    const inactiveY = buffer + 100;

    const [letters, setLetters] = useState([]);
    // get random letters once on startup
    useEffect(() => {
        setLetters(getLetters());
    }, [])

    // list of button indices that are active
    const [activeButtons, setActiveButtons] = useState([]);
    // references to button DOM elements
    const buttonRefs = useRef([]);
    // Display feedback (valid / invalid / too short) about entered words
    const [wordFeedback, setWordFeedback] = useState("Enter some words!");
    
    // Total points earned by submitting words
    const [totalPoints, setTotalPoints] = useState(0);
    // Submitted words, used to prevent duplicate entry
    const [submittedWords, setSubmittedWords] = useState(new Set());

    // gameOver used to stop word submission
    const [gameOver, setGameOver] = useState(false);


    // when letter button is clicked, append to or remove from activeButtons
    function handleLetterClick(index) {
        if (gameOver) {
            return;
        }
        
        if (activeButtons.includes(index)) {
            // remove from activeButtons
            setActiveButtons(prevActiveButtons => prevActiveButtons.filter(isActive => isActive !== index));
        } else {
            // append to activeButtons
            setActiveButtons(prevActiveButtons => [...prevActiveButtons, index]);
        }
    }

    // when submit button is clicked, check if word valid and award points accordingly.
    function handleSubmit() {
        if (gameOver) {
            return;
        }
        
        const word = activeButtons.map((activeButton) => (letters[activeButton]));
        const wordStr = word.join("");
        
        // check if duplicate word
        if (submittedWords.has(wordStr)) {
            setWordFeedback(`${wordStr} (Duplicate word)`);
        } else {
            if (word.length < 3) {
                setWordFeedback("Too short! Words must be at least 3 letters");
            } else {
                if (wordValid(gProps.trie, word)) {
                    const newPoints = scoreMap.get(word.length);
                    setTotalPoints(prev => prev + newPoints);
                    setSubmittedWords(prev => prev.add(wordStr));
                    setWordFeedback(`${wordStr} (+${newPoints} points)`);
                } else {
                    setWordFeedback(`${wordStr} (Invalid word)`);
                }
            }
        }

        // reset all active letters regardless of validity
        setActiveButtons([]);
    }

    // get {x,y} position of a button based on its index (position in original letters) or activeIndex (position in the active zone)
    function getPosition(index) {
        const activeIndex = activeButtons.indexOf(index);
        if(activeIndex >= 0) {
            // index is active
            return {x: buffer + cellX * activeIndex, y: activeY};
        }
        // index is inactive
        return {x: buffer + cellX * index, y: inactiveY};
    }

    // On every render, update button DOM styles
    letters.forEach((_letter, i) => {
        const el = buttonRefs.current[i];
        if (el) {
            const {x, y} = getPosition(i);
            el.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    return (
        <div style={{ display: (gProps.inGame) ? "block" : "none" }}>
            <div className={styles.countdownDiv}>
                <Countdown date={gProps.endTime}
                    onComplete={() => {
                        setGameOver(true);
                        setWordFeedback("Nice job!");
                        setActiveButtons([]);
                    }}
                    renderer={({ minutes, seconds, completed }) => {
                        if (completed) {
                            return <span className={styles.countdownText}>Time's Up!</span>;
                        } else {
                            return <span className={styles.countdownText}>
                                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </span>;
                        }
                    }}
                />
            </div>
            <div className={styles.pointsDiv}>
                <span className={styles.pointsText}>Score: {totalPoints}</span>
            </div>
            <div className={`relative w-full h-50 border ${styles.letterDiv}`}>
                <button className={`${styles.submitButton} ${gameOver ? styles.buttonUnready : styles.buttonReady}`}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                
                {letters.map((letter, i) => (
                    <button
                        key={i}
                        ref={(el) => (buttonRefs.current[i] = el)}
                        onClick={() => handleLetterClick(i)}
                        className="absolute px-4 py-2 bg-blue-500 text-white rounded-lg transition-transform duration-150 ease-in-out will-change-transform"
                        style={{transform: `translate(${buffer + cellX * i}px, ${inactiveY}px)`}}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            <div className={styles.feedbackDiv}>
                {wordFeedback}
            </div>
        </div>
    );
}
