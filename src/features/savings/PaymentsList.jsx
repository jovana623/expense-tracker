import Empty from "../../ui/Empty";
import PaymentItem from "./PaymentItem";

/* eslint-disable react/prop-types */
function PaymentsList({ saving }) {
  const { SavingPayment } = saving;
  console.log(SavingPayment);

  if (SavingPayment.length === 0)
    return <Empty>You did not make any payment for {saving.Name}</Empty>;

  return (
    <div className="">
      {SavingPayment.map((payment) => (
        <PaymentItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

export default PaymentsList;
