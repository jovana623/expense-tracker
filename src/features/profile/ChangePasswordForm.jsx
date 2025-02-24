import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useChangePassword } from "../authentification/useChangePassword";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function ChangePasswordForm() {
  const { register, handleSubmit, getValues, reset } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { changePassword, isLoading } = useChangePassword();

  function onSubmit(data) {
    changePassword(data, {
      onSettled: () => reset(),
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-[6.9%]">
      <h2 className="text-lg font-medium">Change Password</h2>
      <div className="space-y-6">
        <div className="relative">
          <input
            type={showOldPassword ? "text" : "password"}
            id="oldPassword"
            className="input-field"
            {...register("oldPassword")}
            placeholder="Old password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? (
              <FaRegEyeSlash size={20} />
            ) : (
              <FaRegEye size={20} />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            className="input-field"
            {...register("newPassword")}
            placeholder="New password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? (
              <FaRegEyeSlash size={20} />
            ) : (
              <FaRegEye size={20} />
            )}
          </button>
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="input-field"
            {...register("confirmPassword", {
              validate: (value) =>
                getValues().newPassword === value || "Passwords do not match",
            })}
            placeholder="Confirm new password"
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
      <div className="flex flex-col w-full">
        <Button type="primary">{isLoading ? "Saving" : "Confirm"}</Button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
