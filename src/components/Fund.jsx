import { useState } from "react";
export default function Fund({ player, gameTurns }) {
  const [fund, setFund] = useState(20000);
  return (
    <div id="fund">
      <h2>{fund}USD</h2>
    </div>
  );
}
