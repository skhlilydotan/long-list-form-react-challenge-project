import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ICONS } from '@common/svg';
import { SIZES, PLACEHOLDER_SIZE } from '@common/constants';
import { Label, LabelError } from '@common/labels';
import Content from './content';
import { INPUT_CONTENT_TYPE, INPUT_TYPES } from './constants';
import classes from './input.module.scss';

const propTypes = {
  id: PropTypes.string,
  dataTestId: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
  size: PropTypes.oneOf(PLACEHOLDER_SIZE),
  label: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(ICONS)),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueType: PropTypes.oneOf(Object.values(INPUT_CONTENT_TYPE)),
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onIconClick: PropTypes.func,
  error: PropTypes.string,
  hint: PropTypes.string,
  inline: PropTypes.bool,
  stretch: PropTypes.bool,
  destructive: PropTypes.bool,
  icon: PropTypes.node,
};

const defaultProps = {
  type: INPUT_TYPES.DEFAULT,
  inline: false,
};

const TextInput = React.forwardRef(
  (
    {
      className,
      dataTestId,
      id,
      label,
      iconName,
      type,
      size,
      inline,
      error,
      stretch,
      destructive,
      onFocus,
      onBlur,
      onChange,
      onKeyDown,
      placeholder,
      icon,
      ...contentProps
    },
    forwardRef,
  ) => {
    return (
      <div
        className={classnames(
          classes.container,
          { [classes.inline]: inline },
          className,
        )}
      >
        {label && <Label htmlFor={id} label={label} />}
        <Content
          id={id}
          destructive={!!error || destructive}
          ref={forwardRef}
          className={className}
          size={size}
          type={type}
          stretch={stretch}
          {...contentProps}
        >
          {iconName && (
            <Content.Icon
              placeholderSize={SIZES.SM}
              iconName={iconName}
            />
          )}
          {icon && (
            <Content.Icon
              placeholderSize={SIZES.SM}
            >{icon}</Content.Icon>
          )}
          <Content.Input
            dataTestId={dataTestId}
            id={id}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
          />
        </Content>
        {error && <LabelError label={error} />}
      </div>

    );
  });

TextInput.displayName = 'TextInput';
TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export { TextInput };
