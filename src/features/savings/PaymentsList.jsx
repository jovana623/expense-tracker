import PaymentItem from "./PaymentItem";

/* eslint-disable react/prop-types */
function PaymentsList({ saving }) {
  const { SavingPayment } = saving;
  console.log(SavingPayment);

  return (
    <div className="">
      {SavingPayment.map((payment) => (
        <PaymentItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

export default PaymentsList;
