import FlipCardBack from "./FlipCardBack";
import FlipCardFront from "./FlipCardFront";

/* eslint-disable react/prop-types */
function FlipCard({ titleFront, titleBack, transaction, avg }) {
  return (
    <div className="card w-full">
      <div className="card__content relative p-20 transition-transform duration-1000 text-black font-bold rounded-2xl">
        <div className="card__front absolute top-0 bottom-0 h-full right-0 left-0 rounded-2xl">
          <FlipCardFront title={titleFront} avg={avg.toFixed(2)} />
        </div>
        <div className="card__back absolute top-0 bottom-0 right-0 h-full left-0 rounded-2xl">
          <FlipCardBack title={titleBack} transaction={transaction} />
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
