import { createContext, useContext } from 'react';

export const ButtonContext = createContext();

export const useButtonContext = () => {
  const context = useContext(ButtonContext);

  if (!context) {
    throw new Error(
      'Child components of button cannot be rendered outside the ButtonContext component!',
    );
  }

  return context;
};
