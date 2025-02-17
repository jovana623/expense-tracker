import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useRegister } from "./useRegister";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();
  const { mutate: registerUser, isLoading } = useRegister();
  const navigate = useNavigate();

  const password = watch("password");

  function onSubmit({ username, email, password }) {
    registerUser(
      { username, email, password },
      {
        onSettled: () => reset(),
      }
    );
    navigate("/dashboard/overview");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md mb-3 flex flex-col h-full"
    >
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="input-field w-full"
            {...register("username", { required: "This field is required" })}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="input-field w-full"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
        </div>
        <div className="col-span-2 relative">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="input-field w-full pr-10"
              {...register("password", { required: "This field is required" })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>
        </div>
        <div className="col-span-2 relative">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="input-field w-full pr-10"
              {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
      <Button type="primary" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

export default RegisterForm;
