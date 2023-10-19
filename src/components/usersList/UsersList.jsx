import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-virtualized';
import _sortBy from 'lodash/sortBy';
import { UserRow } from './UserRow.jsx';
import { Card } from '@common/card/index.js';
import { Button } from '@common/button/index.js';
import { ICONS } from '@common/svg';
import { createRef, useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useResizeObserver } from '@hooks';
import { Container } from '@common/container';
import styles from './userList.module.css';
import { SKINS } from '@common/constants';
import { getUsers, addUser, editUser } from '@slices/usersSlice';

const UsersList = () => {
  const [, forceUpdate] = useState();
  const dispatch = useDispatch();
  const usersData = useSelector(getUsers);
  // const contentRef = useRef(null);
  const ListRef = useRef(null);
  // const { height: contentHeight } = useResizeObserver({
  //   ref: contentRef,
  //   forceTrigger: true,
  // });

  // const usersData = useMemo(() => {
  //   console.log('users', users);
  //   return _sortBy(users, ['isNew']);
  // }, [users]);

  const handleEdit = (userId, changes) => {
    dispatch(editUser({ id: userId, changes }));
  };
  const handleAdd = () => {
    dispatch(addUser());
    setTimeout(() => {
      ListRef.current.forceUpdate();
      ListRef.current.scrollToRow(0);
    }, 10);
  };
  const rowRenderer = ({ index, key, style }) => {
    const user = usersData[index];
    return (
      <div key={key} className={styles.userRow} style={style}>
        <UserRow user={user} />
      </div>
    );
  };
//TODO: fix Icon
  return (
    <Container>
      <Card>
        <Card.Header title='Users List'>
          <Button buttonType={SKINS.SECONDARY_GRAY} label='Save' />
          <Button buttonType={SKINS.PRIMARY} onClick={handleAdd}>
            <Button.Icon iconName={ICONS.PLUS} />
            <Button.Text value='Add user' />
          </Button>
        </Card.Header>
        {usersData &&
          <div className={styles.usersListContent}>
            <List
              ref={ListRef}
              width={1200}
              height={400}
              rowCount={usersData?.length}
              rowHeight={46}
              scrollToAlignment='center'
              scrollToRow={30}
              rowRenderer={rowRenderer}
              overscanRowCount={30}
            />
          </div>}
      </Card>
    </Container>
  );
};

export default UsersList;
