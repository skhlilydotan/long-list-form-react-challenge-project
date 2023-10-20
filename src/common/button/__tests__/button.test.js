import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '..';
import { SKINS } from '@common/constants';

describe('button Component', () => {
  it('renders button with a type', () => {
    expect(() =>
      render(<Button buttonType={SKINS.PRIMARY} />),
    ).not.toThrow();
  });

  //TODO: dynamic import is not working with vite
  // it('renders button with ButtonIcon', async () => {
  //   render(
  //     <Button buttonType={BUTTON_TYPE.SECONDARY_GRAY}>
  //       <Button.ButtonIcon name={ICONS.EXPLORE} />
  //     </Button>,
  //   );
  //   await waitFor(() => {
  //     expect(
  //       screen.getByTestId(`icon-test-${ICONS.EXPLORE}`),
  //     ).toBeInTheDocument();
  //     expect(screen.getByTestId('button-icon')).toHaveClass('icon');
  //   });
  // });

  it('renders button with a label', () => {
    render(<Button buttonType={SKINS.SECONDARY_GRAY} label='Senna' />);
    expect(screen.getByText('Senna')).toBeInTheDocument();
  });

  it('should fire event', () => {
    const onClick = jest.fn();
    render(
      <Button buttonType={SKINS.TERTIARY_GRAY} onClick={onClick}>
        click me
      </Button>,
    );

    fireEvent.click(screen.getByText('click me'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should not fire event when button is disabled', () => {
    const onClick = jest.fn();
    render(
      <Button buttonType={SKINS.PRIMARY} onClick={onClick} disabled>
        click me
      </Button>,
    );
    fireEvent.click(screen.getByText('click me'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
