import { useContext } from "react";
import Button from "../../ui/Button";
import { ModalContext } from "../../ui/Modal";
import { useUpdateRole } from "../authentification/useUpdateRole";
import Spinner from "../../ui/Spinner";

/* eslint-disable react/prop-types */
function ChangeRole({ user }) {
  const { updateRole, isLoading } = useUpdateRole();
  const { close } = useContext(ModalContext);

  function handleRoleChange(newRole) {
    updateRole({ id: user.id, is_staff: newRole });
    close();
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="px-2 py-2 flex flex-col gap-3">
      <h2 className="font-semibold text-xl">Change role</h2>
      <p>
        Are you sure you want to{" "}
        {user.is_staff
          ? `remove ${user.username} from staff`
          : `add ${user.username} to staff`}
        ?
      </p>
      <div className="flex justify-end gap-2">
        <Button type="secondary" onClick={close}>
          Cancel
        </Button>
        <Button type="primary" onClick={() => handleRoleChange(!user.is_staff)}>
          Change
        </Button>
      </div>
    </div>
  );
}

export default ChangeRole;
