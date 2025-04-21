import { useState, useEffect } from "react";

export default function Fund({ player, gameTurns }) {
  const [fund, setFund] = useState(20000);

  useEffect(() => {
    const filteredTurns = gameTurns.filter((turn) => turn.player !== player);
    const initialFund = 20000;
    let damage = 0;
    for (let i = 0; i < filteredTurns.length; i++) {
      const { tax } = filteredTurns[i];
      damage += 50 * tax;
    }
    const newFund = initialFund - damage;
    setFund(newFund);
  }, [player, gameTurns]);

  return (
    <div id="fund">
      <h2>{fund} USD</h2>
    </div>
  );
}
