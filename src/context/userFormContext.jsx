import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useState,
  useEffect,
} from 'react';

import { INITIAL_STATE, userFormReducer } from './userForm.reducer';

import { validateUsers, getFormUsersCount } from '../utils/users.utils';

const UserFormContext = createContext({
  newUser: INITIAL_STATE.newUser,
  modifiedUsers: INITIAL_STATE.modifiedUsers,
  setField: () => {},
  setEmptyUser: () => {},
  removeEmptyUser: () => {},
  setModifiedUser: () => {},
  resetForm: () => {},
  getModifiedUser: () => {},
  removeModifiedUser: () => {},
  setSumErrors: () => {},
  errorCount: { invalid: 0, empty: 0 },
});

export const UserFormContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userFormReducer, INITIAL_STATE);
  const [errorCount, setErrorCount] = useState({ invalid: 0, empty: 0 });

  const setEmptyUser = () => dispatch({ type: 'SET_EMPTY_USER' });
  const removeEmptyUser = () => dispatch({ type: 'REMOVE_EMPTY_USER' });
  const setField = ({ userId, field, value }) =>
    dispatch({ type: 'SET_FIELD', payload: { userId, field, value } });
  const setModifiedUser = ({ userId, field, value }) =>
    dispatch({ type: 'SET_MODIFIED_USER', payload: { userId, field, value } });
  const removeModifiedUser = (userId) =>
    dispatch({ type: 'REMOVE_MODIFIED_USER', payload: { userId } });
  const resetForm = () => dispatch({ type: 'RESET_FORM' });

  const getModifiedUser = (userId) => state.modifiedUsers[userId];
  const setSumErrors = () => {
    const { newUser, modifiedUsers } = state;
    const { sumInvalidFields, sumEmptyFields } = validateUsers({
      newUser,
      modifiedUsers,
    });

    setErrorCount({ invalid: sumInvalidFields, empty: sumEmptyFields });
  };

  const formUsersCount = getFormUsersCount(state.newUser, state.modifiedUsers);

  useEffect(
    function updateSumErrorsOnChangeUsersCount() {
      setSumErrors();
    },
    [formUsersCount]
  );

  const contextValue = useMemo(
    () => ({
      newUser: state.newUser,
      modifiedUsers: state.modifiedUsers,
      setField,
      setEmptyUser,
      removeEmptyUser,
      setModifiedUser,
      resetForm,
      getModifiedUser,
      removeModifiedUser,
      setSumErrors,
      errorCount,
    }),
    [state.modifiedUsers, state.newUser, errorCount]
  );

  return (
    <UserFormContext.Provider value={contextValue}>{children}</UserFormContext.Provider>
  );
};

export const useUserFormContext = () => useContext(UserFormContext);
