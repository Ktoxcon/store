import { createContext } from "react";

export type ShowToastArgs = {
  title: string;
  description: string;
};

export type ToastContextValue = {
  show: (args: ShowToastArgs) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);
