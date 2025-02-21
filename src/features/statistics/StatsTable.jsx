import TableSkeleton from "../../ui/TableSkeleton";

/* eslint-disable react/prop-types */
function StatsTable({ data, isLoading }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan="2">
                <TableSkeleton rows={3} columns={2} />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.type__name}
                </th>
                <td className="px-6 py-4">
                  {item.total_amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  &euro;
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
export default StatsTable;
