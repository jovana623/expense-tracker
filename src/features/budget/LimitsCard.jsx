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

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-700">
      <div className="px-5 py-3 flex justify-between items-center">
        <h3 className="text-zinc-900 text-lg dark:text-lightBg">
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
      <div className="px-5 pb-5">
        <div className="w-full bg-zinc-200 rounded-full h-2.5">
          {data.percentage > 100 ? (
            <div className="bg-red-600 h-2.5 rounded-full w-[100%]"></div>
          ) : (
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${data.percentage}%` }}
            ></div>
          )}
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-zinc-600 dark:text-gray-200">
            {data.percentage.toFixed(0)}&#x25;
          </span>
          <span className="text-sm text-zinc-600 dark:text-gray-200">
            {data.total.toLocaleString()}
            {getCurrencyEntity(currency)}/{data.amount.toLocaleString()}
            {getCurrencyEntity(currency)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default LimitsCard;
