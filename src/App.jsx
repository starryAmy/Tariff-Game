import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]); // this is the history of the game turns
  function handlePlayer(rowIndex, colIndex) {
    setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    // this arrow function is a callback that takes the previous state and returns the new state
    setGameTurns((prevTurns) => {
      let currentPlayer = "X"; // default player
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O"; // if the first player is X, then the current player is O
      }
      const updatedTurns = [
        { square: { col: colIndex, row: rowIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard handlePlayer={handlePlayer} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
