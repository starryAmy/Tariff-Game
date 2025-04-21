import { useState, useEffect } from "react";

export default function Fund({ player, gameTurns }) {
  const [fund, setFund] = useState(20000);

  useEffect(() => {
    const damage = gameTurns
      .filter((turn) => turn.player !== player)
      .reduce((sum, turn) => sum + 50 * turn.tax, 0);
    setFund(20000 - damage);
  }, [player, gameTurns]);

  return (
    <div id="fund">
      <h2>{fund} USD</h2>
    </div>
  );
}
