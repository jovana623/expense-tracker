import { useSearchParams } from "react-router-dom";
import { useUsersList } from "../features/authentification/useUsersList";
import UsersTable from "../features/admin/UsersTable";
import Search from "../ui/Search";
import TypesTable from "../features/admin/TypesTable";

function AdminPanel() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { users, isLoading } = useUsersList(search);

  return (
    <div className="p-6 sm:p-10 space-y-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <section className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Users
            </h2>
            <Search />
          </div>

          <UsersTable data={users} isLoading={isLoading} />
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all p-6 space-y-6">
          <TypesTable />
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;
