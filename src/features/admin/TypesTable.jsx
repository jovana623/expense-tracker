import AddForm from "../../ui/AddForm";
import Menu from "../../ui/Menu";
import Modal from "../../ui/Modal";
import TableSkeleton from "../../ui/TableSkeleton";
import TypesForm from "../type/TypesForm";
import { useTypes } from "../type/useTypes";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteType } from "../type/useDeleteType";

function TypesTable() {
  const { types, isLoading } = useTypes();
  const { deleteType } = useDeleteType();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Types</h2>
        <AddForm title="type">
          <TypesForm />
        </AddForm>
      </div>

      <div className="relative h-[70vh] overflow-y-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3"></th>
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
              {types.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.category.name}</td>
                  <td className="px-6 py-4">
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
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default TypesTable;
