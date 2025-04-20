import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  function handlePlayer() {
    setActivePlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
    // this arrow function is a callback that takes the previous state and returns the new state
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
        <GameBoard
          handlePlayer={handlePlayer}
          activePlayerSymbol={activePlayer}
        />
      </div>
      Log
    </main>
  );
}

export default App;
