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
