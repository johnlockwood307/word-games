export default function HowToPlay() {
    return (<>
        <h1 style={{ fontSize: "32px" }}>How to Play</h1>
        <br/>
        <p>You will be given 6 random letters and 1 minute to form words without repeating letters.
            Longer words are worth more points. Words must be at least 3 letters long.
        </p>
        <br/>
        <p>
            Click letter buttons in the sequence you want and they will be moved to the staging area.
            Click a letter to remove it from the staging area.
            Click the submit button to enter a word.
        </p>
        <br/>
        <p>
            You can also use keyboard input. Press a letter's key to move it to and from the staging area.
            Press backspace to remove the last active letter.
            Press enter or space to enter a word.
        </p>
        <br/>
        <p>Inspired by GamePigeon.</p>
    </>);
}