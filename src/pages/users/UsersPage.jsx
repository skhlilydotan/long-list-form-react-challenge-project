import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import {Formik} from 'formik';
import {useCallback} from "react";
import {useUsersContext} from "../../context/usersContext.jsx";
import {validationSchema} from "./validationSchema.jsx";

function UsersPage() {
    const {usersData} = useUsersContext();
    const onSubmit = useCallback((values, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    }, []);
  return (
    <div className={styles.pageRoot}>
        <Formik
            onSubmit={onSubmit}
            initialValues={{usersData}}
            enableReinitialize
            validationSchema={validationSchema}
        >
            <div className={styles.pageContentContainer}>
                <UsersList />
                <div className={styles.rightButtonContainer}>
                    <PrimaryButton
                        disabled={false}
                        type="submit"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </div>
        </Formik>
    </div>
  );
}

export default UsersPage;
