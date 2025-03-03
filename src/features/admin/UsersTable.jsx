import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import TableSkeleton from "../../ui/TableSkeleton";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteUser } from "../authentification/useDeleteUser";
import ChangeRole from "./ChangeRole";
import { useCurrentUser } from "../authentification/useCurrentUser";

/* eslint-disable react/prop-types */
function UsersTable({ data, isLoading }) {
  const { deleteUser } = useDeleteUser();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();

  return (
    <div className="relative overflow-x-auto sm:overflow-x-scroll shadow-md sm:rounded-lg h-auto sm:h-[70vh] min-h-[auto] sm:min-h-[70vh] lg:overflow-hidden">
      <table className="w-full text-xs sm:text-xs text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10 shadow">
          <tr>
            <th
              scope="col"
              className="px-4 sm:px-6 py-3 sticky left-0 bg-gray-50 z-10 w-32 sm:w-auto"
            >
              Name
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Staff
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3">
              Last login
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3"></th>
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
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="flex items-center px-4 sm:px-6 py-4 text-gray-900 whitespace-nowrap sticky left-0 bg-white hover:bg-gray-50 z-10 w-32 sm:w-auto overflow-hidden"
                >
                  {item.avatar ? (
                    <img
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      src={`${item.avatar}`}
                      alt="profile image"
                    />
                  ) : (
                    <img
                      src="/anon-user.png"
                      width="32px"
                      className="rounded-full shadow-sm"
                      alt="anonymous user"
                    />
                  )}
                  <div className="ps-2 sm:ps-3">
                    <div className="text-xs sm:text-base font-semibold">
                      {item.username}
                    </div>
                    <div className="text-[10px] sm:text-sm font-normal text-gray-500">
                      {item.email}
                    </div>
                  </div>
                </th>
                <td className="px-4 sm:px-6 py-4">
                  {item.is_staff ? (
                    <svg
                      className="w-3 h-3 text-green-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-3 h-3 text-red-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {item.is_active ? "Active" : "Not active"}
                </td>
                <td className="px-4 sm:px-6 py-4">
                  {new Date(item.created_at).toLocaleDateString("en-US")}
                </td>
                <td className="px-4 sm:px-6 py-4">{item.last_login}</td>
                <td className="px-4 sm:px-6 py-4">
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
