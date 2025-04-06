import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner";
import { useCategories } from "../category/useCategories";
import Button from "../../ui/Button";
import { useCreateType } from "../type/useCreateType";
import { useContext } from "react";
import { ModalContext } from "../../ui/Modal";
import { useUpdateType } from "../type/useUpdateType";

/* eslint-disable react/prop-types */
function TypesForm({ typeToUpdate = {} }) {
  const { categories, isLoading } = useCategories();
  const { createType, isLoading: isCreating } = useCreateType();
  const { updateType } = useUpdateType();
  const { id: editId, ...editValues } = typeToUpdate;
  const isUpdateSession = Boolean(editId);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: isUpdateSession
      ? { ...editValues, category: typeToUpdate.category?.id }
      : {},
  });
  const { close } = useContext(ModalContext);

  function onSubmit(data) {
    const formattedData = {
      name: data.name,
      category: data.category,
      color: data.color,
    };
    if (isUpdateSession) {
      updateType({ id: editId, ...formattedData });
    } else {
      createType(formattedData);
    }
    reset();
    close();
  }
  function onCancel() {
    reset();
    close();
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="m-0 sm:m-10 px-5 py-3  flex flex-col gap-2 bg-lightBg sm:text-base text-xs dark:bg-gray-700"
    >
      <label htmlFor="name" className="dark:text-lightBg">
        Name
      </label>
      <input
        type="text"
        id="name"
        {...register("name", {
          required: "This field is required",
        })}
        className="input-field"
      ></input>
      <label htmlFor="name" className="dark:text-lightBg">
        Category
      </label>
      <select id="category" className="input-field" {...register("category")}>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <label htmlFor="name" className="dark:text-lightBg">
        Color
      </label>
      <input
        type="color"
        className="p-1 h-10 block bg-lightBg cursor-pointer rounded-lg w-1/2 dark:bg-gray-700"
        id="color"
        {...register("color")}
      ></input>
      <div className="flex gap-2 col-start-2 mt-4 justify-self-end self-end">
        <Button type="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary" disabled={isCreating}>
          {isUpdateSession ? "Update type" : "Save type"}
        </Button>
      </div>
    </form>
  );
}

export default TypesForm;
