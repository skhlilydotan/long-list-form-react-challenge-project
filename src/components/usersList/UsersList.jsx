import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from 'react-virtualized';
import DOMPurify from 'dompurify';
import { getState, getUsers, saveUsers, LOADING_STATES } from '@slices/usersSlice';
import { getCountries } from '@slices/countriesSlice';
import { Card } from '@common/card';
import { Button } from '@common/button';
import { Container } from '@common/container';
import { SIZES, SKINS } from '@common/constants';
import { USER_FIELDS } from '@constants';
import { validateInList } from '@utils/validation';
import { Badge, BADGE_COLORS } from '@common/badge';
import { INPUT_CONTENT_TYPE, INPUT_TYPES, TextInput } from '@common/inputs';
import { LoadingIndicator } from '@common/loadingIndicator';
import { EmptyState } from '@common/emptyState';
import PlusIcon from '@common/assets/icons/plus.svg?react';
import SearchIcon from '@common/assets/icons/search-lg.svg?react';
import { transformUsers, unTransformUsers, validateFields, initNewUser } from './utils';
import { USER_FIELDS_VALIDATION } from './constants';
import styles from './userList.module.css';
import { UserRow } from './UserRow.jsx';

const UsersList = () => {
  const ListRef = useRef(null);
  const dispatch = useDispatch();
  const status = useSelector(getState);
  const usersData = useSelector(getUsers);
  const countries = useSelector(getCountries);
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(transformUsers(usersData));
  }, [usersData]);

  const filteredUsers = useMemo(() => {
    if (searchTerm) {
      return users?.filter(user =>
        Object.values(user).some(item =>
          String(item.value).toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
    return users;
  }, [users, searchTerm]);

  const summary = useMemo(() => {
    const counts = users.reduce(
      (acc, user) => {
        Object.keys(user).forEach((key) => {
          if (USER_FIELDS_VALIDATION.includes(key)) {
            if (user[key].error) acc.invalid++;
            if (user[key].empty && !user[key].isNew) acc.empty++;
            if (user[key].isNew) acc.isNew++;
          }
        });
        return acc;
      },
      { invalid: 0, empty: 0, isNew: 0 },
    );
    return { total: users.length, empty: counts.empty, invalid: counts.invalid, isNew: counts.isNew };
  }, [users]);

  const handleSave = useCallback(() => {
    dispatch(saveUsers({ users: unTransformUsers(users) }));
  }, [dispatch, users]);

  const handleChange = useCallback((e, index, field) => {
    const value = DOMPurify.sanitize(e.target?.value || e.value);
    console.log(value);
    let error = false;
    const empty = !value || value === '';

    if (!empty) {
      switch (field) {
        case USER_FIELDS.NAME:
        case USER_FIELDS.PHONE:
        case USER_FIELDS.EMAIL:
          error = !validateFields(field, value);
          break;
        case USER_FIELDS.COUNTRY:
          error = !validateInList(value, countries);
          break;
        default:
          break;
      }
    }

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index][field] = { value, error, empty, isNew: false };
      return updatedUsers;
    });
  }, [setUsers, countries]);

  const handleAdd = useCallback(() => {
    setUsers((prevUsers) => ([initNewUser(), ...prevUsers]));
    ListRef.current.forceUpdate();
    ListRef.current.scrollToRow(0);
  }, [setUsers]);

  const handleDelete = useCallback((id) => (
    setUsers((prevUsers) => [...prevUsers.filter(user => user.id.value !== id)])
  ), [setUsers]);

  const rowRenderer = useCallback(({ index, key, style }) => {
    const user = filteredUsers[index];
    return (
      <div key={key} className={styles.userRow} style={style}>
        <UserRow user={user} index={index} onChange={handleChange} onDelete={handleDelete} />
      </div>
    );
  }, [filteredUsers, handleChange, handleDelete]);

  const onSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchTerm(value);
  }, [setSearchTerm]);

  const renderList = () => (usersData.length ? <List
      ref={ListRef}
      width={1200}
      height={400}
      rowCount={filteredUsers?.length}
      rowHeight={46}
      scrollToAlignment='center'
      rowRenderer={rowRenderer}
      overscanRowCount={30}
    /> : <EmptyState />

  );
//TODO: fix Icon
  return (
    <Container>
      <Card>
        <Card.Header title='Users List'>
          <div className={styles.badgeContainer}>
            <Badge text={`${summary.total} Users`} />
            <Badge text={`${summary.empty} Empty fields`} color={BADGE_COLORS.WARNING} />
            <Badge text={`${summary.invalid} Invalid fields`} color={BADGE_COLORS.ERROR} />
          </div>
          <div className={styles.actionsContainer}>
            <TextInput
              className={styles.userRowInput}
              value=''
              inline
              placeholder='Search'
              size={SIZES.SM}
              valueType={INPUT_CONTENT_TYPE.TEXT}
              type={INPUT_TYPES.DEFAULT}
              onBlur={onSearch}
              icon={<SearchIcon />}
            />
            <Button buttonSize={SIZES.MD} buttonType={SKINS.SECONDARY_GRAY} label='Save' onClick={handleSave}
                    disabled={Boolean(summary.isNew || summary.empty || summary.invalid)} />
            <Button buttonSize={SIZES.MD} buttonType={SKINS.PRIMARY} onClick={handleAdd}>
              <Button.Icon><PlusIcon /></Button.Icon>
              <Button.Text value='Add user' />
            </Button>
          </div>
        </Card.Header>


        <div className={styles.usersListContent}>
          {status === LOADING_STATES.LOADING ? <LoadingIndicator value='Loading...' /> : renderList()
          }
        </div>
      </Card>
    </Container>
  );
};

export default UsersList;
