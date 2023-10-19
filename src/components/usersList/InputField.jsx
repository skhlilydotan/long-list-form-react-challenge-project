import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { INPUT_CONTENT_TYPE, INPUT_TYPES, TextInput } from '@common/inputs';
import { SIZES } from '@common/constants';
import { USER_FIELDS } from '@constants';
import styles from './userList.module.css';
import { USER_FIELDS_PLACEHOLDER } from './constants.js';

const propTypes = {
  entity: PropTypes.objectOf(PropTypes.shape({
    value: PropTypes.string,
    error: PropTypes.bool,
    empty: PropTypes.bool,
  })),
  fieldType: PropTypes.oneOf(Object.values(USER_FIELDS)),
  index: PropTypes.number,
  onChange: PropTypes.func,
};
const InputField = ({ entity, index, onChange, fieldType }) => {
  const { value, empty, error, isNew } = entity[fieldType];
  const destructive = !isNew && (error || empty);
  const placeholder = destructive ? '' : USER_FIELDS_PLACEHOLDER[fieldType];

  const handleOnChanged = useCallback((e) => {
    onChange(e, index, fieldType);
  }, [index, onChange, fieldType]);

  return (
    <TextInput
      className={styles.userRowInput}
      inline
      value={value}
      placeholder={placeholder}
      destructive={destructive}
      onBlur={handleOnChanged}
      size={SIZES.SM}
      valueType={INPUT_CONTENT_TYPE.TEXT}
      type={INPUT_TYPES.DEFAULT} />
  );
};

InputField.propTypes = propTypes;

export { InputField };