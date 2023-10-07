import {useFormikContext} from "formik";

export function UsersListCount() {
    const {values} = useFormikContext();
    return <b>({values.usersData?.length})</b>
}
