import {Grid} from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import AutocompleteField from "../../../components/AutocompleteField.jsx";
import styles from '../users.module.css';
import countryOptions from '../../../data/countries.json';
import {FieldArray, useFormikContext} from "formik";
import {memo, useCallback} from "react";


const InputFieldWithData = ({placeholder, name}) => {
    const { getFieldMeta, handleChange, handleBlur } = useFormikContext();
    const {value} = getFieldMeta(name);
    return <InputField
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
    />
}

const AutocompleteFieldWithData = ({placeholder, name, options}) => {
    const { getFieldMeta, setFieldValue } = useFormikContext();
    const {value} = getFieldMeta(name);
    const onChangeHandle = useCallback((_, value) => setFieldValue(name, value), [name, setFieldValue])
  return <AutocompleteField
      placeholder={placeholder}
     name={name}
     onChange={onChangeHandle}
     value={value}
     options={options}
  />
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
        <Grid container className={styles.userRow} direction="row" spacing={1}>
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
            <Grid item width={50}>
                <FieldArray name={field}>
                    {removeButton}
                </FieldArray>
            </Grid>
        </Grid>
    );
});

export default UserRowMemo;
