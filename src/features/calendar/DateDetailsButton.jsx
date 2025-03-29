import Modal from "../../ui/Modal";
import DateDetails from "./DateDetails";

/* eslint-disable react/prop-types */
function DateDetailsButton({ data, currency }) {
  return (
    <Modal>
      <Modal.OpenButton opens="day">
        <button className="absolute bg-transparent top-0 left-0 h-full w-full"></button>
      </Modal.OpenButton>
      <Modal.Window name="day" onClick={(e) => e.stopPropagation()}>
        <DateDetails data={data} currency={currency} />
      </Modal.Window>
    </Modal>
  );
}

export default DateDetailsButton;
