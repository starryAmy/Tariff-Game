import Trump from "../assets/trump.png";
import Xi from "../assets/xi.png";
import Bar from "./Bar";
import Quote from "./Quote";

export default function Fund({
  player,
  gameTurns,
  deriveFund,
  isActive,
  winner,
}) {
  const character = player === "Trump" ? Trump : Xi;
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
