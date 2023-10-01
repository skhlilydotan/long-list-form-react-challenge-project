import allowedCountries from './data/countries.json';

export function toFormUser(plainUser) {
  return Object.entries(plainUser).reduce((result, [key, value]) => {
    result[key] = { value };

    return result;
  }, {});
}

export function toPlainUser(formUser) {
  return Object.entries(formUser).reduce((result, [key, { value }]) => {
    result[key] = value;

    return result;
  }, {});
}

export function validateField({ field, value }) {
  let result = null;

  switch (field) {
    case 'name':
      if (!/^[a-zA-Z ]*$/.test(value)) {
        result = { error: 'a-z letters only' };
      }

      break;
    case 'country':
      if (
        !allowedCountries
          .map((country) => country.toLowerCase())
          .includes(value.toLowerCase())
      ) {
        result = { error: 'country not allowed' };
      }

      break;
    case 'email':
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        result = { error: 'invalid email' };
      }

      break;
    case 'phone':
      if (value[0] !== '+') {
        result = { error: "must start with '+'" };
      }

      // another validation for amount of + ?

      break;
    default:
      throw new Error(`no such field: ${field}`);
  }

  return result;
}

export function validateUsers(users) {
  if (users === null) {
    return null;
  }

  const usersList = Object.values(users);

  let fields = null;

  const setProblematicField = (fieldName, problem) => {
    if (fields === null) {
      fields = [{ fieldName, problem }];
    } else {
      fields.push({ fieldName, problem });
    }
  };

  for (const user of usersList) {
    if (!user.id) {
      setProblematicField({ fieldName: 'id', problem: 'EMPTY' });
    }

    if (!user.name) {
      setProblematicField({ fieldName: 'name', problem: 'EMPTY' });
    }

    if (!user.country) {
      setProblematicField({ fieldName: 'country', problem: 'EMPTY' });
    }

    if (!user.phone) {
      setProblematicField({ fieldName: 'phone', problem: 'EMPTY' });
    }

    if (!user.email) {
      setProblematicField({ fieldName: 'email', problem: 'EMPTY' });
    }
  }

  return { fields, isValid: fields === null };
}
