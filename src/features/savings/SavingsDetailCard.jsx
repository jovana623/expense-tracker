import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PaymentsList from "../payments/PaymentsList";
import AddPayment from "../payments/AddPayment";
import ProgressPercentage from "./ProgressPercentage";
import Menu from "../../ui/Menu";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiPause1 } from "react-icons/ci";
import { RxResume } from "react-icons/rx";
import CreateSavingGoalForm from "./CreateSavingGoalForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteSaving from "./useDeleteSaving";
import Spinner from "../../ui/Spinner";
import ChangeStatus from "./ChangeStatus";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

/* eslint-disable react/prop-types */
function SavingsDetailCard({ saving, currency }) {
  const { amount, goal } = saving;
  const { mutate: deleteSaving, isLoading } = useDeleteSaving();
  const formattedCurrency = getCurrencyEntity(currency);

  if (isLoading) return <Spinner />;
  return (
    <div className="relative shadow rounded-md flex flex-col items-center py-3 gap-5">
      <div className="flex">
        <div className="flex flex-col items-center gap-1">
          <p className="text-stone-500">You have reached</p>
          <h1 className="text-2xl font-semibold">
            {amount.toLocaleString()}
            {formattedCurrency}
          </h1>
          <p className="text-stone-500">
            of your {goal.toLocaleString()}
            {formattedCurrency} saving goal
          </p>
        </div>
        <div className="absolute top-6 right-5">
          <Modal>
            <Menu>
              <Menu.Toggle id={saving.id} />
              <Menu.List id={saving.id}>
                <Modal.OpenButton opens="update-saving">
                  <Menu.Button icon={<BiSolidPencil />}>Update</Menu.Button>
                </Modal.OpenButton>
                <Modal.OpenButton opens="delete-saving">
                  <Menu.Button icon={<AiOutlineDelete />}>Delete</Menu.Button>
                </Modal.OpenButton>
                <Modal.OpenButton opens="change-status">
                  <Menu.Button
                    icon={
                      saving.status === "In progress" ? (
                        <CiPause1 />
                      ) : (
                        <RxResume />
                      )
                    }
                  >
                    {saving.status === "In progress" ? "Put on hold" : "Resume"}
                  </Menu.Button>
                </Modal.OpenButton>
              </Menu.List>
              <Modal.Window name="update-saving">
                <CreateSavingGoalForm savingToUpdate={saving} />
              </Modal.Window>
              <Modal.Window name="delete-saving">
                <ConfirmDelete
                  nameModal="saving goal"
                  onConfirm={() => deleteSaving(saving.id)}
                />
              </Modal.Window>
              <Modal.Window name="change-status">
                <ChangeStatus saving={saving} />
              </Modal.Window>
            </Menu>
          </Modal>
        </div>
      </div>

      <ProgressPercentage saving={saving} />
      <div
        className={`flex gap-2 ${
          saving.status === "Completed" ? "flex-col items-center" : ""
        }`}
      >
        <Modal>
          <Modal.OpenButton opens="details">
            <Button type="secondary">See details</Button>
          </Modal.OpenButton>
          <Modal.Window name="details">
            <PaymentsList saving={saving} currency={formattedCurrency} />
          </Modal.Window>
        </Modal>
        {saving.status === "Completed" ? (
          <p className="text-stone-500">You have reached goal amount</p>
        ) : saving.status === "On hold" ? (
          <></>
        ) : (
          <Modal>
            <Modal.OpenButton opens="add-saving">
              <Button type="primary">Add to this saving</Button>
            </Modal.OpenButton>
            <Modal.Window name="add-saving">
              <AddPayment saving={saving} />
            </Modal.Window>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default SavingsDetailCard;
