import { useEffect, useState } from "react";

import styles from "./Game.module.css";

// type GameProps = {
//     inGame: boolean
// }

// type LetterButtonProps = {
//     index: number;
//     letter: string;
// }


export default function GamePane(gProps) {
    const [positions, setPositions] = useState([
        "translate-x-0 translate-y-24",
        "translate-x-24 translate-y-24",
        "translate-x-48 translate-y-24"
    ]);
    // const [buttonsActive, setButtonsActive] = useState([false, false]);

    // list of button indices that are active
    const [activeButtons, setActiveButtons] = useState([]);
    
    const letters = "ABC";
    const numLetters = letters.length;


    function LetterButton(lbProps) {
        return (
            <button onClick={() => handleClick(lbProps.index)}
                className={`absolute px-4 py-2 bg-blue-500 text-white
                    rounded-lg transition-all duration-200 ease-in-out
                    ${positions[lbProps.index]}`}>
                {lbProps.letter}
            </button>
        );
    }

    function handleClick(index) {
        // const newButtonsActive = buttonsActive.map((isActive, i) => i == index ? !isActive : isActive);
        // const newPositions = [];
        // for (let i = 0; i < numLetters; i++) {
        //     if (newButtonsActive[i]) {
        //         // active position. y = 0 for first row. x is variable depending on number of other active buttons.
        //         if (i == index) {
        //             // if i == index, i was just clicked and is now active. count # other active and move it accordingly.
        //             const numActive = newButtonsActive.filter(isActive => isActive).length;
        //             newPositions.push(`translate-x-${24 * numActive} translate-y-0`);
        //         } else {
        //             // otherwise, i was and is still active. keep position the same.
        //             newPositions.push(positions[i]);
        //         }
        //     } else {
        //         // inactive (default) position. y = 24 for second row. x is variable depending on index
        //         newPositions.push(`translate-x-${24 * i} translate-y-24`);
        //     }
        // }
        // setPositions(newPositions);
        // setButtonsActive(newButtonsActive);

        if (activeButtons.includes(index)) {
            // remove from activeButtons
            setActiveButtons(prevActiveButtons => prevActiveButtons.filter((_isActive, i) => i !== index))
        } else {
            // append to activeButtons
            setActiveButtons(prevActiveButtons => [...prevActiveButtons, index]);
        }
    }

    // useEffect with dependency on activeButtons to update positions
    useEffect(() => {
        
    }, [activeButtons]);

    return (
        <div style={{ display: (gProps.inGame) ? "block" : "none" }}>
            <div className="relative w-full h-64 border flex">
                <LetterButton index={0} letter={letters[0]}/>
                <LetterButton index={1} letter={letters[1]}/>
                <LetterButton index={2} letter={letters[2]}/>
            </div>
        </div>
    );
}