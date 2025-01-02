import { createContext } from "react";

export type ToastContextValue = {
  show: () => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);
