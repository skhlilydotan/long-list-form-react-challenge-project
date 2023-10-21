import countryOptions from '../data/countries.json';
const nameReg = new RegExp(/[a-zA-Z\s]+/)
const emailReg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
const phoneReg = new RegExp(/\+(\d+)$/)


const regOrEmpty = (value, skipCheckEmpty, reg) => (skipCheckEmpty && value === '') || reg.test(value);
export const NameValidator = (value, skipCheckEmpty) => regOrEmpty(value, skipCheckEmpty, nameReg);

export const CountryValidator = (value, skipCheckEmpty) => (skipCheckEmpty && value === '') || countryOptions.indexOf(value) !== -1;

export const EmailValidator = (value, skipCheckEmpty) => regOrEmpty(value, skipCheckEmpty, emailReg);

export const PhoneValidator = (value, skipCheckEmpty) =>  regOrEmpty(value, skipCheckEmpty, phoneReg);