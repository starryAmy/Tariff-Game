import Bar from "./Bar";
import Quote from "./Quote";

export default function Fund({
  player,
  gameTurns,
  deriveFund,
  isActive,
  winner,
}) {
  const character =
    player === "Trump"
      ? "https://res.cloudinary.com/dawxkhlcq/image/upload/v1745396192/trump_ihfupa.png"
      : "https://res.cloudinary.com/dawxkhlcq/image/upload/v1745396192/xi_ybdspc.png";
  const afterClickStatus = !winner ? !isActive : winner === player;

  return (
    <div id="fund">
      <img
        src={character}
        alt="character"
        className={`character-pic ${
          gameTurns.length > 0 && afterClickStatus ? "active" : ""
        }`}
      />
      <Bar gameTurns={gameTurns} deriveFund={deriveFund} player={player} />

      {afterClickStatus && gameTurns.length > 0 && (
        <Quote gameTurns={gameTurns} player={player} />
      )}
    </div>
  );
}
