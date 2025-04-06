import { getCurrencyEntity } from "../../helpers/currencyFunctions";
import { handleDownloadPDF } from "../../helpers/pdfDownload";
import { goalSummary, summary } from "../../helpers/sortTransactions";
import { useSavings } from "../savings/useSavings";
import { useTypeByMonth } from "../statistics/useTypeByMonth";
import ChartCard from "../../ui/ChartCard";
import Spinner from "../../ui/Spinner";
import PaymentsList from "../payments/PaymentsList";
import SavingCard from "../savings/SavingsCard";
import CategoryChart from "../statistics/CategoryChart";
import SavingsContainer from "../statistics/SavingsContainer";
import ReportCard from "./ReportCard";

function SavingsReport() {
  const { savings, isLoading } = useSavings();
  const { data: typeData, isLoading: isLoadingType } =
    useTypeByMonth("Savings");

  const currency = localStorage.getItem("currency");

  if (isLoading || isLoadingType) return <Spinner />;

  const currentDate = new Date();

  const savingsSummary = summary(savings);
  const savingGoalsSummary = goalSummary(savings);
  const percentageSaved = ((savingsSummary / savingGoalsSummary) * 100).toFixed(
    1
  );

  return (
    <div className="flex flex-col gap-8 p-6 w-[95%] md:w-[90%] mx-auto bg-gray-50 rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center p-5 rounded-md shadow-md dark:bg-gray-700">
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Savings Report
        </p>
        <button
          onClick={() => handleDownloadPDF("Savings", currentDate)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        >
          Download PDF
        </button>
      </div>
      <div id="pdf-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-800 dark:shadow-none">
            <SavingsContainer currency={currency} />
          </div>
          <div className="grid grid-row-[15_fr_15fr_20fr] gap-5">
            <div className="grid grid-rows-3 gap-4">
              <ReportCard
                title="Amount Saved"
                amount={savingsSummary}
                unit={currency}
              />

              <ReportCard
                title="Amount Left"
                amount={savingGoalsSummary - savingsSummary}
                unit={currency}
              />

              <ReportCard
                title="Current progress"
                amount={percentageSaved}
                unit="%"
              />
            </div>
            <ChartCard>
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-100">
                Payments over time
              </div>
              <CategoryChart data={typeData} currency={currency} />
            </ChartCard>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savings.map((saving) => (
            <div
              key={saving.id}
              className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md border border-gray-200 dark:bg-gray-800 dark:border-stone-600"
            >
              <SavingCard
                saving={saving}
                currency={getCurrencyEntity(currency)}
              />
              <PaymentsList
                saving={saving}
                currency={getCurrencyEntity(currency)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavingsReport;
