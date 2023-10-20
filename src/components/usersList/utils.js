import { USER_FIELDS } from '@constants';
import { validateName, validateEmail, validatePhone, validateInList } from '@utils/validation.js';
import { v4 as uuidv4 } from 'uuid';

const initNewUser = () => ({
  id: { value: uuidv4() },
  name: { value: '', error: false, empty: false, isNew: true },
  country: { value: '', error: false, empty: false, isNew: true },
  email: { value: '', error: false, empty: false, isNew: true },
  phone: { value: '', error: false, empty: false, isNew: true },
});

const transformUsers = (usersArray) => {
  return usersArray.map(user => {
    return {
      id: { value: user.id },
      name: { value: user.name, error: false, empty: user.name === '', isNew: user.isNew },
      country: { value: user.country, error: false, empty: user.country === '', isNew: user.isNew },
      email: { value: user.email, error: false, empty: user.email === '', isNew: user.isNew },
      phone: { value: user.phone, error: false, empty: user.phone === '', isNew: user.isNew },
    };
  });
};

const unTransformUsers = (usersArray) => {
  return usersArray.map(user => {
    return {
      id: user.id.value,
      name: user.name.value,
      country: user.country.value,
      email: user.email.value,
      phone: user.phone.value,
    };
  });
};

const USER_FIELDS_INPUT_VALIDATION = {
  [USER_FIELDS.NAME]: validateName,
  [USER_FIELDS.EMAIL]: validateEmail,
  [USER_FIELDS.PHONE]: validatePhone,
};
const validateFields = (field, value) => {
  return USER_FIELDS_INPUT_VALIDATION[field](value);
};

export { transformUsers, unTransformUsers, validateFields, initNewUser };