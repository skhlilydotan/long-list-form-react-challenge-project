import UsersList from './usersList/UsersList';
import styles from './users.module.css';
import {Formik,} from 'formik';
import {useCallback, useMemo} from "react";
import {useUsersContext} from "../../context/usersContext.jsx";
import {validationSchema} from "./validationSchema";
import {ErrorMessage} from "./ErrorMessage.jsx";
import {createTouched} from "../../helpers/createTouched";
import {SaveButton} from "./SaveButton.jsx";
import {USERS_ROOT_FIELD} from "./constants.js";

function UsersPage() {
    const {usersData, setUsersData} = useUsersContext();
    const saveUserData = useCallback((values) => {
        setUsersData(values[USERS_ROOT_FIELD]);
    }, [setUsersData]);
    const initialValues = useMemo(() => ({[USERS_ROOT_FIELD]: usersData}), [usersData]);
    const initialTouched = useMemo(() => createTouched(initialValues), [initialValues]);
    console.log(initialTouched);
  return (
    <div className={styles.pageRoot}>
        <Formik
            onSubmit={saveUserData}
            initialValues={initialValues}
            validateOnMount={true}
            enableReinitialize
            validationSchema={validationSchema}
            initialTouched={initialTouched}
        >
            <div className={styles.pageContentContainer}>
                <UsersList/>
                <ErrorMessage/>
                <SaveButton saveUserData={saveUserData}/>
            </div>
        </Formik>
    </div>
  );
}

export default UsersPage;
