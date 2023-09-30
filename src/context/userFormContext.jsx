import { createContext, useContext, useReducer, useMemo } from 'react';

import { INITIAL_STATE, userFormReducer } from './userForm.reducer';

const UserFormContext = createContext({
  newUser: INITIAL_STATE.newUser,
  modifiedUsers: INITIAL_STATE.modifiedUsers,
  setField: () => {},
  setEmptyUser: () => {},
  removeEmptyUser: () => {},
  setModifiedUser: () => {},
});

export const UserFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userFormReducer, INITIAL_STATE);

  const setEmptyUser = () => dispatch({ type: 'SET_EMPTY_USER' });
  const removeEmptyUser = () => dispatch({ type: 'REMOVE_EMPTY_USER' });
  const setField = ({ userId, field, value }) =>
    dispatch({ type: 'SET_FIELD', payload: { userId, field, value } });
  const setModifiedUser = (user) =>
    dispatch({ type: 'SET_MODIFIED_USER', payload: { user } });
  const resetForm = () => dispatch({ type: 'RESET_FORM' });

  console.log('state: ', state);

  const contextValue = useMemo(
    () => ({
      newUser: state.newUser,
      modifiedUsers: state.modifiedUsers,
      setField,
      setEmptyUser,
      removeEmptyUser,
      setModifiedUser,
      resetForm,
    }),
    [state.modifiedUsers, state.newUser]
  );

  return (
    <UserFormContext.Provider value={contextValue}>{children}</UserFormContext.Provider>
  );
};

export const useUserFormContext = () => useContext(UserFormContext);
