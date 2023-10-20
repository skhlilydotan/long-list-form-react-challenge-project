import { useCallback } from 'react';
import PropTypes from 'prop-types';
import _find from 'lodash/find';
import { USER_FIELDS } from '@constants';
import { USER_FIELDS_PLACEHOLDER } from './constants.js';
import { Select } from '@common/select';
import styles from './userList.module.css';


const propTypes = {
  entity: PropTypes.objectOf(PropTypes.shape({
    value: PropTypes.string,
    isNew: PropTypes.bool,
    error: PropTypes.bool,
    empty: PropTypes.bool,
  })),
  options: PropTypes.array,
  fieldType: PropTypes.oneOf(Object.values(USER_FIELDS)),
  index: PropTypes.number,
  onChange: PropTypes.func,
};
const SelectField = ({ options, entity, index, onChange, fieldType }) => {
  const { value, empty, error, isNew } = entity[fieldType];
  const selected = isNew ? null : _find(options, { 'value': value });

  const destructive = !isNew && (error || empty);
  const placeholder = destructive ? '' : USER_FIELDS_PLACEHOLDER[fieldType];

  const handleOnChanged = useCallback((e) => {
    onChange(e, index, fieldType);
  }, [index, onChange, fieldType]);

  const handleOnBlur = useCallback((e) => {
    if (isNew) {
      onChange(e, index, fieldType, isNew);
    }
  }, [index, isNew, onChange, fieldType]);

  return (
    <div className={styles.selectRowInput}>
      <Select
        destructive={destructive}
        placeholder={placeholder}
        value={selected ? selected : null}
        defaultValue={selected ? selected : null}
        menuPortalTarget={document.body}
        menuPosition={'fixed'}
        isSearchable
        onChange={handleOnChanged}
        onBlur={handleOnBlur}
        options={options}

      />
    </div>
  );
};

SelectField.propTypes = propTypes;

export { SelectField };