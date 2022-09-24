import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // TODO: should be fix it
  const linkElement = screen.getByText(/Tìm kiếm/i);
  expect(linkElement).toBeInTheDocument();
});
