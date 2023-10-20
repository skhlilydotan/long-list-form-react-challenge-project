import { createContext, useContext } from "react";

export const InputContext = createContext();

export const useInputContext = () => {
  const context = useContext(InputContext);

  if (!context) {
    throw new Error(
      "Child components of ChartTypes cannot be rendered outside the InputContext component!"
    );
  }

  return context;
};
