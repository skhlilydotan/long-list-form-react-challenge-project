import {createContext, useContext, useState, useEffect, useMemo} from 'react';
import data from '../data/initialUsersData.json';


const DEFAULT_ITEM = {
    id: '',
    name: '',
    country: '',
    email: '',
    phone: ''
}


// initial value
const UsersContext = createContext({
    usersData: [],
    setUsersData: () => {
    },
    removeUser: () => {
    },
    newUser: () => {
    },
    loading: false,
    addNewUser: () => {
    }
});
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

// value provider
export const ContextProvider = ({children}) => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMap, setErrorMap] = useState({})
    const [emptyMap, setEmptyMap] = useState({})
    const [errorProps, setErrorPropsCount] = useState(0);
    const [emptyProps, setEmptyPropsCount] = useState(0);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            setUsersData(data);
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(t);
        };
    }, []);

    useEffect(() => {
        let errorProps = 0;
        Object.keys(errorMap).forEach((key) => {
            errorProps += errorMap[key];
        });
        let emptyProps = 0;
        Object.keys(emptyMap).forEach((key) => {
            emptyProps += emptyMap[key]
        })
        setErrorPropsCount(errorProps);
        setEmptyPropsCount(emptyProps);

    }, [errorMap, emptyMap]);

    const removeUser = (id) => {
        removeEmptyProps(id)
        removeErrorProps(id)
        setUsersData(data => data.filter(user => user.id !== id))
    }
    const addNewUser = (id) => {

        setUsersData(data => [
            {
                ...DEFAULT_ITEM,
                id: genRanHex(8)
            },
            ...data])
    }

    const setErrorProps = (id, count) => setErrorMap(old => {
        old[id] = count
        return {...old};
    })
    const removeErrorProps = (id) => setErrorMap(old => {
        const newMap = {... old};
        delete newMap[id]
        return newMap;
    })
    const setEmptyProps = (id, count) => setEmptyMap(old => {
        old[id] = count
        return {...old};
    })
    const removeEmptyProps = (id) => setEmptyMap(old => {
        const newMap = {... old};
        delete newMap[id]
        return newMap;
    })

    const saveAll = () => {
        setSaving(true);
    }

    const propogatingSave = () => {
        setSaving(false);
    }

    const saveUser = (id, user) =>{
        setUsersData(data => {
            const userToChangeIndex = data.findIndex((item) => item.id === id);
            if (userToChangeIndex !== -1) {
                data[userToChangeIndex] = user;
            }
            return [...data];
        })
    }

    const contextValue = useMemo(() =>
        ({
            usersData,
            setUsersData,
            removeUser,
            addNewUser,
            setEmptyProps,
            setErrorProps,
            removeErrorProps,
            removeEmptyProps,
            emptyProps,
            errorProps,
            loading,
            saveAll,
            saving,
            propogatingSave,
            saveUser
        }), [usersData, emptyProps, errorProps, loading, saving]);

    return <UsersContext.Provider value={contextValue}>{children}</UsersContext.Provider>;
};

// consumer
export const useUsersContext = () => useContext(UsersContext);

export default UsersContext;
