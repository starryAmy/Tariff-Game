import { useState, useEffect } from "react";
import Trump from "../assets/trump.png";
import Xi from "../assets/xi.png";

export default function Fund({
  player,
  gameTurns,
  deriveFund,
  isActive,
  winner,
}) {
  const [fund, setFund] = useState(20000);
  const character = player === "Trump" ? Trump : Xi;
  let active;
  if (!winner) {
    active = !isActive;
  } else if (winner && winner === player) {
    active = true;
  } else if (winner && winner !== player) {
    active = false;
  }

  useEffect(() => {
    let remainingFund = deriveFund(gameTurns, player);
    setFund(remainingFund);
    console.log(gameTurns);
  }, [gameTurns.length]);

  return (
    <div id="fund">
      <img
        src={character}
        alt="character"
        className={`character-pic ${active ? "active" : ""}`}
      />
      <div className="fund-bar-wrapper">
        <div className="fund-bar-text">
          <div className="fund-bar">
            <div
              className="fund-bar-fill"
              style={{
                width: `${Math.max((fund / 20000) * 100, 0)}%`,
                backgroundColor: player === "Trump" ? "#345E82" : "#DC5018",
              }}
            ></div>
          </div>
          <p
            className="fund-text"
            style={{ color: player === "Trump" ? "#345E82" : "#DC5018" }}
          >
            {Math.max(fund, 0)} USD
          </p>
        </div>
      </div>
      <div id="quotes">
        {active && (
          <p style={{ color: player === "Trump" ? "#345E82" : "#DC5018" }}>
            {gameTurns.length > 0 ? gameTurns[0].quote : ""}
          </p>
        )}
      </div>
    </div>
  );
}
