import { useState, useEffect } from "react";
import Trump from "../assets/trump.png";
import Xi from "../assets/xi.png";

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
      <h2>{fund} USD</h2>
    </div>
  );
}
