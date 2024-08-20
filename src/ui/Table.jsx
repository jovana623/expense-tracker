import Spinner from "./Spinner";
import TableRow from "./TableRow";

/* eslint-disable react/prop-types */
function Table({ data, isLoading }) {
  if (isLoading) return <Spinner />;
  const isTransactionsPath = location.pathname === "/transactions";

  if (!data) return null;

  return (
    <div className="h-full w-full">
      <div
        className={`grid ${
          isTransactionsPath
            ? "grid-cols-[0.5fr_1.5fr_1fr_1fr_2fr_1.2fr_0.3fr]"
            : "grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr_0.3fr]"
        } gap-3 font-semibold text-stone-500 py-2 justify-center items-center transition-all duration-300`}
      >
        <div></div>
        <div>Name</div>
        <div>Amout</div>
        <div>Type</div>
        {isTransactionsPath ? (
          <div className="justify-self-center">Description</div>
        ) : (
          ""
        )}
        <div className="justify-self-center">Date</div>
        <div></div>
      </div>
      <div className="overflow-y-scroll h-full">
        {data.map((transaction) => (
          <TableRow transaction={transaction} key={transaction.id} />
        ))}
      </div>
    </div>
  );
}

export default Table;
