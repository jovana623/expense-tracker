import Empty from "../../ui/Empty";
import PaymentItem from "./PaymentItem";

/* eslint-disable react/prop-types */
function PaymentsList({ saving }) {
  const { Payments } = saving;

  if (Payments.length === 0)
    return <Empty>You did not make any payment for {saving.name}</Empty>;

  return (
    <div>
      <div className="grid grid-cols-[4fr_4fr_1fr] gap-4">
        <div>Date</div>
        <div>Amount</div>
        <div></div>
      </div>
      {Payments.map((payment) => (
        <PaymentItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

export default PaymentsList;
