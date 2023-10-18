import { Grid } from '@mui/material';
import { useState, useMemo } from 'react';

import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';

import { useUsersContext } from '../../../context/usersContext';
import { useUserFormContext } from '../../../context/userFormContext';

import { USER_TYPES } from '../../../constants';

import styles from '../users.module.css';

const UserRow = ({ user }) => {
  const { deleteUser: deleteUserById } = useUsersContext();
  const {
    newUser,
    getModifiedUser,
    setModifiedUser,
    setField,
    removeEmptyUser,
    removeModifiedUser,
    setSumErrors,
  } = useUserFormContext();

  const [emptyFieldErrorTrigger, setEmptyFieldErrorTrigger] = useState([]);

  const uiProperties = useMemo(
    () => Object.entries(user).filter(([key]) => key !== 'id'),
    [user]
  );
  const modifiedUser = getModifiedUser(user.id);
  const getUniqueFieldId = (userId, field) => `${userId}_${field}`;
  const getUserType = () => {
    if (newUser && newUser.id === user.id) {
      return USER_TYPES.NEW;
    }

    if (modifiedUser) {
      return USER_TYPES.MODIFIED;
    }

    return USER_TYPES.EXISTING;
  };
  const userType = getUserType();

  const onChange = (field, value) => setField({ userId: user.id, field, value });
  const onFocus = (event) => {
    if (userType === USER_TYPES.NEW) {
      return;
    }

    setModifiedUser({
      userId: user.id,
      field: event.target.name,
      value: event.target.value,
    });
  };
  const onBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const uniqueFieldId = getUniqueFieldId(user.id, field);

    if (value === '') {
      setEmptyFieldErrorTrigger([...emptyFieldErrorTrigger, uniqueFieldId]);
    } else if (emptyFieldErrorTrigger.includes(uniqueFieldId)) {
      setEmptyFieldErrorTrigger(
        emptyFieldErrorTrigger.filter((item) => item !== uniqueFieldId)
      );
    }

    setSumErrors();
  };

  const getRemoveUser = () => {
    user.id === newUser?.id ? removeEmptyUser : deleteUserById; //useCallback?

    if (userType === USER_TYPES.NEW) {
      return removeEmptyUser;
    }

    return (userId) => {
      deleteUserById(userId);
      removeModifiedUser(userId);
    };
  };

  const getUiValue = (field, value) => {
    if (userType === USER_TYPES.NEW) {
      return newUser[field]?.value;
    }

    if (userType === USER_TYPES.MODIFIED && modifiedUser[field]) {
      return modifiedUser[field]?.value;
    }

    return value;
  };
  const isError = (formField) => {
    if (userType === USER_TYPES.NEW) {
      return !!newUser[formField]?.error;
    }

    if (userType === USER_TYPES.MODIFIED) {
      return !!modifiedUser[formField]?.error;
    }

    return false;
  };

  const removeUser = getRemoveUser();

  return (
    <Grid container className={styles.userRow}>
      {uiProperties.map(([field, value]) => {
        const uniqueFieldId = getUniqueFieldId(user.id, field);
        const uiValue = getUiValue(field, value);

        return (
          <InputField
            error={isError(field) || emptyFieldErrorTrigger.includes(uniqueFieldId)}
            key={uniqueFieldId}
            name={field}
            value={uiValue}
            fullWidth={false}
            onChangehandler={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        );
      })}
      <TrashIconButton handleClick={() => removeUser(user.id)} />
    </Grid>
  );
};

export default UserRow;
