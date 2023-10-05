import { Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {useFormikContext, FieldArray} from "formik";
import {useCallback} from "react";

function VirtualListContainer({ height, width }) {
    const {values} = useFormikContext();
    const render = useCallback(({ index, style }) => (
        <div style={style}>
            <UserRow field="usersData" index={index}/>
        </div>
    ), []);

    return <List
        height={height}
        itemData={values.usersData}
        itemCount={values.usersData?.length}
        itemSize={60}
        itemKey={(index, data) => data[index].id}
        width={width}
    >
        {render}
    </List>
}

function UsersListCount () {
    const {values} = useFormikContext();
    return <b>({values.usersData?.length})</b>
}

function UsersList() {
    const addButton = useCallback(({ unshift }) => (
        <AddButton handleClick={() => unshift({id: Date.now(), newUser: true})}/>
    ), [])
    const virtualListContainer = useCallback(({ height, width }) => (
        <VirtualListContainer height={height} width={width} />
    ), [])

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
