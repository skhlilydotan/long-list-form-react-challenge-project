import UsersList from './usersList/UsersList';
import styles from './users.module.css';
import {Formik,} from 'formik';
import {useCallback, useMemo} from "react";
import {useUsersContext} from "../../context/usersContext.jsx";
import {validationSchema} from "./validationSchema";
import {ErrorMessage} from "./ErrorMessage.jsx";
import {createTouched} from "../../helpers/createTouched";
import {SaveButton} from "./SaveButton.jsx";

function UsersPage() {
    const {usersData} = useUsersContext();
    const onSubmit = useCallback((values, actions) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
        }, 1000);
    }, []);
    const initialValues = useMemo(() => ({usersData}), [usersData]);
    const initialTouched = useMemo(() => createTouched(initialValues), [initialValues]);
  return (
    <div className={styles.pageRoot}>
        <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            initialTouched={initialTouched}
        >
            <div className={styles.pageContentContainer}>
                <UsersList/>
                <ErrorMessage/>
                <SaveButton/>
            </div>
        </Formik>
    </div>
  );
}

export default UsersPage;
