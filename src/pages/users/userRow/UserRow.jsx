import {Grid} from '@mui/material';
import styles from '../users.module.css';
import countryOptions from '../../../data/countries.json';
import {memo} from "react";
import {InputFieldWithData} from "./InputFieldWithData.jsx";
import {AutocompleteFieldWithData} from "./AutocompleteFieldWithData.jsx";
import {RemoveButton} from "./RemoveButton.jsx";

const UserRowMemo = memo(function UserRow({ field, index }) {
    const path = `${field}[${index}]`;

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
                <RemoveButton index={index} field={field}/>
            </Grid>
        </Grid>
    );
});

export default UserRowMemo;
