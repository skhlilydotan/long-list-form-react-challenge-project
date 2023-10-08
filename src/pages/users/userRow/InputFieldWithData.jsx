import {useFormikContext} from "formik";
import {useCallback, useEffect, useState} from "react";
import {Box, debounce} from "@mui/material";
import InputField from "../../../components/InputField.jsx";

export const InputFieldWithData = ({placeholder, name}) => {
    const {getFieldMeta, handleChange, handleBlur} = useFormikContext();
    const {value, error, touched} = getFieldMeta(name);
    const [localValue, setLocalValue] = useState(value ?? '');
    useEffect(() => {
        setLocalValue(value ?? '');
    }, [value]);
    const handleInputChange = useCallback((e, value) => {
        const debouncedHandleChange = debounce(handleChange);
        setLocalValue(value);
        debouncedHandleChange(e, value);
    }, [handleChange]);
    return (
        <Box pt={1}>
            <InputField
                placeholder={placeholder}
                name={name}
                onChange={handleInputChange}
                value={localValue}
                onBlur={handleBlur}
                error={touched && !!error}
                helperText={touched && error}
            />
        </Box>
    )

}
