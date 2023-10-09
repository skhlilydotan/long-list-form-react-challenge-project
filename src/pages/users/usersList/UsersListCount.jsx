import {useFormikContext} from "formik";
import {USERS_ROOT_FIELD} from "../constants.js";

export function UsersListCount() {
    const {values} = useFormikContext();
    return <b>({values[USERS_ROOT_FIELD]?.length})</b>
}
