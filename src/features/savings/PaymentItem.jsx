import { formatDate } from "../../helpers/dateFunctions";
import { AiOutlineDelete } from "react-icons/ai";

/* eslint-disable react/prop-types */
function PaymentItem({ payment }) {
  return (
    <div className="flex border-b border-stone-200 py-2 my-2 justify-between w-[30vw] items-center">
      <p>{formatDate(payment.Date)}</p>
      <p className="self-item-center">{payment.Amount}&euro;</p>
      <div>
        <AiOutlineDelete />
      </div>
    </div>
  );
}

export default PaymentItem;
