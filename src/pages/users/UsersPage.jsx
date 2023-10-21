import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import {useContext} from "react";
import UsersContext from "../../context/usersContext.jsx";

function UsersPage() {
  const usersContext = useContext(UsersContext);
  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={usersContext.errorProps + usersContext.emptyProps > 0}
           handleClick={usersContext.saveAll}
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
