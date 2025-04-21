export default function GameOver({ winner, onRestart, players }) {
  function handleWinner(winner) {
    switch (winner) {
      case "Trump":
        return `Trump ${players[winner]} wins!`;
      case "Xi":
        return `Xi Jinping ${players[winner]} wins!`;
      case "Draw":
        return "It's a draw!";
      default:
        return "";
    }
  }
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{handleWinner(winner)}</p>
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
