import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./auth";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });
}
