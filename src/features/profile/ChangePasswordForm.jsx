import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

function ChangePasswordForm() {
  const { register, handleSubmit, getValues } = useForm();

  function onSubmit() {}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-[2fr_3fr] gap-y-4 items-center"
    >
      <label htmlFor="password">New password</label>
      <input
        type="password"
        id="Password"
        className="input-field"
        {...register("Password")}
      />
      <label htmlFor="confirmPassword">Confirm password</label>
      <input
        type="password"
        id="confirmPassword"
        className="input-field"
        {...register("confirmPassword", {
          validate: (value) =>
            getValues().Password === value || "Passwords do not match",
        })}
      />

      <div className="col-span-2 justify-self-end flex items-center gap-3">
        <Button>Cancel</Button>
        <Button type="primary">Confirm</Button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
