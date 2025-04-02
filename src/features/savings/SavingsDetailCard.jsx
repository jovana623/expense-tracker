import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { CiPause1 } from "react-icons/ci";
import { RxResume } from "react-icons/rx";
import { getCurrencyEntity } from "../../helpers/currencyFunctions";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PaymentsList from "../payments/PaymentsList";
import AddPayment from "../payments/AddPayment";
import ProgressPercentage from "./ProgressPercentage";
import Menu from "../../ui/Menu";
import CreateSavingGoalForm from "./CreateSavingGoalForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteSaving from "./useDeleteSaving";
import Spinner from "../../ui/Spinner";
import ChangeStatus from "./ChangeStatus";

/* eslint-disable react/prop-types */
function SavingsDetailCard({ currentSaving, currency }) {
  const { amount, goal } = currentSaving;
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
              <Menu.Toggle id={currentSaving.id} />
              <Menu.List id={currentSaving.id}>
                <Modal.OpenButton opens="update-saving">
                  <Menu.Button icon={<BiSolidPencil />}>Update</Menu.Button>
                </Modal.OpenButton>
                <Modal.OpenButton opens="delete-saving">
                  <Menu.Button icon={<AiOutlineDelete />}>Delete</Menu.Button>
                </Modal.OpenButton>
                <Modal.OpenButton opens="change-status">
                  <Menu.Button
                    icon={
                      currentSaving.status === "In progress" ? (
                        <CiPause1 />
                      ) : (
                        <RxResume />
                      )
                    }
                  >
                    {currentSaving.status === "In progress"
                      ? "Put on hold"
                      : "Resume"}
                  </Menu.Button>
                </Modal.OpenButton>
              </Menu.List>
              <Modal.Window name="update-saving">
                <CreateSavingGoalForm savingToUpdate={currentSaving} />
              </Modal.Window>
              <Modal.Window name="delete-saving">
                <ConfirmDelete
                  nameModal="saving goal"
                  onConfirm={() => deleteSaving(currentSaving.id)}
                />
              </Modal.Window>
              <Modal.Window name="change-status">
                <ChangeStatus currentSaving={currentSaving} />
              </Modal.Window>
            </Menu>
          </Modal>
        </div>
      </div>

      <ProgressPercentage currentSaving={currentSaving} />
      <div
        className={`flex gap-2 ${
          currentSaving.status === "Completed" ? "flex-col items-center" : ""
        }`}
      >
        <Modal>
          <Modal.OpenButton opens="details">
            <Button type="secondary">See details</Button>
          </Modal.OpenButton>
          <Modal.Window name="details">
            <PaymentsList saving={currentSaving} currency={formattedCurrency} />
          </Modal.Window>
        </Modal>
        {currentSaving.status === "Completed" ? (
          <p className="text-stone-500">You have reached goal amount</p>
        ) : currentSaving.status === "On hold" ? (
          <></>
        ) : (
          <Modal>
            <Modal.OpenButton opens="add-saving">
              <Button type="primary">Add to this saving</Button>
            </Modal.OpenButton>
            <Modal.Window name="add-saving">
              <AddPayment saving={currentSaving} />
            </Modal.Window>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default SavingsDetailCard;
