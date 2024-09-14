import { formatDate } from "../../helpers/dateFunctions";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeletePayment } from "./useDeletePayment";

/* eslint-disable react/prop-types */
function PaymentItem({ payment }) {
  const { deletePayment, isDeletingPayment } = useDeletePayment();

  const { id } = payment;

  function handleDelete(id) {
    deletePayment(id);
  }

  return (
    <div className="grid grid-cols-[4fr_4fr_1fr] gap-10 border-b border-stone-200 py-2 my-2 justify-between">
      <p>{formatDate(payment.date)}</p>
      <p className="self-item-center">
        {payment.amount.toLocaleString()}&euro;
      </p>
      <p>
        <button onClick={() => handleDelete(id)} disabled={isDeletingPayment}>
          {<AiOutlineDelete />}
        </button>
      </p>
    </div>
  );
}

export default PaymentItem;
