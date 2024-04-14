import AllSavings from "./AllSavings";
import Modal from "../../ui/Modal";

/* eslint-disable react/prop-types */
function SeeAllSavings({ activeSaving, onCardChange }) {
  return (
    <Modal>
      <Modal.OpenButton opens="all-savings">
        <div className="flex justify-center">
          <button className="w-[90%] rounded-md shadow py-16">
            See all savings
          </button>
        </div>
      </Modal.OpenButton>
      <Modal.Window name="all-savings">
        <AllSavings activeSaving={activeSaving} onCardChange={onCardChange} />
      </Modal.Window>
    </Modal>
  );
}

export default SeeAllSavings;
