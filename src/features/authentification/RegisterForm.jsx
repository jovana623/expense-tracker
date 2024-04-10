import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useRegister } from "./useRegister";

function RegisterForm() {
  const { registerUser, isLoading } = useRegister();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit({ fullName, email, password }) {
    registerUser(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="fullName">Full Name or Username</label>
          <input
            type="text"
            id="fullName"
            className="input-field"
            disabled={isLoading}
            {...register("fullName", { required: "This field is required" })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-field"
            disabled={isLoading}
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input-field"
            disabled={isLoading}
            {...register("password", { required: "This field is required" })}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            disabled={isLoading}
            {...register("confirmPassword", {
              required: "This field is required",
            })}
          />
        </div>
      </div>
      <Button type="primary">Register</Button>
    </form>
  );
}

export default RegisterForm;
