import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Fund from "./components/Fund.jsx";
import { TRUMPQUOTES, XIQUOTES } from "../quotes.js";

const PLAYERS = {
  Trump: "Player 1",
  Xi: "Player 2",
};
const INITIAL_BOARD_GAME = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const TAXES = [0, 25, 50, 75, 100, 125, 150, 175, 200];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "Trump";
  if (gameTurns.length > 0 && gameTurns[0].player === "Trump") {
    currentPlayer = "Xi";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_BOARD_GAME.map((array) => [...array])]; // deep copy
  for (const turn of gameTurns) {
    const { square, player, tax } = turn;
    const { row, col } = square;
    gameBoard[row][col] = [tax.toString() + "%", player];
  }
  return gameBoard;
}

function deriveFund(gameTurns, player) {
  const initialFund = 20000;
  const damage = gameTurns
    .filter((turn) => turn.player !== player)
    .reduce((sum, turn) => sum + 50 * turn.tax, 0);
  let remainingFund = initialFund - damage;
  return remainingFund;
}

function deriveWinner(gameTurns) {
  let winner;
  let trumpFund = deriveFund(gameTurns, "Trump");
  let xiFund = deriveFund(gameTurns, "Xi");
  if (trumpFund <= 0) {
    winner = "Xi";
  } else if (xiFund <= 0) {
    winner = "Trump";
  } else if (gameTurns.length === 9 && trumpFund === xiFund) {
    winner = "Draw";
  } else if (gameTurns.length === 9 && trumpFund > xiFund) {
    winner = "Trump";
  } else if (gameTurns.length === 9 && trumpFund < xiFund) {
    winner = "Xi";
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState({ Trump: "Player 1", Xi: "Player 2" }); // this is the player names
  const [gameTurns, setGameTurns] = useState([]); // this is the history of the game turns - source of truth
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns); // this is the game board - derived from the game turns
  const winner = deriveWinner(gameTurns);

  function handlePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      let randomTax = TAXES[Math.floor(Math.random() * TAXES.length)];
      let randomQuote = Math.floor(Math.random() * 10);
      const updatedTurns = [
        {
          square: { col: colIndex, row: rowIndex },
          player: currentPlayer,
          tax: randomTax,
          quote:
            currentPlayer === "Trump"
              ? TRUMPQUOTES[randomQuote]
              : XIQUOTES[randomQuote],
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
      <Fund
        player="Trump"
        gameTurns={gameTurns}
        deriveFund={deriveFund}
        isActive={activePlayer === "Trump"}
        winner={winner}
      />
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
              character="Xi"
            />
          </ol>
          {winner && (
            <GameOver
              winner={winner}
              onRestart={handleRematch}
              players={players}
            />
          )}
          <GameBoard handlePlayer={handlePlayer} board={gameBoard} />
        </div>
      </div>
      <Fund
        player="Xi"
        gameTurns={gameTurns}
        deriveFund={deriveFund}
        isActive={activePlayer === "Xi"}
        winner={winner}
      />
    </main>
  );
}

export default App;
