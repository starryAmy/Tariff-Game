import { useState, useEffect } from "react";
import Trump from "../assets/trump.png";
import Xi from "../assets/xi.png";
import Coin from "../assets/coin.png";

export default function Fund({ player, gameTurns, deriveFund }) {
  const [fund, setFund] = useState(20000);
  const character = player === "Trump" ? Trump : Xi;

  useEffect(() => {
    let remainingFund = deriveFund(gameTurns, player);
    setFund(remainingFund);
  }, [gameTurns.length]);

  return (
    <div id="fund">
      <img src={character} alt="Trump" className="character-pic" />
      <div className="fund-bar-wrapper">
        <div className="fund-bar-text">
          <div className="fund-bar">
            <div
              className="fund-bar-fill"
              style={{
                width: `${Math.max((fund / 20000) * 100, 0)}%`,
                backgroundColor: player === "Trump" ? "blue" : "red",
              }}
            ></div>
          </div>
          <p className="fund-text">{Math.max(fund, 0)} USD</p>
        </div>
      </div>
    </div>
  );
}
