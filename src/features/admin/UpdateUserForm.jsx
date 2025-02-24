import { useForm } from "react-hook-form";
import { ModalContext } from "../../ui/Modal";
import { useContext } from "react";
import Button from "../../ui/Button";
import { useUpdateUser } from "../authentification/useUpdateUser";

/* eslint-disable react/prop-types */
function UpdateUserForm({ userToUpdate = {} }) {
  const { id: editId, ...editValues } = userToUpdate;
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editValues,
  });

  const { updateUser, isLoading } = useUpdateUser();

  function onSubmit(data) {
    const formattedData = {
      id: editId,
      username: data.username,
      email: data.username,
      avatar: editValues.avatar,
      is_staff: data.staff,
    };
    updateUser(formattedData);
    close();
  }

  function onError() {
    console.log(errors);
  }

  const { errors } = formState;
  const { close } = useContext(ModalContext);

  function onCancel() {
    close();
    reset();
  }

  return (
    <form
      role="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      className="m-0 sm:m-10 px-5 py-3 gap-2 bg-lightBg sm:text-base text-xs"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          disabled={true}
          {...register("username", {
            required: "This field is required",
          })}
          className="input-field"
        ></input>
        <p className="text-xs text-red-500">{errors?.username?.message}</p>
      </div>
      <div className="flex flex-col gap-1 ">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="input-field"
          id="email"
          disabled={true}
          {...register("email", {
            required: "This field is required",
          })}
        ></input>
        <p className="text-xs text-red-500">{errors?.amount?.message}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="is_staff">Is staff</label>
        <select id="is_staff" className="input-field" {...register("is_staff")}>
          <option value={false}>False</option>
          <option value={true}>True</option>
        </select>
      </div>

      <div className="flex gap-2 col-start-2 mt-4 justify-self-end self-end">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" disabled={isLoading}>
          Update user
        </Button>
      </div>
    </form>
  );
}

export default UpdateUserForm;
