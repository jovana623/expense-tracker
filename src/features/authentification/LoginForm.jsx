import { useState } from "react";
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/dashboard/overview");
        },
        onError: () => toast.error("Invalid credentials, please try again."),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-600 space-y-6 w-full max-w-md mx-auto"
    >
      <div>
        <label htmlFor="email" className="block mb-2 dark:text-lightBg">
          Email
        </label>
        <input
          type="email"
          className="input-field"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 dark:text-lightBg">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input-field w-full pr-10"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
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
      <div className="pt-2 grid">
        <Button type="primary" disabled={isLoading}>
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
