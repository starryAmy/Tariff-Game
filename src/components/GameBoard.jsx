export default function GameBoard({ handlePlayer, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handlePlayer(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                  className={
                    playerSymbol?.[1] === "Trump"
                      ? "blue-square"
                      : playerSymbol?.[1] === "Xi"
                      ? "red-square"
                      : ""
                  }
                >
                  {playerSymbol ? playerSymbol[0] : ""}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
