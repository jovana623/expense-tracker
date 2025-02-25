import Modal from "../../ui/Modal";
import DateDetails from "./DateDetails";

/* eslint-disable react/prop-types */
function DateDetailsButton({ data, date, currency }) {
  return (
    <Modal>
      <Modal.OpenButton opens="day">
        <button className="absolute bg-transparent top-0 left-0 h-full w-full"></button>
      </Modal.OpenButton>
      <Modal.Window name="day" onClick={(e) => e.stopPropagation()}>
        <DateDetails data={data} date={date} currency={currency} />
      </Modal.Window>
    </Modal>
  );
}

export default DateDetailsButton;
