function BalanceReport() {
  /*
  const [searchParams] = useSearchParams();
  const time = searchParams.get("time") || "";
  const month = searchParams.get("month") || "";
  const sortBy = "date-desc";
  const { transactions, isLoading } = useTransactions(time, month, sortBy);
  const period = new Date();
  let monthData = [];
  let sortedByMonth = [];

  if (isLoading) return <Spinner />;

  if (!isLoading) {
    sortedByMonth = sortByMonth(transactions);
    if (!month) monthData = getCurrentMonthData(transactions);
    else monthData = OneMonth(transactions, month);
  }

  const dailyBalance = calculateDailyBalance(monthData);
  const balance = calculateBalance(sortedByMonth);
  */

  return (
    <div className="flex flex-col gap-5 m-auto w-[80%] mb-10">
      {/*
      <div className="flex flex-col gap-10 my-10">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-xl font-semibold text-gray-800">Balance Report</p>
          <button
            onClick={() => handleDownloadPDF("Balance", period)}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-1"
          >
            Download
          </button>
        </div>
      </div>
      <div id="pdf-content" className="flex flex-col gap-10">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <ChartCard>
            <div></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Balance Overview
              </h3>
              <AreaChartComponent
                data={balance}
                timeValue={time}
                monthData={dailyBalance}
              />
            </div>
          </ChartCard>
        </div>

        <div className="flex flex-col md:flex-row gap-5 bg-gray-100 p-4 rounded-lg shadow-md">
          <ChartCard>
            <div>
              <div></div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Income vs Expenses
              </h3>
              <PositiveAndNegativeBar
                data={sortedByMonth}
                monthData={monthData}
              />
            </div>
          </ChartCard>
          <ChartCard>
            <div></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Monthly Trends
              </h3>
              <LineChartComponent data={sortedByMonth} monthData={monthData} />
            </div>
          </ChartCard>
        </div>
      </div>
      <Table data={transactions} />*/}
    </div>
  );
}

export default BalanceReport;
