const validateName = (name) => /^[a-zA-Z]+( [a-zA-Z]+)*$/.test(name);
const validateInList = (value, list) => list?.includes(value);
const validateEmail = (email) => email.split('@').length === 2;
const validatePhone = (phone) => phone[0] === '+' && phone.split('+').length === 2;

export { validateName, validateInList, validateEmail, validatePhone };