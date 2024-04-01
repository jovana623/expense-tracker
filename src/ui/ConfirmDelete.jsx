import Button from "./Button";

/* eslint-disable react/prop-types */
function ConfirmDelete({ name }) {
  return (
    <div className="px-2 py-2 flex flex-col gap-3">
      <h2 className="font-semibold text-xl">Delete {name}</h2>
      <p>Are you sure you want to delete this {name} permanently?</p>
      <div className="flex justify-end gap-2">
        <Button type="secondary">Cancel</Button>
        <Button type="danger">Delete</Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
