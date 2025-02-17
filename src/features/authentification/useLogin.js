import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./auth";
import toast from "react-hot-toast";

export function useLogin() {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      toast.success("Welcome");
    },
  });
  return { login, isLoading };
}
