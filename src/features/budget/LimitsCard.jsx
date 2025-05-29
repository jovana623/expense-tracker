import { BiSolidPencil } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteBudget } from "./useDeleteBudget";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateBudgetForm from "./CreateBudgetForm";
import BudgetTransactionTable from "./BudgetTransactionsTable";

/* eslint-disable react/prop-types */
function LimitsCard({ data, currency }) {
  const { deleteBudget } = useDeleteBudget();

  const cappedPercentage = Math.min(data.percentage, 100);
  const progressBarColor =
    data.percentage > 100
      ? "bg-red-500 dark:bg-red-500"
      : "bg-blue-500 dark:bg-blue-500";
  const percentageTextColor =
    data.percentage > 100
      ? "text-red-500 dark:text-red-400"
      : "text-blue-500 dark:text-blue-400";

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden dark:bg-gray-700 dark:border dark:border-gray-600 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.005]">
      <div className="px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {data.type.name}
        </h3>
        <Modal>
          <Menu>
            <Menu.Toggle id={data.id} />
            <Menu.List id={data.id}>
              <Modal.OpenButton opens="update-budget">
                <Menu.Button icon={<BiSolidPencil />}>Update</Menu.Button>
              </Modal.OpenButton>
              <Modal.OpenButton opens="delete-budget">
                <Menu.Button icon={<AiOutlineDelete />}>Delete</Menu.Button>
              </Modal.OpenButton>
              <Modal.OpenButton opens="budget-details">
                <Menu.Button icon={<TbListDetails />}>Details</Menu.Button>
              </Modal.OpenButton>
            </Menu.List>
            <Modal.Window name="update-budget">
              <CreateBudgetForm budgetToUpdate={data} />
            </Modal.Window>
            <Modal.Window name="delete-budget">
              <ConfirmDelete
                nameModal="budget"
                onConfirm={() => {
                  deleteBudget(data.id);
                }}
              />
            </Modal.Window>
            <Modal.Window name="budget-details">
              <BudgetTransactionTable
                type={data.type.id}
                period={data.period}
              />
            </Modal.Window>
          </Menu>
        </Modal>
      </div>

      <div className="px-6 pt-4 pb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-500 rounded-full h-3 mb-2">
          <div
            className={`${progressBarColor} h-3 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${cappedPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className={`text-sm font-medium ${percentageTextColor}`}>
            {data.percentage.toFixed(0)}%
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-semibold">{data.total.toLocaleString()}</span>
            {getCurrencyEntity(currency)} / {data.amount.toLocaleString()}
            {getCurrencyEntity(currency)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LimitsCard;
