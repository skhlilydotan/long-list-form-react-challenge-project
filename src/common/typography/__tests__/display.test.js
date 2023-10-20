import React from 'react';
import { render, screen } from '@testing-library/react';
import Display from '../Display.jsx';
import { SIZES, TYPOGRAPHY_WEIGHTS } from '@common/constants';

describe('Display', () => {
  it('renders Display ', () => {
    render(<Display value='Happy' />);
    expect(screen.getByText('Happy')).toBeInTheDocument();
  });

  it('renders Display XXL ', () => {
    render(
      <Display
        size={SIZES.XXL}
        weight={TYPOGRAPHY_WEIGHTS.REGULAR}
        value='XXL'
      />,
    );

    expect(screen.getByText('XXL')).toHaveClass('xxl');
    expect(screen.getByText('XXL')).toHaveClass('regular');
  });

  it('renders Display XL ', () => {
    render(
      <Display
        size={SIZES.XL}
        weight={TYPOGRAPHY_WEIGHTS.BOLD}
        value='XL'
      />,
    );
    expect(screen.getByText('XL')).toHaveClass('xl');
    expect(screen.getByText('XL')).toHaveClass('bold');
  });
  it('renders Display LG ', () => {
    render(
      <Display
        size={SIZES.LG}
        weight={TYPOGRAPHY_WEIGHTS.MEDIUM}
        value='LG'
      />,
    );
    expect(screen.getByText('LG')).toHaveClass('lg');
    expect(screen.getByText('LG')).toHaveClass('medium');
  });

  it('renders Display MD ', () => {
    render(
      <Display
        size={SIZES.MD}
        weight={TYPOGRAPHY_WEIGHTS.SEMI_BOLD}
        value='MD'
      />,
    );
    expect(screen.getByText('MD')).toHaveClass('md');
    expect(screen.getByText('MD')).toHaveClass('semiBold');
  });

  it('renders Display SM ', () => {
    render(
      <Display
        size={SIZES.SM}
        weight={TYPOGRAPHY_WEIGHTS.REGULAR}
        value='SM'
      />,
    );
    expect(screen.getByText('SM')).toHaveClass('sm');
  });

  it('renders Display XS ', () => {
    render(
      <Display
        size={SIZES.XS}
        weight={TYPOGRAPHY_WEIGHTS.REGULAR}
        value='XS'
      />,
    );
    expect(screen.getByText('XS')).toHaveClass('xs');
  });
});
