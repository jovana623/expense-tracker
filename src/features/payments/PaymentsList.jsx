import { AiOutlineDelete } from "react-icons/ai";
import Empty from "../../ui/Empty";
import { useDeletePayment } from "./useDeletePayment";
import { formatDate } from "../../helpers/dateFunctions";
import { usePayments } from "./usePayments";
import Spinner from "../../ui/Spinner";

/* eslint-disable react/prop-types */
function PaymentList({ saving, currency }) {
  const { payments, isLoading } = usePayments(saving.id);
  const { deletePayment, isDeletingPayment } = useDeletePayment();

  const isReportPath = location.pathname.includes("report");
  function handleDelete(id) {
    deletePayment(id);
  }

  if (isLoading) return <Spinner />;

  if (payments.length === 0)
    return <Empty>You did not make any payment for {saving.name}</Empty>;

  return (
    <div className="relative overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr
              key={payment.id}
              className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {payment.amount.toLocaleString()}
                {currency}
              </th>
              <td className="px-6 py-4">{formatDate(payment.date)}</td>
              <td className="px-6 py-4">
                {!isReportPath && (
                  <p>
                    <button
                      onClick={() => handleDelete(payment.id)}
                      disabled={isDeletingPayment}
                    >
                      {<AiOutlineDelete />}
                    </button>
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentList;
