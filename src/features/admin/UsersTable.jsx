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
    <div className="relative overflow-x-auto shadow-md sm:rounded-2xl h-auto sm:h-[70vh] lg:overflow-hidden border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm text-left text-gray-700 dark:text-white bg-white dark:bg-gray-800">
        <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-4 sticky left-0 z-20 bg-gray-100 dark:bg-gray-900 w-44">
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
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                <td className="flex items-center gap-3 px-6 py-4 whitespace-nowrap sticky left-0 z-10 bg-white dark:bg-gray-800">
                  <img
                    src={item.avatar || "/anon-user.png"}
                    className="w-10 h-10 rounded-full shadow-sm object-cover"
                    alt="User avatar"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white text-sm">
                      {item.username}
                    </div>
                    <div className="text-gray-500 dark:text-gray-300 text-xs">
                      {item.email}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {item.is_staff ? (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded dark:bg-green-700 dark:text-white">
                      Yes
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded dark:bg-red-700 dark:text-white">
                      No
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {item.is_active ? (
                    <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400 font-medium text-sm">
                      Not Active
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-sm">
                  {new Date(item.created_at).toLocaleDateString("en-GB")}
                </td>

                <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-300">
                  {item.last_login
                    ? new Date(item.last_login).toLocaleString("en-GB")
                    : "—"}
                </td>

                <td className="px-6 py-4 text-center">
                  {((currentUser.is_superuser && !item.is_superuser) ||
                    (currentUser.is_staff && !item.is_staff)) && (
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
