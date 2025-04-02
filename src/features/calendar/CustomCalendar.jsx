import { useState } from "react";
import { useTransactions } from "../transactions/useTransactions";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Spinner from "../../ui/Spinner";
import DateDetailsButton from "./DateDetailsButton";
import DateNoTransactions from "./DateNoTransactions";

function CustomCalendar() {
  const { transactions, isLoading } = useTransactions();
  const [currentDate, setCurrentDate] = useState(null);

  const currency = localStorage.getItem("currency");

  function showTransaction(date) {
    const dateCal = date.toLocaleDateString("en-CA");
    const dayTransactions = transactions.filter(
      (transaction) => transaction.date === dateCal
    );

    return dayTransactions.length > 0 ? (
      <>
        <div className="flex flex-col space-y-1 relative">
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
        <DateDetailsButton
          data={dayTransactions}
          date={currentDate}
          currency={currency}
        />
      </>
    ) : (
      <DateNoTransactions />
    );
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="w-full h-full">
      <Calendar
        className="my-calendar"
        tileContent={({ date, view }) =>
          view === "month" ? showTransaction(date) : null
        }
        onClickDay={(value) => {
          const date = value.toISOString().split("T")[0];
          setCurrentDate(date);
        }}
      />
    </div>
  );
}

export default CustomCalendar;
