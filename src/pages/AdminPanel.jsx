import { useSearchParams } from "react-router-dom";
import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaChartPie,
  FaChartLine,
} from "react-icons/fa";
import { useUsersList } from "../features/authentification/useUsersList";
import Search from "../ui/Search";
import UsersTable from "../features/admin/UsersTable";
import TypesTable from "../features/admin/TypesTable";
import AdminStatsCard from "../features/admin/AdminStatsCard";

function AdminPanel() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { users, isLoading } = useUsersList(search);

  return (
    <div className="p-4 space-y-6 sm:p-6 lg:p-8 min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <AdminStatsCard
          title="Total Users"
          isLoading={false}
          className="justify-center gap-4"
        >
          <FaUsers className="text-4xl text-blue-500" />
          <span className="text-5xl font-bold text-gray-800 dark:text-gray-100">
            {1340}
          </span>
        </AdminStatsCard>

        <AdminStatsCard
          title="User Status"
          isLoading={false}
          className="justify-around"
        >
          <div className="text-center">
            <FaUserCheck className="mx-auto mb-2 text-3xl text-green-500" />
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {1311}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
          </div>
          <div className="text-center">
            <FaUserTimes className="mx-auto mb-2 text-3xl text-red-500" />
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {29}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Inactive</p>
          </div>
        </AdminStatsCard>

        <AdminStatsCard
          title="Popular Transaction Types"
          className="flex-col justify-center"
        >
          <FaChartPie className="text-6xl text-purple-500" />
          <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            Chart showing type distribution.
          </p>
        </AdminStatsCard>

        <AdminStatsCard
          title="System Usage"
          className="flex-col justify-center"
        >
          <FaChartLine className="text-6xl text-yellow-500" />
          <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            Transactions per day/month chart.
          </p>
        </AdminStatsCard>

        <AdminStatsCard
          title="Global Financial Trends"
          className="flex-col justify-center"
        >
          <FaChartLine className="text-6xl text-indigo-500" />
          <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
            Global financial trends overview.
          </p>
        </AdminStatsCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="flex flex-col p-6 space-y-4 lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Users
            </h2>
            <Search />
          </div>
          <div className="overflow-auto">
            <UsersTable data={users} isLoading={isLoading} />
          </div>
        </section>

        <section className="flex flex-col p-6 space-y-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 transition-all">
          <div className="overflow-auto grow">
            <TypesTable />
          </div>
          <div className="mt-auto"></div>
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;
