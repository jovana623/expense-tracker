import SavingsChart from "./SavingsChart";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PaymentsList from "../payments/PaymentsList";
import AddPayment from "../payments/AddPayment";

/* eslint-disable react/prop-types */
function SavingsDetailCard({ saving }) {
  const { amount, goal } = saving;
  return (
    <div className="relative shadow rounded-md flex flex-col items-center py-3">
      <div className="flex flex-col items-center gap-1">
        <p className="text-stone-500">You have reached</p>
        <h1 className="text-2xl font-semibold">
          {amount.toLocaleString()}&euro;
        </h1>
        <p className="text-stone-500">
          of your {goal.toLocaleString()}&euro; saving goal
        </p>
      </div>
      <SavingsChart saving={saving} />
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
            <PaymentsList saving={saving} />
          </Modal.Window>
        </Modal>
        {saving.status === "Completed" ? (
          <p className="text-stone-500">You have reached goal amount</p>
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
