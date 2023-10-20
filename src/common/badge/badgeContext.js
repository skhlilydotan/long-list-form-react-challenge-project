import { createContext, useContext } from "react";

const BadgeContext = createContext();

const useBadgeContext = () => {
  const context = useContext(BadgeContext);

  if (!context) {
    throw new Error(
      "Child components of Badge cannot be rendered outside the BadgeContext component!"
    );
  }

  return context;
};

export { BadgeContext, useBadgeContext };
