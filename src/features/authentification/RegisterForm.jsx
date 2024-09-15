/*import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";
import Button from "../../ui/Button";*/

function RegisterForm() {
  {
    /*
  const { registerUser } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit({ username, email, password }) {
    registerUser(
      { username, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input-field"
            {...register("username", { required: "This field is required" })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-field"
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
            {...register("password", { required: "This field is required" })}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="input-field"
            {...register("confirmPassword", {
              required: "This field is required",
            })}
          />
        </div>
      </div>
      <Button type="primary">Register</Button>
    </form>
  );
  */
  }
}

export default RegisterForm;
