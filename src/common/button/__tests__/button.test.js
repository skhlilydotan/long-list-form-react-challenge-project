import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Button, { BUTTON_TYPE } from '..';
import { ICONS } from '@common/icons';

describe('button Component', () => {
  it('renders button with a type', () => {
    expect(() =>
      render(<Button buttonType={BUTTON_TYPE.PRIMARY} />),
    ).not.toThrow();
  });

  it('renders button with ButtonIcon', async () => {
    render(
      <Button buttonType={BUTTON_TYPE.SECONDARY_GRAY}>
        <Button.ButtonIcon name={ICONS.EXPLORE} />
      </Button>,
    );
    await waitFor(() => {
      expect(
        screen.getByTestId(`icon-test-${ICONS.EXPLORE}`),
      ).toBeInTheDocument();
      expect(screen.getByTestId('button-icon')).toHaveClass('icon');
    });
  });

  it('renders button with a label', () => {
    render(<Button buttonType={BUTTON_TYPE.SECONDARY} label='Senna' />);
    expect(screen.getByText('Senna')).toBeInTheDocument();
  });

  it('should fire event', () => {
    const onClick = jest.fn();
    render(
      <Button buttonType={BUTTON_TYPE.PRIMARY_BLUE} onClick={onClick}>
        click me
      </Button>,
    );

    fireEvent.click(screen.getByText('click me'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire event when button is disabled', () => {
    const onClick = jest.fn();
    render(
      <Button buttonType={BUTTON_TYPE.PRIMARY_BLUE} onClick={onClick} disabled>
        click me
      </Button>,
    );
    fireEvent.click(screen.getByText('click me'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
