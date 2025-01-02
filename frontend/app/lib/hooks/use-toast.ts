import { useContext } from "react";
import { ToastContext } from "../context/toast.context";

export function useToast() {
  const toast = useContext(ToastContext);

  if (!toast) {
    throw new Error("useToast can't be used outside a Toast Context");
  }

  return toast;
}
