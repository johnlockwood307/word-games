export default function HowToPlay() {
    return (<>
        <h1 style={{ fontSize: "32px" }}>How to Play</h1>
        <br/>
        <p>You will be given 6 random letters and 1 minute to form words without repeating letters.
            Longer words are worth more points. Words must be at least 3 letters long.
        </p>
        <br/>
        <p>
            Click letters in the sequence you want and they will be moved to the staging area.
            Click a letter to remove it from the staging area, or click reset to remove all letters.
            Click submit to enter a word.
        </p>
        <br/>
        <p>Inspired by GamePigeon.</p>
    </>);
}