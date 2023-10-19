import { useCallback } from 'react';
import PropTypes from 'prop-types';
import TrashIconButton from '@components/TrashIconButton.jsx';
import { USER_FIELDS } from '@constants';
import { InputField } from './InputField.jsx';

const propTypes = {
  index: PropTypes.number,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.shape({
    isNew: PropTypes.bool,
    id: PropTypes.bool,
    name: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  })),
};

const UserRow = ({ user, index, onChange, onDelete }) => {

  const handleRemove = useCallback(() => {
    onDelete(user[USER_FIELDS.ID].value);
  }, [user, onDelete]);

  return (
    <>
      <InputField entity={user} index={index} onChange={onChange} fieldType={USER_FIELDS.NAME} />
      <InputField entity={user} index={index} onChange={onChange}
                  fieldType={USER_FIELDS.COUNTRY} />
      <InputField entity={user} index={index} onChange={onChange}
                  fieldType={USER_FIELDS.EMAIL} />
      <InputField entity={user} index={index} onChange={onChange}
                  fieldType={USER_FIELDS.PHONE} />
      <TrashIconButton handleClick={handleRemove} />
    </>
  );
};

UserRow.propTypes = propTypes;
export { UserRow };
