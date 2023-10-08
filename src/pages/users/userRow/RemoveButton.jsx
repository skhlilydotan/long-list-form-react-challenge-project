import {useCallback} from "react";
import TrashIconButton from "../../../components/TrashIconButton.jsx";
import {FieldArray} from "formik";

export const RemoveButton = ({field, index}) => {
    const removeButton = useCallback(({remove}) => (
        <TrashIconButton
            handleClick={() => {
                remove(index);
            }}
        />
    ), [index]);

    return (
        <FieldArray name={field}>
            {removeButton}
        </FieldArray>
    )
}
