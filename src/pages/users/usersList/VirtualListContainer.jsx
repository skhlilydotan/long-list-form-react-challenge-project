import {useFormikContext} from "formik";
import {useCallback, useEffect, useRef} from "react";
import {VariableSizeList as List} from "react-window";
import UserRow from "../userRow/UserRow.jsx";
import {USERS_ROOT_FIELD} from "../constants.js";

const virtualListRender = (({index, style}) => (
    <div style={style}>
        <UserRow field={USERS_ROOT_FIELD} index={index}/>
    </div>
));

export function VirtualListContainer({height, width}) {
    const {values, getFieldMeta} = useFormikContext();
    const listRef = useRef(null);
    const previousErrorsRef = useRef([]);
    const list = values[USERS_ROOT_FIELD];


    const getItemSize = useCallback((index) => {
        const {error, touched} = getFieldMeta(`${USERS_ROOT_FIELD}[${index}]`);
        const hasError = touched && error;
        return hasError ? 120 : 60;
    }, [getFieldMeta]);

    useEffect(() => {
        const currentErrors = list.map((_, index) => {
            const {error, touched} = getFieldMeta(`${USERS_ROOT_FIELD}[${index}]`);
            return touched && error;
        });

        currentErrors.some((hasError, index) => {
            if (previousErrorsRef.current[index] !== hasError) {
                listRef.current.resetAfterIndex(index);
                return true;
            }
        });

        previousErrorsRef.current = currentErrors;
    }, [list, getFieldMeta]);

    return <List
        height={height}
        ref={listRef}
        itemData={list}
        itemCount={list?.length}
        itemSize={getItemSize}
        itemKey={(index, data) => data[index].id}
        width={width}
    >
        {virtualListRender}
    </List>
}
