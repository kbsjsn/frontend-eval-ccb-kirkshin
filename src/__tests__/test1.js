import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

test ('renders header title', () => {
  const { getByText } = render(<App />);
  expect(getByText('Ultimate Moviegoers Guide')).toBeInTheDocument();
})