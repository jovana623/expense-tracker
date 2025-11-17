import { useMutation } from "@tanstack/react-query";
import { getCurrentUser, loginUser } from "./auth";
import toast from "react-hot-toast";

export function useLogin() {
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      const userData = await getCurrentUser();
      const {
        currency,
        avatar,
        username,
        is_staff,
        is_superuser,
        current_balance,
      } = userData;

      localStorage.setItem("currency", currency);
      localStorage.setItem("avatar", avatar);
      localStorage.setItem("username", username);
      localStorage.setItem("isStaff", is_staff);
      localStorage.setItem("isSuperuser", is_superuser);
      localStorage.setItem("currentBalance", current_balance);

      toast.success("Welcome");
    },
  });
  return { login, isLoading };
}
