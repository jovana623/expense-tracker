import { formatDate } from "../../helpers/dateFunctions";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeletePayment } from "./useDeletePayment";
import { useSaving } from "../savings/useSaving";
import { useUpdateSaving } from "../savings/useUpdateSaving";

/* eslint-disable react/prop-types */
function PaymentItem({ payment }) {
  const { deletePayment, isDeletingPayment } = useDeletePayment();
  const { saving, isLoading: isLoadingSaving } = useSaving(payment.savingId);
  const { updateSaving, isLoading: isUpdatingSaving } = useUpdateSaving();

  const { id } = payment;

  function handleDelete(id) {
    deletePayment(id);
    updateSaving({
      id: saving.id,
      name: saving.name,
      amount: Number(saving.amount) - Number(payment.amount),
      target_Date: saving.target_Date,
      description: saving.description,
      userId: saving.userId,
    });
  }

  return (
    <div className="grid grid-cols-[4fr_4fr_1fr] gap-10 border-b border-stone-200 py-2 my-2 justify-between">
      <p>{formatDate(payment.date)}</p>
      <p className="self-item-center">
        {payment.amount.toLocaleString()}&euro;
      </p>
      <p>
        <button
          onClick={() => handleDelete(id)}
          disabled={isDeletingPayment || isLoadingSaving || isUpdatingSaving}
        >
          {<AiOutlineDelete />}
        </button>
      </p>
    </div>
  );
}

export default PaymentItem;
