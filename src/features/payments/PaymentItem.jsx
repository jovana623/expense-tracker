import { formatDate } from "../../helpers/dateFunctions";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeletePayment } from "./useDeletePayment";

/* eslint-disable react/prop-types */
function PaymentItem({ payment }) {
  const { deletePayment, isDeletingPayment } = useDeletePayment();

  const handleDelete = () => {
    console.log("Delete button clicked");
    deletePayment(payment.id);
  };

  return (
    <div className="grid grid-cols-[4fr_4fr_1fr] gap-10 border-b border-stone-200 py-2 my-2 justify-between">
      <p>{formatDate(payment.date)}</p>
      <p className="self-item-center">
        {payment.amount.toLocaleString()}&euro;
      </p>

      <Modal>
        <Modal.OpenButton opens="delete-payment">
          <button disabled={isDeletingPayment}>
            <AiOutlineDelete />
          </button>
        </Modal.OpenButton>
        <Modal.Window name="delete-payment">
          <ConfirmDelete nameModal="payment" onConfirm={handleDelete} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default PaymentItem;
