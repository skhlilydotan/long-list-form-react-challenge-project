import Loader from '@mui/material/CircularProgress';

import PrimaryButton from '../../components/PrimaryButton';
import UsersList from './usersList/UsersList';

import { useUsersContext } from '../../context/usersContext';
import { useUserFormContext } from '../../context/userFormContext';

import { validateUsers } from '../../utils/users.utils';

import styles from './users.module.css';

function UsersPage() {
  const { isLoading: isLoadingUsers, saveUsers } = useUsersContext();
  const { newUser, modifiedUsers, resetForm, errorCount } = useUserFormContext();

  const isErrors = errorCount.empty > 0 || errorCount.invalid > 0;

  function onClickSaveUsers() {
    const { sumInvalidFields, sumEmptyFields } = validateUsers({
      newUser,
      modifiedUsers,
    });

    if (sumInvalidFields === 0 && sumEmptyFields === 0) {
      saveUsers({ newUser, modifiedUsers });
      resetForm();
    }
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
          {isErrors && (
            <>
              <div>Invalid Fields Count: {errorCount.invalid}</div>
              <div>Empty Fields Count: {errorCount.empty}</div>
            </>
          )}
          <PrimaryButton disabled={isErrors} handleClick={onClickSaveUsers}>
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
