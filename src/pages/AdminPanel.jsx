import { useSearchParams } from "react-router-dom";
import UsersTable from "../features/admin/UsersTable";
import { useUsersList } from "../features/authentification/useUsersList";
import Search from "../ui/Search";

function AdminPanel() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { users, isLoading } = useUsersList(search);
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white border p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Users</h2>
          <Search />
        </div>
        <div className="mt-4 text-gray-500">
          <UsersTable data={users} isLoading={isLoading} />
        </div>
      </div>

      <div className="bg-white border p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Types</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition">
          Add type
        </button>
        <div className="mt-4 text-gray-500">[List]</div>
      </div>
    </div>
  );
}

export default AdminPanel;
