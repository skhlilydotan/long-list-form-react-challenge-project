import { TextField } from '@mui/material';
import {useMemo} from "react";

const InputField = ({ name, value, error, disabled, placeholder,...otherProps }) => {
  const inputProps = useMemo(() => ({
      ...(otherProps?.inputProps ?? {}),
      autoComplete: 'off',
  }), [otherProps?.inputProps])

  return (
    <TextField
      name={name}
      value={value}
      error={error}
      disabled={disabled}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      autoComplete="off"
      {...otherProps}
      inputProps={inputProps}
    />
  );
};


export default InputField;
