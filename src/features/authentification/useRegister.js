import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "./auth";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (userData) => {
      const user = await registerUser(userData);
      const tokens = await loginUser({
        email: userData.email,
        password: userData.password,
      });

      localStorage.setItem("accessToken", tokens.access);
      localStorage.setItem("refreshToken", tokens.refresh);

      return user;
    },
    onSuccess: () => {
      toast.success("Account created! You are now logged in.");
      navigate("/dashboard/overview");
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });
}
