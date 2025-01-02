import { createContext } from "react";

export type ApplicationContextType = {};

export const ApplicationContext = createContext<
  ApplicationContextType | undefined
>(undefined);
