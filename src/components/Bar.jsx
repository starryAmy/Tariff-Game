import { useEffect, useState } from "react";
export default function Bar({ gameTurns, deriveFund, player }) {
  const [fund, setFund] = useState(20000);

  useEffect(() => {
    let remainingFund = deriveFund(gameTurns, player);
    setFund(remainingFund);
  }, [gameTurns.length]);

  return (
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
  );
}
