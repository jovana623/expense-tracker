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

  const tableMaxHeight = "max-h-72";

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 overflow-y-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 ">
          Manage Types
        </h2>
        <AddForm title="New Type">
          <TypesForm />
        </AddForm>
      </div>

      <div
        className={`relative shadow-md rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-hidden overflow-y-auto ${tableMaxHeight}`}
      >
        <table className="w-full text-sm text-left text-gray-700 dark:text-white bg-white dark:bg-gray-800">
          <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 w-28 text-center font-medium"
              >
                Actions
              </th>
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan="3">
                  <TableSkeleton rows={4} cellCount={3} />
                </td>
              </tr>
            </tbody>
          ) : types && types.length > 0 ? (
            <tbody>
              {types.map((item) => {
                const isIncome = item.category.name.toLowerCase() === "income";
                const isExpense =
                  item.category.name.toLowerCase() === "expense";

                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 dark:border-gray-700/70 hover:bg-gray-50 dark:hover:bg-gray-600/30 transition-colors duration-150"
                  >
                    <td className="px-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {item.name}
                    </td>

                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full
                          ${
                            isIncome
                              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                              : isExpense
                              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-200"
                          }`}
                      >
                        {item.category.name}
                      </span>
                    </td>

                    <td className="px-6 py-3 text-center">
                      <Modal>
                        <Menu>
                          <Menu.Toggle id={`type-action-${item.id}`} />
                          <Menu.List id={`type-action-${item.id}`}>
                            <Modal.OpenButton opens={`update-type-${item.id}`}>
                              <Menu.Button icon={<BiSolidPencil />}>
                                Edit
                              </Menu.Button>
                            </Modal.OpenButton>
                            <Modal.OpenButton opens={`delete-type-${item.id}`}>
                              <Menu.Button icon={<AiOutlineDelete />}>
                                Delete
                              </Menu.Button>
                            </Modal.OpenButton>
                          </Menu.List>
                          <Modal.Window name={`update-type-${item.id}`}>
                            <TypesForm typeToUpdate={item} />
                          </Modal.Window>
                          <Modal.Window name={`delete-type-${item.id}`}>
                            <ConfirmDelete
                              resourceName="type"
                              itemName={item.name}
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
          ) : (
            <tbody>
              <tr>
                <td
                  colSpan="3"
                  className="px-6 py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  No types found.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default TypesTable;
