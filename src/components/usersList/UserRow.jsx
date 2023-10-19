import TrashIconButton from '@components/TrashIconButton.jsx';
import PropTypes from 'prop-types';


// user country must be one of those - for select/autocomplete implementation
import countryOptions from '../../data/countries.json';
import styles from './userList.module.css';
import { InputField } from './InputField.jsx';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string,
    isNew: PropTypes.bool,
    name: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  })),
};

const UserRow = ({ user }) => {
  return (
    <>
      <InputField value={user?.name} />
      <InputField value={user?.country} />
      <InputField value={user?.email} />
      <InputField value={user?.phone} />
      <TrashIconButton />
    </>
  );
};
UserRow.propTypes = propTypes;
export { UserRow };
