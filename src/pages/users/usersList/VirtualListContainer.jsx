import {useFormikContext} from "formik";
import {useCallback, useEffect, useRef} from "react";
import {VariableSizeList as List} from "react-window";
import UserRow from "../userRow/UserRow.jsx";

const virtualListRender = (({index, style}) => (
    <div style={style}>
        <UserRow field="usersData" index={index}/>
    </div>
));

export function VirtualListContainer({height, width}) {
    const {values, getFieldMeta} = useFormikContext();
    const listRef = useRef(null);
    const previousErrorsRef = useRef([]);


    const getItemSize = useCallback((index) => {
        const {error, touched} = getFieldMeta(`usersData[${index}]`);
        const hasError = touched && error;
        return hasError ? 120 : 60;
    }, [getFieldMeta]);

    useEffect(() => {
        const currentErrors = values.usersData.map((_, index) => {
            const {error, touched} = getFieldMeta(`usersData[${index}]`);
            return touched && error;
        });

        currentErrors.some((hasError, index) => {
            if (previousErrorsRef.current[index] !== hasError) {
                listRef.current.resetAfterIndex(index);
                return true;
            }
        });

        previousErrorsRef.current = currentErrors;
    }, [values.usersData, getFieldMeta]);

    return <List
        height={height}
        ref={listRef}
        itemData={values.usersData}
        itemCount={values.usersData?.length}
        itemSize={getItemSize}
        itemKey={(index, data) => data[index].id}
        width={width}
    >
        {virtualListRender}
    </List>
}
