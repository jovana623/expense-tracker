import { useContext } from "react";
import ThreadContext from "./ThreadContext";

export function useThreadContext() {
  return useContext(ThreadContext);
}
