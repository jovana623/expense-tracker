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
        } gap-3 font-semibold text-stone-500 py-3 justify-center items-center transition-all duration-300 border-t-[1px] border-gray-200`}
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
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="h-full">
          {data.map((transaction) => (
            <TableRow transaction={transaction} key={transaction.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Table;
