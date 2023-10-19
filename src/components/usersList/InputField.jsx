import PropTypes from 'prop-types';
import { INPUT_CONTENT_TYPE, INPUT_TYPES, TextInput } from '@common/inputs';
import { SIZES } from '@common/constants';
import styles from './userList.module.css';

const propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
};
const InputField = ({ value, placeholder }) => (
  <TextInput className={styles.userRowInput} inline value={value} placeholder={placeholder} size={SIZES.SM}
             valueType={INPUT_CONTENT_TYPE.TEXT}
             type={INPUT_TYPES.DEFAULT} />
);

InputField.propTypes = propTypes;

export { InputField };