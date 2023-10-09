import {useFormikContext} from "formik";
import styles from "./users.module.css";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import {USERS_ROOT_FIELD} from "./constants.js";

export function SaveButton({saveUserData}) {
    const {errors, touched, values} = useFormikContext();
    const hasError = errors[USERS_ROOT_FIELD]?.some(
        (field, index) => field && touched[USERS_ROOT_FIELD]?.[index]
    );
    return <div className={styles.rightButtonContainer}>
        <PrimaryButton
            disabled={hasError}
            handleClick={() => {saveUserData(values)}}
        >
            Save
        </PrimaryButton>
    </div>;
}
