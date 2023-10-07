import {useFormikContext} from "formik";
import styles from "./users.module.css";
import PrimaryButton from "../../components/PrimaryButton.jsx";

export function SaveButton() {
    const {errors, touched} = useFormikContext();
    const hasError = errors.usersData?.some(
        (field, index) => field && touched.usersData[index]
    );
    return <div className={styles.rightButtonContainer}>
        <PrimaryButton
            disabled={hasError}
            type="submit"
        >
            Save
        </PrimaryButton>
    </div>;
}
