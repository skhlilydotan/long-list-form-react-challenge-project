import { Grid } from '@mui/material';

import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';

import { useUsersContext } from '../../../context/usersContext';
import { useUserFormContext } from '../../../context/userFormContext';

import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../../data/countries.json';

const UserRow = ({ user }) => {
  const { deleteUser: deleteUserById } = useUsersContext();
  const { newUser, modifiedUsers, setModifiedUser, setField, removeEmptyUser } =
    useUserFormContext();
  const uiProperties = Object.entries(user).filter(([key]) => key !== 'id');

  const onChange = (field, value) => setField({ userId: user.id, field, value });
  const onFocus = () => {
    if (newUser && newUser.id === user.id) {
      return;
    }

    setModifiedUser(user);
  };
  const getRemoveUser = () =>
    user.id === newUser?.id ? removeEmptyUser : deleteUserById; //useCallback?
  const getValue = (field, value) => {
    if (newUser && newUser.id === user.id) {
      return newUser[field].value;
    }

    if (modifiedUsers[user.id]) {
      return modifiedUsers[user.id][field].value;
    }

    return value;
  };

  const removeUser = getRemoveUser();

  return (
    <Grid container className={styles.userRow}>
      {uiProperties.map(([field, value]) => (
        <InputField
          key={`${user.id}_${field}`}
          name={field}
          value={getValue(field, value)}
          fullWidth={false}
          onChangehandler={onChange}
          onFocus={onFocus} // come back to bug
          onBlur={() => {}} // avoid additional unnecessary onFocus
        />
      ))}
      <TrashIconButton handleClick={() => removeUser(user.id)} />
    </Grid>
  );
};

export default UserRow;
