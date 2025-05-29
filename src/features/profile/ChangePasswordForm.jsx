import { useForm } from "react-hook-form";
import { useChangePassword } from "../authentification/useChangePassword";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "../../ui/Button";

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { changePassword, isLoading } = useChangePassword();

  function onSubmit(data) {
    const payload = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
      new_password_confirm: data.confirmPassword,
    };
    changePassword(payload, {
      onSuccess: () => reset(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2.5 sm:space-y-3 h-full flex flex-col"
    >
      <div className="flex-grow space-y-2 sm:space-y-2.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          <div>
            <label
              htmlFor="oldPassword"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                className="input-field pr-10 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
                placeholder="Old password"
                autoComplete="current-password"
              />
              <button
                type="button"
                aria-label="Toggle old password visibility"
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <FaRegEyeSlash size={16} />
                ) : (
                  <FaRegEye size={16} />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="input-field pr-10 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Min. 8 chars",
                  },
                })}
                placeholder="New password"
                autoComplete="new-password"
              />
              <button
                type="button"
                aria-label="Toggle new password visibility"
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <FaRegEyeSlash size={16} />
                ) : (
                  <FaRegEye size={16} />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-0.5">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-0.5"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="input-field pr-10 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) =>
                  getValues().newPassword === value || "Passwords do not match",
              })}
              placeholder="Confirm password"
              autoComplete="new-password"
            />
            <button
              type="button"
              aria-label="Toggle confirm password visibility"
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaRegEyeSlash size={16} />
              ) : (
                <FaRegEye size={16} />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-0.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full mt-auto pt-2">
        <Button type="primary" className="w-full py-1.5 text-sm">
          {isLoading ? "Saving..." : "Change Password"}
        </Button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
