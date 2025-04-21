import { useState, useEffect } from "react";

export default function Fund({ player, gameTurns, deriveFund }) {
  const [fund, setFund] = useState(20000);

  useEffect(() => {
    let remainingFund = deriveFund(gameTurns, player);
    setFund(remainingFund);
  }, [gameTurns.length]);

  return (
    <div id="fund">
      <h2>{fund} USD</h2>
    </div>
  );
}
