import { Typography } from '@mui/material';
import UserRow from '../userRow/UserRow';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {useFormikContext, FieldArray} from "formik";
import {useCallback, useEffect, useRef} from "react";

const virtualListRender = (({ index, style }) => (
    <div style={style}>
        <UserRow field="usersData" index={index}/>
    </div>
));

function VirtualListContainer({ height, width }) {
    const {values, getFieldMeta} = useFormikContext();
    const listRef = useRef(null);
    const previousErrorsRef = useRef([]);


    const getItemSize = useCallback((index) => {
        const {error, touched} = getFieldMeta(`usersData[${index}]`);
        const hasError = touched && error;
        return hasError ? 120 : 60;
    },[getFieldMeta]);

    useEffect(() => {
        const currentErrors = values.usersData.map((_, index) => {
            const { error, touched } = getFieldMeta(`usersData[${index}]`);
            return touched && error;
        });

        currentErrors.some((hasError, index) => {
            if (previousErrorsRef.current[index] !== hasError) {
                listRef.current.resetAfterIndex(index);
                return true;
            }
        });

        previousErrorsRef.current = currentErrors;
    }, [values.usersData, getFieldMeta]);

    return <List
        height={height}
        ref={listRef}
        itemData={values.usersData}
        itemCount={values.usersData?.length}
        itemSize={getItemSize}
        itemKey={(index, data) => data[index].id}
        width={width}
    >
        {virtualListRender}
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
