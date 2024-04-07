import Empty from "../../ui/Empty";
import PaymentItem from "./PaymentItem";

/* eslint-disable react/prop-types */
function PaymentsList({ saving }) {
  const { SavingPayment } = saving;

  if (SavingPayment.length === 0)
    return <Empty>You did not make any payment for {saving.Name}</Empty>;

  return (
    <div>
      <div className="grid grid-cols-[4fr_4fr_1fr] gap-4">
        <div>Date</div>
        <div>Amount</div>
        <div></div>
      </div>
      {SavingPayment.map((payment) => (
        <PaymentItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

export default PaymentsList;
