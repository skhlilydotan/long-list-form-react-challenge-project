import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { typographySizeType, typographyWeightType } from '@common/types';
import textClasses from '@common/styles/text.module.scss';
import Icon from './icon.jsx';
import ButtonText from './buttonText.jsx';
import { ButtonContext } from './buttonContext';
import classes from './button.module.scss';
import { SKINS, SIZES } from '@common/constants';

const BUTTON_SIZE = [
  SIZES.SM,
  SIZES.MD,
  SIZES.LG,
];

export const BUTTON_ICON_PROPERTY = {
  DEFAULT: 'default',
  DOT_LEADING: 'dotLeading',
  ONLY_ICON: 'onlyIcon',
};

export const BUTTON_HTML_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
  RESET: 'reset',
};

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  htmlType: PropTypes.oneOf(Object.values(BUTTON_HTML_TYPE)),
  buttonType: PropTypes.oneOf(Object.values(SKINS)),
  buttonSize: PropTypes.oneOf(Object.values(BUTTON_SIZE)),
  icon: PropTypes.oneOf(Object.values(BUTTON_ICON_PROPERTY)),
  textSize: typographySizeType,
  textWeight: typographyWeightType,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  entity: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  selected: PropTypes.bool,
  destructive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  dataTestId: PropTypes.string,
  stretch: PropTypes.bool,
};
const defaultProps = {
  icon: BUTTON_ICON_PROPERTY.DEFAULT,
  buttonType: SKINS.PRIMARY,
  htmlType: BUTTON_HTML_TYPE.BUTTON,
  disabled: false,
  buttonSize: SIZES.SM,
  destructive: false,
  stretch: false,
};

const Button = React.forwardRef(
  (
    {
      className,
      disabled,
      htmlType,
      buttonType,
      buttonSize,
      textSize,
      textWeight,
      label,
      entity,
      onClick,
      dataTestId,
      selected,
      children,
      destructive,
      icon,
      stretch,
      ...rest
    },
    ref,
  ) => {
    const handleButtonClick = (event) => {
      if (onClick) onClick(event, entity);
    };
    const valueContext = { buttonSize, buttonType, destructive, disabled };
    return (
      <ButtonContext.Provider value={valueContext}>
        <button
          data-testid={dataTestId}
          type={htmlType}
          disabled={disabled}
          ref={ref}
          onClick={handleButtonClick}
          className={classnames(
            className,
            classes.button,
            { [classes.stretch]: stretch },
            { [classes[icon]]: icon !== BUTTON_ICON_PROPERTY.DEFAULT },
            classes[buttonSize],
            textClasses[textSize],
            textClasses[textWeight],
            { [classes[buttonType]]: !destructive },
            { [classes[`${buttonType}Destructive`]]: destructive },
          )}
          {...rest}
        >
          {label}
          {children}
        </button>
      </ButtonContext.Provider>
    );
  },
);
Button.Text = ButtonText;
Button.Icon = Icon;
Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export { Button };
