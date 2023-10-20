import colors from '@common/styles/colors.module.scss';
import shadows from '@common/styles/_shadow.module.scss';

export const selectDefaultWidth = 250;
export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: colors.primary50,
    primary50: colors.primary600,
    primary: colors.primary300,
  },
});
const Z_INDEX = 1050;
const placeHolder = {
  textOverflow: 'ellipsis',
  // maxWidth: '90%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'initial',
  color: colors.gray500,
};

export const selectStyles = {
  placeholder: (provided) => ({
    ...provided,
    ...placeHolder,
  }),
  dropdownIndicator: (provided, { selectProps }) => ({
    ...provided,
    display: selectProps?.display || 'none',
  }),
  indicatorSeparator: (provided, { selectProps }) => ({
    ...provided,
    display: selectProps?.display || 'none',
  }),
  valueContainer: (provided, { selectProps }) => ({
    ...provided,
    padding: '0 10px',
    justifyContent: selectProps?.justifyContent || 'flex-start',
  }),
  menu: (provided, { selectProps }) => ({
    ...provided,
    zIndex: Z_INDEX,
    width: selectProps?.width || selectDefaultWidth,
    maxHeight: '320px',
  }),
  control: (provided, { selectProps }) => {
    return {
      ...provided,
      borderRadius: '8px',
      border: `1px solid ${colors.gray300}`,
      backgroundColor: selectProps?.backgroundColor || 'transparent',
      width: selectProps?.width,
      marginTop: selectProps?.marginTop,
    };
  },
  option: (provided, { data }) => {
    return {
      ...provided,
      wordBreak: 'break-word',
      ...(data.value === 'separator' && {
        border: `1px dashed ${colors.primary600}`,
        padding: '0',
      }),
    };
  },
};

function borderColor(destructive) {
  return destructive ? colors.error300 : colors.primary300;
}

function borderShadow(destructive) {
  return destructive ? colors.error100 : colors.primary100;
}

export const dropdownStyles = {
  ...selectStyles,
  control: (provided, { isFocused, selectProps }) => {

    return {
      ...provided,

      width: selectProps?.width || selectDefaultWidth,
      borderRadius: '8px',
      border: `1px solid ${isFocused || selectProps?.destructive ? borderColor(selectProps?.destructive) : colors.gray300}`,
      boxShadow: isFocused ? `${shadows.shadowFocusRing} ${borderShadow(selectProps?.destructive)} ,${shadows.sm}` : null,
    };
  },
  dropdownIndicator: (provided) => ({
    ...provided,
  }),
  indicatorSeparator: (provided, { selectProps }) => ({
    ...provided,
    display: selectProps?.display || 'none',
  }),
  container: (provided) => ({
    ...provided,
    position: 'static',
    boxSizing: 'border-box',
  }),

};
