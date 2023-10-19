import UsersList from '../../components/usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';

function UsersPage() {
  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
      </div>
    </div>
  );
}

export default UsersPage;
