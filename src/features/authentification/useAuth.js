import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useRegister = () => {
  return useMutation(async (data) => {
    const response = await axiosInstance.post("/users/register/", data);
    return response.data;
  });
};

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axiosInstance.post("/users/token/", data);
        login(response.data);
        return response.data;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
      }
    },
    onError: () => {
      toast.error("Invalid credentials");
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      navigate("/dashboard");
    },
  });
};
