import SavingsChart from "./SavingsChart";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import PaymentsList from "./PaymentsList";
import AddToSavingForm from "./AddToSavingForm";

/* eslint-disable react/prop-types */
function SavingsDetailCard({ saving, onClick }) {
  const { id, Amount, Goal } = saving;
  //const percentage = ((Amount * 100) / Goal).toFixed(0);
  return (
    <div
      className="relative shadow rounded-md flex flex-col items-center py-3"
      onClick={() => onClick(id)}
    >
      <div className="flex flex-col items-center gap-1">
        <p className="text-stone-500">You have reached</p>
        <h1 className="text-2xl font-semibold">{Amount}&euro;</h1>
        <p className="text-stone-500">of your {Goal}&euro; saving goal</p>
      </div>
      <SavingsChart saving={saving} />
      <div className="flex gap-2">
        <Modal>
          <Modal.OpenButton opens="details">
            <Button type="secondary">See details</Button>
          </Modal.OpenButton>
          <Modal.Window name="details">
            <PaymentsList saving={saving} />
          </Modal.Window>
        </Modal>
        <Modal>
          <Modal.OpenButton opens="add-saving">
            <Button type="primary">Add to this saving</Button>
          </Modal.OpenButton>
          <Modal.Window name="add-saving">
            <AddToSavingForm saving={saving} />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default SavingsDetailCard;
