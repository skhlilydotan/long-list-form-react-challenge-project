import allowedCountries from '../data/countries.json';

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

      break;
    default:
      throw new Error(`no such field: ${field}`);
  }

  return result;
}

function getTotalUsers({ modifiedUsers, newUser }) {
  let totalUsers;

  if (newUser) {
    totalUsers = { ...modifiedUsers, [newUser.id]: newUser };
  } else {
    totalUsers = modifiedUsers;
  }

  return totalUsers;
}

export function validateUsers({ newUser, modifiedUsers }) {
  let sumEmptyFields = 0;
  let sumInvalidFields = 0;

  let usersToValidate = getTotalUsers({ modifiedUsers, newUser });

  usersToValidate = Object.values(usersToValidate);

  usersToValidate.forEach((user) => {
    if (!user) {
      return;
    }

    const fields = Object.entries(user);

    for (const [_, { value, error }] of fields) {
      if (error) {
        sumInvalidFields++;
      } else if (value === '') {
        sumEmptyFields++;
      }
    }
  });

  return { sumInvalidFields, sumEmptyFields };
}

export function getFormUsersCount(newUser, modifiedUsers) {
  let usersForCount = getTotalUsers({ newUser, modifiedUsers });

  return Object.values(usersForCount).reduce((sum, currentUser) => {
    if (!currentUser) {
      return sum;
    }

    sum++;

    return sum;
  }, 0);
}
