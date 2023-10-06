import {Box, debounce, Grid} from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import AutocompleteField from "../../../components/AutocompleteField.jsx";
import styles from '../users.module.css';
import countryOptions from '../../../data/countries.json';
import {FieldArray, useFormikContext} from "formik";
import {memo, useCallback, useEffect, useState} from "react";


const InputFieldWithData = ({placeholder, name}) => {
    const { getFieldMeta, handleChange, handleBlur } = useFormikContext();
    const {value, error, touched} = getFieldMeta(name);
    const [localValue, setLocalValue] = useState(value ?? '');
    useEffect(() => {
        setLocalValue(value ?? '');
    }, [value]);
    const debouncedHandleChange = debounce(handleChange, 300);
    const handleInputChange = (e, value) => {
        setLocalValue(value);
        debouncedHandleChange(e, value);
    };
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

const AutocompleteFieldWithData = ({placeholder, name, options}) => {
    const { getFieldMeta, setFieldValue, handleBlur } = useFormikContext();
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

const UserRowMemo = memo(function UserRow({ field, index }) {
    const path = `${field}[${index}]`;
    const removeButton = useCallback(({remove, form}) => (
        <TrashIconButton
            handleClick={() => {
                const {id, newUser} = remove(index);
                if(!newUser) {
                    form.setFieldValue('removedIds', (prev) => ([...(prev ?? []), id]))
                }
            }}
        />
    ), [index]);

    return (
        <Grid container className={styles.userRow} direction="row" spacing={1} alignItems={'start'}>
            <Grid item xs>
                <InputFieldWithData placeholder="Name" name={`${path}.name`} />
            </Grid>
            <Grid item xs>
                <AutocompleteFieldWithData placeholder="Country" name={`${path}.country`} options={countryOptions}/>
            </Grid>
            <Grid item xs>
                <InputFieldWithData placeholder="Email" name={`${path}.email`}/>
            </Grid>
            <Grid item xs>
                <InputFieldWithData placeholder="Phone" name={`${path}.phone`}/>
            </Grid>
            <Grid item width={60}>
                <FieldArray name={field}>
                    {removeButton}
                </FieldArray>
            </Grid>
        </Grid>
    );
});

export default UserRowMemo;
