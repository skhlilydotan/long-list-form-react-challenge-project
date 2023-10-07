import {Typography} from '@mui/material';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import AutoSizer from "react-virtualized-auto-sizer";
import {FieldArray} from "formik";
import {VirtualListContainer} from "./VirtualListContainer.jsx";
import {UsersListCount} from "./UsersListCount.jsx";

const addButton = ({ unshift }) => (
    <AddButton handleClick={() => unshift({id: Date.now(), newUser: true})}/>
);

const virtualListContainer = ({ height, width }) => (
    <VirtualListContainer height={height} width={width} />
);

function UsersList() {
    return (
        <div className={styles.usersList}>
            <div className={styles.usersListHeader}>
                <Typography variant="h6">Users List <UsersListCount /> </Typography>
                <FieldArray name="usersData">
                    {addButton}
                </FieldArray>
            </div>
            <div className={styles.usersListContent}>
                <AutoSizer>
                    {virtualListContainer}
                </AutoSizer>
            </div>
        </div>
    );
}

export default UsersList;
