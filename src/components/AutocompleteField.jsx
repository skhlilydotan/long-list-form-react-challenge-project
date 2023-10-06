import {Autocomplete} from "@mui/material";
import InputField from "./InputField.jsx";
import {useCallback} from "react";
const AutocompleteField = ({options, name, value, onChange, error, disabled, placeholder, helperText, onBlur}) => {
  const renderInput = useCallback((params) => (
      <InputField
          {...params}
          name={name}
          error={error}
          helperText={helperText}
          disabled={disabled}
          placeholder={placeholder}
      />
  ), [name, error, helperText, disabled, placeholder])

  return <Autocomplete
      options={options}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      onBlur={onBlur}
      value={value}
      popupIcon={null}
      renderInput={renderInput}
  />;
};

// TODO: Implement passed props
AutocompleteField.defaultProps = {
  name: 'autocomplete_field_name',
  value: null,
  error: false,
  disabled: false,
  placeholder: '',
  options: [],
};

export default AutocompleteField;
