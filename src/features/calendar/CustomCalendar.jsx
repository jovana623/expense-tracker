import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useTransactions } from "../transactions/useTransactions";
import Spinner from "../../ui/Spinner";

function CustomCalendar() {
  const { transactions, isLoading } = useTransactions();

  function showTransaction(date) {
    const dateCal = date.toISOString().split("T")[0];
    const dayTransactions = transactions.filter(
      (transaction) => transaction.date === dateCal
    );
    return dayTransactions.length > 0 ? (
      <div className="flex flex-col space-y-1">
        {dayTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`text-xs p-1 text-white ${
              transaction.type.category.name === "Income"
                ? "bg-green-500"
                : "bg-red-500"
            } rounded-md`}
          >
            {transaction.name}
          </div>
        ))}
      </div>
    ) : null;
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full">
      <Calendar
        className="my-calendar"
        tileContent={({ date, view }) =>
          view === "month" ? showTransaction(date) : null
        }
      />
    </div>
  );
}

export default CustomCalendar;
