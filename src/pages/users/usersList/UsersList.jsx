import {Button, CircularProgress, Typography} from '@mui/material';
import {useUsersContext} from '../../../context/usersContext';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import {useEffect} from "react";

function UsersList() {
    const usersContext = useUsersContext();

    useEffect(() =>{
        if (usersContext.saving) {
            usersContext.propogatingSave();
        }
    }, [usersContext.saving])

    return (<div className={styles.usersList}>
        <div className={styles.usersListHeader}>
            <Typography variant="h6">
                Users List ({usersContext.usersData.length})
            </Typography>
            {usersContext.loading && <span className={styles.userSpinner}>
                    <CircularProgress/>
                </span>}
            <AddButton
                handleClick={() => {
                    usersContext.addNewUser();
                }}/>
        </div>

        <div className={styles.usersListContent}>
            {usersContext.usersData.map((user, index) => {
                if (usersContext.saving){
                    if (index === usersContext.usersData.length - 1) {
                        setTimeout(() => {
                            usersContext.propogatingSave();
                        }, 0);
                    }
                    return (<UserRow key={user.id} user={user} saveNow={true}/>);
                }
                return (<UserRow key={user.id} user={user}/>)})}
        </div>
        {usersContext.errorProps + usersContext.emptyProps > 0 &&
            <div className={styles.usersListFooter}><Typography variant='h6'>
                    <span>Errors: Empty Fields - {usersContext.emptyProps},
                        Invalid Fields - {usersContext.errorProps} </span>
            </Typography></div>}
    </div>);
}

export default UsersList;
