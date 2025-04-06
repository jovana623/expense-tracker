import { useTypes } from "../type/useTypes";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteType } from "../type/useDeleteType";

import AddForm from "../../ui/AddForm";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import TableSkeleton from "../../ui/TableSkeleton";
import TypesForm from "../type/TypesForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

function TypesTable() {
  const { types, isLoading } = useTypes();
  const { deleteType } = useDeleteType();

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Types
        </h2>
        <AddForm title="type">
          <TypesForm />
        </AddForm>
      </div>

      <div className="relative shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 overflow-x-hidden">
        <table className="w-full text-sm text-left text-gray-700 dark:text-white bg-white dark:bg-gray-800">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-4 py-4 w-24 text-center">Actions</th>
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="3">
                  <TableSkeleton rows={3} />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {types.map((item, index) => {
                const isIncome = item.category.name.toLowerCase() === "income";
                const isExpense =
                  item.category.name.toLowerCase() === "expense";

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded 
                          ${
                            isIncome
                              ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                              : isExpense
                              ? "bg-red-100 text-red-700 dark:bg-red-700 dark:text-white"
                              : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white"
                          }`}
                      >
                        {item.category.name}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <Modal>
                        <Menu>
                          <Menu.Toggle id={item.id} />
                          <Menu.List id={item.id}>
                            <Modal.OpenButton opens="update-type">
                              <Menu.Button icon={<BiSolidPencil />}>
                                Update
                              </Menu.Button>
                            </Modal.OpenButton>
                            <Modal.OpenButton opens="delete-type">
                              <Menu.Button icon={<AiOutlineDelete />}>
                                Delete
                              </Menu.Button>
                            </Modal.OpenButton>
                          </Menu.List>

                          <Modal.Window name="update-type">
                            <TypesForm typeToUpdate={item} />
                          </Modal.Window>

                          <Modal.Window name="delete-type">
                            <ConfirmDelete
                              nameModal={item.name}
                              onConfirm={() => deleteType(item.id)}
                            />
                          </Modal.Window>
                        </Menu>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default TypesTable;
