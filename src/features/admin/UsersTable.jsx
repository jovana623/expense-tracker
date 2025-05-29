import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteUser } from "../authentification/useDeleteUser";
import { useCurrentUser } from "../authentification/useCurrentUser";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import TableSkeleton from "../../ui/TableSkeleton";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ChangeRole from "./ChangeRole";

/* eslint-disable react/prop-types */
function UsersTable({ data, isLoading }) {
  const { deleteUser } = useDeleteUser();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  return (
    <div className="relative overflow-x-auto overflow-y-auto max-h-72 border border-gray-200 dark:border-gray-700 sm:rounded-2xl mt-2">
      <table className="w-full text-sm text-left text-gray-700 bg-white dark:text-white dark:bg-gray-800 ">
        <thead className="sticky top-0 z-10 text-xs text-gray-600 uppercase bg-gray-100 dark:text-gray-300 dark:bg-gray-900">
          <tr>
            <th className="left-0 z-20 w-44 px-4 py-2 bg-gray-100 dark:bg-gray-900">
              Name
            </th>
            <th className="px-6 py-4">Staff</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created</th>
            <th className="px-6 py-4">Last login</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        {isLoading || isLoadingUser ? (
          <tbody>
            <tr>
              <td colSpan="6">
                <TableSkeleton rows={5} />
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data?.map((item, index) => (
              <tr
                key={index}
                className="transition-all border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="sticky left-0 flex items-center gap-3 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 whitespace-nowrap">
                  <img
                    src={item.avatar || "/anon-user.png"}
                    className="object-cover w-10 h-10 rounded-full shadow-sm"
                    alt="User avatar"
                  />
                  <div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-white">
                      {item.username}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                      {item.email}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  {item.is_staff ? (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded dark:bg-green-700 dark:text-white">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded dark:bg-red-700 dark:text-white">
                      No
                    </span>
                  )}
                </td>

                <td className="px-4 py-2">
                  {item.is_active ? (
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      Not Active
                    </span>
                  )}
                </td>

                <td className="px-4 py-2 text-sm">
                  {new Date(item.created_at).toLocaleDateString("en-GB")}
                </td>

                <td className="px-4 py-2 text-xs text-gray-600 dark:text-gray-300">
                  {item.last_login
                    ? new Date(item.last_login).toLocaleString("en-GB")
                    : "—"}
                </td>

                <td className="px-4 py-2 text-center">
                  {currentUser &&
                    ((currentUser.is_superuser && !item.is_superuser) ||
                      (currentUser.is_staff &&
                        !item.is_staff &&
                        !item.is_superuser)) && (
                      <Modal>
                        <Menu>
                          <Menu.Toggle id={item.id} />
                          <Menu.List id={item.id}>
                            <Modal.OpenButton opens="change-role">
                              <Menu.Button icon={<BiSolidPencil />}>
                                Change role
                              </Menu.Button>
                            </Modal.OpenButton>
                            <Modal.OpenButton opens="delete-user">
                              <Menu.Button icon={<AiOutlineDelete />}>
                                Delete
                              </Menu.Button>
                            </Modal.OpenButton>
                          </Menu.List>

                          <Modal.Window name="change-role">
                            <ChangeRole user={item} />
                          </Modal.Window>

                          <Modal.Window name="delete-user">
                            <ConfirmDelete
                              nameModal={item.username}
                              onConfirm={() => deleteUser(item.id)}
                            />
                          </Modal.Window>
                        </Menu>
                      </Modal>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default UsersTable;
