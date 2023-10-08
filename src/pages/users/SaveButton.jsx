import {useFormikContext} from "formik";
import styles from "./users.module.css";
import PrimaryButton from "../../components/PrimaryButton.jsx";

export function SaveButton({saveUserData}) {
    const {errors, touched, values} = useFormikContext();
    const hasError = errors.usersData?.some(
        (field, index) => field && touched.usersData[index]
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
