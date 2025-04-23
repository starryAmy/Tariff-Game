import { useState, useEffect } from "react";
import Trump from "../assets/trump.png";
import Xi from "../assets/xi.png";
import QuoteLeft from "../assets/quote-left.png";
import QuoteRight from "../assets/quote-right.png";
import QuoteRightTrump from "../assets/quote-right-trump.png";
import QuoteLeftTrump from "../assets/quote-left-trump.png";

function deriveQuoteIcon(player) {
  return player === "Trump"
    ? [QuoteLeft, QuoteRight]
    : [QuoteLeftTrump, QuoteRightTrump];
}
export default function Fund({
  player,
  gameTurns,
  deriveFund,
  isActive,
  winner,
}) {
  const [fund, setFund] = useState(20000);
  const character = player === "Trump" ? Trump : Xi;
  const afterClickStatus = !winner ? !isActive : winner === player;

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
        className={`character-pic ${
          gameTurns.length > 0 && afterClickStatus ? "active" : ""
        }`}
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

      {afterClickStatus && gameTurns.length > 0 && (
        <div id="quotes" className={`quotes-${player}`}>
          <img src={deriveQuoteIcon(player)[0]} alt="character" />
          <p style={{ color: player === "Trump" ? "#345E82" : "#DC5018" }}>
            {gameTurns[0].quote}
          </p>
          <img
            src={deriveQuoteIcon(player)[1]}
            alt="character"
            style={{ alignSelf: "end" }}
          />
        </div>
      )}
    </div>
  );
}
