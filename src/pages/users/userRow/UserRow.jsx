import {Autocomplete, debounce, Grid} from '@mui/material';
import InputField from '../../../components/InputField';
import TrashIconButton from '../../../components/TrashIconButton';
import styles from '../users.module.css';

// user country must be one of those - for select/autocomplete implementation

import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {CountryValidator, EmailValidator, NameValidator, PhoneValidator} from "../../../components/validators";
import UsersContext from "../../../context/usersContext.jsx";
import usersContext from "../../../context/usersContext.jsx";
import AutocompleteField from "../../../components/AutocompleteField.jsx";

const changeHandler = (prop, value, handler) => {
    handler((old) => {
        return {
            ...old, [prop]: value,
        }
    })
}

const SKIP_EMPTY_CHECK = true;

const UserRow = ({user, saveNow}) => {
    const userContext = useContext(UsersContext);
    const [name, setName] = useState(user.name);
    const [nameDirty, setNameDirty] = useState(false);
    const [country, setCountry] = useState(user.country);
    const [countryDirty, setCountryDirty] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [emailDirty, setEmailDirty] = useState(false);
    const [phone, setPhone] = useState(user.phone);
    const [phoneDirty, setPhoneDirty] = useState(false);

    const handleEffect = useCallback(() => {
        let emptyProps = [name, country, phone, email].filter((prop) => prop === '').length;
        let errorProps = [
            !NameValidator(name, SKIP_EMPTY_CHECK) && nameDirty,
            !PhoneValidator(phone, SKIP_EMPTY_CHECK) && phoneDirty,
            !EmailValidator(email, SKIP_EMPTY_CHECK) && emailDirty,
            !CountryValidator(country, SKIP_EMPTY_CHECK) && countryDirty,
        ]
            .filter((prop) => prop).length;

        emptyProps > 0 ? userContext.setEmptyProps(user.id, emptyProps) : userContext.removeEmptyProps(user.id);
        errorProps > 0 ? userContext.setErrorProps(user.id, errorProps) : userContext.removeErrorProps(user.id);
    }, [name, country, phone, email]);

    // Create a debounced version of the effect
    const debouncedEffect = useCallback(debounce(handleEffect, 500), [handleEffect]);

    useEffect(() => {
        // Call the debounced effect when any dependency changes
        debouncedEffect();
    }, [debouncedEffect]);

    useEffect(() => {
        if (saveNow && (nameDirty || countryDirty || phoneDirty || emailDirty)) {
            userContext.saveUser(user.id, {
                id: user.id,
                name,
                country,
                phone,
                email
            });
            setPhoneDirty(false);
            setCountryDirty(false);
            setNameDirty(false);
            setEmailDirty(false);
            console.log(`saving ${user.id}`)
        }
    }, [saveNow]);

    return (<Grid container className={styles.userRow} spacing={1}>

        <Grid item xs={2}>
            <InputField
                name={'name'}
                value={name}
                dirty={nameDirty}
                setDirty={setNameDirty}
                placeholder={'User Name'}
                onChangehandler={(name, value) => {
                    setName(value);
                }}
                error={!NameValidator(name)}/>
        </Grid>
        <Grid item xs={2}>
            <InputField
                name={'country'}
                value={country}
                dirty={countryDirty}
                setDirty={setCountryDirty}
                placeholder={'User Country'}
                onChangehandler={(name, value) => {
                    setCountry(value);
                }}
                error={!CountryValidator(country)}/>
        </Grid>
        <Grid item xs={4}>
            <InputField
                name={'email'}
                value={email}
                dirty={emailDirty}
                setDirty={setEmailDirty}
                placeholder={'email@domain.com'}
                onChangehandler={(name, value) => {
                    setEmail(value)
                }}
                error={!EmailValidator(email)}/>
        </Grid>
        <Grid item xs={3}>
            <InputField
                name={'phone'}
                value={phone}
                placeholder={'+9720522222222'}
                dirty={phoneDirty}
                setDirty={setPhoneDirty}
                onChangehandler={(name, value) => {
                    setPhone(value)
                }}
                error={!PhoneValidator(phone)}/>
        </Grid>
        {/* Render each user row inputs and trash icon at the end of each row */}
        <Grid item xs={1}>
            <TrashIconButton handleClick={() => {
                userContext.removeUser(user.id);
            }}/>
        </Grid>
    </Grid>);
};

export default UserRow;
