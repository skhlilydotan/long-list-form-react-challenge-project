import {useFormikContext} from "formik";
import {useCallback} from "react";
import {Box} from "@mui/material";
import AutocompleteField from "../../../components/AutocompleteField.jsx";

export const AutocompleteFieldWithData = ({placeholder, name, options}) => {
    const {getFieldMeta, setFieldValue, handleBlur} = useFormikContext();
    const {value, error, touched} = getFieldMeta(name);
    const onChangeHandle = useCallback((_, value) => setFieldValue(name, value), [name, setFieldValue])
    return (
        <Box pt={1}>
            <AutocompleteField
                placeholder={placeholder}
                name={name}
                onChange={onChangeHandle}
                value={value}
                onBlur={handleBlur}
                options={options}
                error={touched && !!error}
                helperText={touched && error}
            />
        </Box>
    )
}
