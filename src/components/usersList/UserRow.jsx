import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { USER_FIELDS } from '@constants';
import { InputField } from './InputField.jsx';
import { SelectField } from '@components/usersList/SelectField.jsx';
import { useSelector } from 'react-redux';
import { getCountries } from '@slices/countriesSlice.js';
import { Button } from '@common/button';
import { SIZES, SKINS } from '@common/constants';
import Trash from '@common/assets/icons/trash-01.svg?react';
import DOMPurify from 'dompurify';

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
  const countries = useSelector(getCountries);
  const countriesOptions = useMemo(() => countries.map(country => ({
    value: DOMPurify.sanitize(country),
    label: DOMPurify.sanitize(country),
  })), [countries]);

  const handleRemove = useCallback(() => {
    onDelete(user[USER_FIELDS.ID].value);
  }, [user, onDelete]);

  return (
    <>
      <InputField entity={user} index={index} onChange={onChange} fieldType={USER_FIELDS.NAME} />
      <SelectField entity={user} options={countriesOptions} index={index} onChange={onChange}
                   fieldType={USER_FIELDS.COUNTRY} />
      <InputField entity={user} index={index} onChange={onChange}
                  fieldType={USER_FIELDS.EMAIL} />
      <InputField entity={user} index={index} onChange={onChange}
                  fieldType={USER_FIELDS.PHONE} />
      <Button buttonType={SKINS.TERTIARY_GRAY} buttonSize={SIZES.MD} onClick={handleRemove}>
        <Button.Icon>
          <Trash />
        </Button.Icon>
      </Button>
    </>
  );
};

UserRow.propTypes = propTypes;
export { UserRow };
