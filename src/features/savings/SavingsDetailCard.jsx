import SavingsChart from "./SavingsChart";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PaymentsList from "./PaymentsList";
import AddToSavingForm from "./AddToSavingForm";

/* eslint-disable react/prop-types */
function SavingsDetailCard({ saving }) {
  const { Amount, Goal } = saving;
  return (
    <div className="relative shadow rounded-md flex flex-col items-center py-3">
      <div className="flex flex-col items-center gap-1">
        <p className="text-stone-500">You have reached</p>
        <h1 className="text-2xl font-semibold">
          {Amount.toLocaleString()}&euro;
        </h1>
        <p className="text-stone-500">
          of your {Goal.toLocaleString()}&euro; saving goal
        </p>
      </div>
      <SavingsChart saving={saving} />
      <div
        className={`flex gap-2 ${
          saving.Status === "Completed" ? "flex-col items-center" : ""
        }`}
      >
        <Modal>
          <Modal.OpenButton opens="details">
            <Button type="secondary">See details</Button>
          </Modal.OpenButton>
          <Modal.Window name="details">
            <PaymentsList saving={saving} />
          </Modal.Window>
        </Modal>
        {saving.Status === "Completed" ? (
          <p className="text-stone-500">You have reached goal amount</p>
        ) : (
          <Modal>
            <Modal.OpenButton opens="add-saving">
              <Button type="primary">Add to this saving</Button>
            </Modal.OpenButton>
            <Modal.Window name="add-saving">
              <AddToSavingForm saving={saving} />
            </Modal.Window>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default SavingsDetailCard;
