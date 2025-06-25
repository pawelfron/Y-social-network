import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreatePost from '../../src/components/Post/CreatePost';

describe('CreatePost component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should render textarea and allow typing', () => {
    render(<CreatePost />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    expect(textarea).toHaveValue('Hello world');
  });

  test('should save and load draft text from localStorage', () => {
    localStorage.setItem('draft_text', 'Saved draft');
    render(<CreatePost />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Saved draft');
  });

  test('should show emoji picker when button clicked', () => {
    render(<CreatePost />);
    const emojiButton = screen.getByTestId('emoji-button');
    fireEvent.click(emojiButton);
    expect(screen.getByTestId('emoji-picker')).toBeInTheDocument();
  });
});
