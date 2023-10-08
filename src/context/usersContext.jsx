import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import data from '../data/initialUsersData.json';

// initial value
const UsersContext = createContext({
  usersData: [],
  setUsersData: () => {},
  loading: false,
});

const STORE_KEY = 'usersData';

const getLocalData = () => {
  return getStoredData() ?? data
}

const getStoredData = () => {
  const localData = localStorage.getItem(STORE_KEY)
  try {
    return JSON.parse(localData);
  } catch (e) {
    console.error(e);
    return null;
  }
}

const setStoredData = (data) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

// value provider
export const ContextProvider = ({ children }) => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (loading === false) {
      setStoredData(usersData);
      console.log('Saved!');
    }
  }, [usersData, loading]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      const localData = getLocalData();
      setUsersData(localData);
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(t);
    };
  }, []);

  const contextValue = useMemo(() => ({ usersData, setUsersData, loading }), [usersData, loading]);

  return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
