import { useState } from "react";

import styles from "./Game.module.css";

type GameProps = {
    inGame: boolean
}

export default function GamePane(props: GameProps) {
    const [row, setRow] = useState(1);
    const [col, setCol] = useState(1);

    const possibleClasses = [
        "row-start-1", "row-start-2",
        "col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5",
    ];

    function moveNext() {
        setCol(prev => (prev < 5 ? prev + 1 : 1)); // Move right, wrap at 5
        if (col === 5) setRow(prev => (prev < 2 ? prev + 1 : 1)); // Move down when wrapping
    }

    return (
        <div style={{ display: (props.inGame) ? "block" : "none" }}>
            <div className="grid grid-rows-2 grid-cols-5 gap-4 h-64 border transition-all duration-500 ease-in-out p-4">
                <button
                    onClick={() => {moveNext()}}
                    className={`
                    px-4 py-2 bg-blue-500 text-white rounded-lg
                    transition-all duration-1000 ease-in-out
                    row-start-${row} col-start-${col}
                    `}>
                    A
                </button>
            </div>
        </div>
    );
}