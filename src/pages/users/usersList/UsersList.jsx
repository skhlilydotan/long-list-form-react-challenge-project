import { useEffect } from 'react';
import { Typography } from '@mui/material';

import { useUsersContext } from '../../../context/usersContext';
import { useUserFormContext } from '../../../context/userFormContext';

import AddButton from '../../../components/AddButton';
import UserRow from '../userRow/UserRow';

import styles from '../users.module.css';

function UsersList() {
  const { users } = useUsersContext();
  const { newUser, setEmptyUser } = useUserFormContext();

  const showNewUserRow = () => {
    document
      .querySelector(`#add_user_scroll_anchor`)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const onClickAddUser = () => {
    setEmptyUser();
    showNewUserRow();
  };

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List ({users.length})</Typography>
        <AddButton handleClick={onClickAddUser} />
      </div>
      <div className={styles.usersListContent}>
        <div style={{ height: '5px' }} id="add_user_scroll_anchor"></div>
        {newUser && <UserRow user={newUser} />}
        {users?.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default UsersList;
