import {useFormikContext} from "formik";
import {REQUIRED_FIELD_ERROR} from "./validationSchema.js";
import {Alert, Box} from "@mui/material";

export function ErrorMessage() {
    const {errors, touched} = useFormikContext();
    let emptyFieldErrorCount = 0;
    let invalidFieldErrorCount = 0;
    errors.usersData?.forEach((row, index) => {
        if (!row) return;
        Object.entries(row).forEach(([fieldName, message]) => {
            if (touched.usersData?.[index]?.[fieldName]) {
                if (message === REQUIRED_FIELD_ERROR) {
                    emptyFieldErrorCount++
                } else {
                    invalidFieldErrorCount++
                }
            }
        });
    });
    return (
        <Box width='100%'>
            <Alert
                variant="filled"
                severity={invalidFieldErrorCount ? 'error' : emptyFieldErrorCount ? 'warning' : 'success'}
            >
                Errors: Empty Fields - {emptyFieldErrorCount}, Invalid Fields - {invalidFieldErrorCount}
            </Alert>
        </Box>
    );
}
