import QuoteLeft from "../assets/quote-left.png";
import QuoteRight from "../assets/quote-right.png";
import QuoteRightTrump from "../assets/quote-right-trump.png";
import QuoteLeftTrump from "../assets/quote-left-trump.png";

function deriveQuoteIcon(player) {
  return player === "Trump"
    ? [QuoteLeft, QuoteRight]
    : [QuoteLeftTrump, QuoteRightTrump];
}

export default function Quote({ gameTurns, player }) {
  return (
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
  );
}
