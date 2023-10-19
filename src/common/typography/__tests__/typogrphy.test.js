import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from '../Typography.jsx';
import classes from '../typography.module.scss';

describe('Typography', () => {
  it('renders typography', () => {
    render(<Typography classes={classes} value='Matrix' />);
    expect(screen.getByText('Matrix')).toBeInTheDocument();
  });
});
