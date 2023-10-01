import { useReducer } from 'react';
import Loader from '@mui/material/CircularProgress';

import PrimaryButton from '../../components/PrimaryButton';
import UsersList from './usersList/UsersList';

import { useUsersContext } from '../../context/usersContext';
import { useUserFormContext } from '../../context/userFormContext';

import styles from './users.module.css';

function UsersPage() {
  const { isLoading: isLoadingUsers, saveUsers } = useUsersContext();
  const { newUser, modifiedUsers, resetForm } = useUserFormContext();

  function onClickSaveUsers() {
    // validation
    saveUsers({ newUser, modifiedUsers });
    resetForm();
  }

  if (isLoadingUsers) {
    return (
      <div className={styles.pageRoot}>
        <Loader size={80} />
      </div>
    );
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
          <PrimaryButton disabled={false} handleClick={onClickSaveUsers}>
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
