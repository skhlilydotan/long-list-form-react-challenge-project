import * as Yup from "yup";
import {USERS_ROOT_FIELD} from "./constants.js";

export const REQUIRED_FIELD_ERROR = 'required field';

export const validationSchema = Yup.object().shape({
    [USERS_ROOT_FIELD]: Yup.array().of(
        Yup.object().shape({
            name: Yup.string()
                .matches(/^[a-z ]+$/i, 'name should include only letters a-z (not case sensitive)')
                .required(REQUIRED_FIELD_ERROR),
            country: Yup.string().required(REQUIRED_FIELD_ERROR),
            email: Yup.string().email('invalid email').required(REQUIRED_FIELD_ERROR),
            phone: Yup.string()
                .matches(/^([+][^+]+)$/, `must have a '+' character as first character, but only one '+'`)
                .required(REQUIRED_FIELD_ERROR),
        })
    ),
});
