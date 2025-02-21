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
  console.log(data);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 overflow-y-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Staff
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Last login
            </th>
            <th scope="col" className="px-6 py-3"></th>
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
                className="bg-white border-b border-gray-200 hover:bg-gray-50 "
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  {item.avatar ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/docs/images/people/profile-picture-1.jpg"
                      alt="profile image"
                    />
                  ) : (
                    <img
                      src="/anon-user.png"
                      width="36px"
                      className="rounded-full shadow-sm"
                    />
                  )}
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {item.username}
                    </div>
                    <div className="font-normal text-gray-500">
                      {item.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    {item.is_active ? "Active" : "Not active"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {new Date(item.created_at).toLocaleDateString("en-US")}
                </td>

                <td className="px-6 py-4">{item.last_login}</td>
                <td className="px-6 py-4">
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
