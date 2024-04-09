import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Account succesfully created");
      navigate("/dashboard/overview");
    },
  });
  return { registerUser, isLoading };
}
