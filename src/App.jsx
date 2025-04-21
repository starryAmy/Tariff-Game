import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import Fund from "./components/Fund.jsx";
import { WINNING_COMBINATIONS } from "./winner_combination.js";

const PLAYERS = {
  Trump: "Player 1",
  Xi: "Player 2",
};
const INITIAL_BOARD_GAME = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const TAXES = [0, 25, 50, 75, 100, 1.25, 1.5, 1.75, 200];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "Trump";
  if (gameTurns.length > 0 && gameTurns[0].player === "Trump") {
    currentPlayer = "Xi";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_BOARD_GAME.map((array) => [...array])]; // deep copy
  // loop through the turns and update the game board
  for (const turn of gameTurns) {
    const { square, player, tax } = turn; // destructuring the square and player from the turn object
    const { row, col } = square;
    gameBoard[row][col] = [tax.toString() + "%", player];
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({ Trump: "Player 1", Xi: "Player 2" }); // this is the player names
  const [gameTurns, setGameTurns] = useState([]); // this is the history of the game turns - source of truth
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns); // this is the game board - derived from the game turns
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner; // this is the draw condition - if all squares are filled and there is no winner

  function handlePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      let randomTax = TAXES[Math.floor(Math.random() * TAXES.length)];
      const updatedTurns = [
        {
          square: { col: colIndex, row: rowIndex },
          player: currentPlayer,
          tax: randomTax,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleNameChange(character, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [character]: newName,
      };
    });
  }
  function handleRematch() {
    setGameTurns([]);
  }
  return (
    <main>
      <Fund />
      <div>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.Trump}
              isActive={activePlayer === "Trump"}
              onNameChange={handleNameChange}
              character="Trump"
            />
            <Player
              initialName={PLAYERS.Xi}
              isActive={activePlayer === "Xi"}
              onNameChange={handleNameChange}
              character="Xi Jinping"
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver winner={winner} onRestart={handleRematch} />
          )}
          <GameBoard handlePlayer={handlePlayer} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </div>
      <Fund />
    </main>
  );
}

export default App;
