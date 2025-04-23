// import picture from cloudinary
const QuoteLeft =
  "https://res.cloudinary.com/dawxkhlcq/image/upload/f_auto,q_auto/v1745396142/quote-left_qoymbm.png";
const QuoteRight =
  "https://res.cloudinary.com/dawxkhlcq/image/upload/f_auto,q_auto/v1745396142/quote-right_ph9n8e.png";
const QuoteLeftTrump =
  "https://res.cloudinary.com/dawxkhlcq/image/upload/f_auto,q_auto/v1745396142/quote-left-trump_po4tfy.png";
const QuoteRightTrump =
  "https://res.cloudinary.com/dawxkhlcq/image/upload/f_auto,q_auto/v1745396142/quote-right-trump_ezzt8e.png";

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
