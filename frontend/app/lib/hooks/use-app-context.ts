import { useContext } from "react";
import { ApplicationContext } from "../context/app.context";

export function useAppContext() {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useAppContext can't be used outside an Application Context"
    );
  }

  return context;
}
