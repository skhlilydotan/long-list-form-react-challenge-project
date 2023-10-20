import colors from '@common/styles/colors.module.scss';

/**
 * selectStyles - Style Object for React Select (https://react-select.com/home)
 * Each component is keyed, and ships with default styles. The component's default style object is passed as the first argument to the function when it's resolved.
 * The second argument is the current state of the select, features like isFocused, isSelected etc. allowing you to implement dynamic styles for each of the components.
 */
export const selectDefaultWidth = 250;
export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: colors.primary50,
    primary50: colors.primary600,
    primary: colors.primary600,
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
    justifyContent: selectProps?.justifyContent || 'center',
  }),
  menu: (provided, { selectProps }) => ({
    ...provided,
    zIndex: Z_INDEX,
    width: selectProps?.width || selectDefaultWidth,
  }),
  control: (provided, { selectProps }) => {
    return {
      ...provided,
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

export const dropdownStyles = {
  ...selectStyles,
  control: (provided, { selectProps }) => {
    const errorStyle = {
      boxShadow: selectProps?.destructive
        ? `0px 0px 0px 1px ${colors.error500}`
        : null,
      borderColor: selectProps?.isEmpty ? `${colors.error500}` : null,
    };
    return {
      ...provided,
      ...(selectProps.destructive ? errorStyle : {}),
      '&:hover': {
        ...(selectProps.destructive ? errorStyle : {}),
      },
      width: selectProps?.width || selectDefaultWidth,
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
