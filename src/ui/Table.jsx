import Spinner from "./Spinner";
import TableRow from "./TableRow";

/* eslint-disable react/prop-types */
function Table({ data, arrow, isLoading }) {
  if (isLoading) return <Spinner />;

  return (
    <div className="shadow overflow-y-scroll h-full pt-2 px-5 rounded-md bg-lightBg w-full">
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1.2fr_0.3fr] gap-3 font-semibold text-stone-500 border-b border-stone-200 py-2 justify-center">
        <div></div>
        <div>Name</div>
        <div>Amout</div>
        <div>Type</div>
        <div className="justify-self-center">Date</div>
        <div></div>
      </div>
      <div>
        {data.map((transaction) => (
          <TableRow
            transaction={transaction}
            key={transaction.id}
            arrow={arrow}
          />
        ))}
      </div>
    </div>
  );
}

export default Table;
