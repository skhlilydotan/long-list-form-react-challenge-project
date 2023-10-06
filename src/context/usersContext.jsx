import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';

// initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  loading: false,
});

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      console.log('usersData', data);
      setUsersData(data);
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(() => ({ usersData, loading }), [usersData, loading]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
