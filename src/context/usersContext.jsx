import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { toPlainUser } from '../utils';

import data from '../data/initialUsersData.json';

const UsersContext = createContext({
  users: null,
  setUsers: () => {},
  isLoading: false,
});

// value provider
export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const isLoading = users === null;

  const deleteUser = (userId) => setUsers(users.filter((user) => user.id !== userId));
  const saveUsers = ({ newUser, modifiedUsers }) => {
    const updatedUsers = users.map((user) => {
      const modifiedUser = modifiedUsers[user.id];

      if (modifiedUser) {
        return toPlainUser(modifiedUser);
      }

      return user;
    });

    if (newUser) {
      setUsers([toPlainUser(newUser), ...updatedUsers]);

      return;
    }

    setUsers(updatedUsers);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setUsers(data), 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  console.log('users: ', users);

  const contextValue = useMemo(
    () => ({
      users,
      isLoading,
      deleteUser,
      saveUsers,
    }),
    [users]
  );

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
