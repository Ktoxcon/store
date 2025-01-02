import { type ReactNode } from "react";
import { ToastContext } from "../context/toast.context";

export function ToastProvider({ children }: { children: ReactNode }) {
  const show = () => {};

  return (
    <ToastContext.Provider value={{ show }}>{children}</ToastContext.Provider>
  );
}
