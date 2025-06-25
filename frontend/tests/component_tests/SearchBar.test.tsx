import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../../src/components/SearchBar/SearchBar';

describe('<SearchBar />', () => {
  test('renders input with placeholder', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  test('calls onSearch when user types', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
    expect(input).toHaveValue('test query');
  });
});
