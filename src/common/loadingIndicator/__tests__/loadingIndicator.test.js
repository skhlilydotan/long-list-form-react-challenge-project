import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SIZES } from '@common/constants/index.js';
import { LoadingIndicator } from '../LoadingIndicator.jsx';

describe('Loading Indicator', () => {
  it('renders loading indicator', () => {
    render(
      <LoadingIndicator
        size={SIZES.SM}
        dataTestId='loading-indicator'
        value='Loading...'
      />,
    );
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders loading indicator text', () => {
    render(<LoadingIndicator size={SIZES.SM} value='Loading...' />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should not render loading indicator text', async () => {
    render(<LoadingIndicator size={SIZES.SM} />);
    await waitFor(() => {
      expect(() => screen.getByText('Loading...')).toThrow(
        'Unable to find an element',
      );
    });
  });
});
