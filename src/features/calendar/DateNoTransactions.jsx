import Modal from "../../ui/Modal";

function DateNoTransactions() {
  return (
    <Modal>
      <Modal.OpenButton opens="day">
        <button className="absolute bg-transparent top-0 left-0 h-full w-full"></button>
      </Modal.OpenButton>
      <Modal.Window
        name="day"
        onClick={(e) => e.stopPropagation()}
      ></Modal.Window>
    </Modal>
  );
}

export default DateNoTransactions;
