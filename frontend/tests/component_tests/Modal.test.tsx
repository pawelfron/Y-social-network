import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../../src/components/Modal/Modal';

describe('Modal component', () => {
  beforeEach(() => {
    // Ensure clean DOM before each test
    document.body.innerHTML = '';
  });

  test('renders children correctly inside modal', () => {
    const { getByText } = render(
      <Modal onClose={() => {}}>
        <div>Test Modal Content</div>
      </Modal>
    );

    expect(getByText('Test Modal Content')).toBeInTheDocument();
  });

  test('calls onClose when clicking outside the modal content', () => {
    const handleClose = jest.fn();

    render(
      <Modal onClose={handleClose}>
        <div role="dialog">Modal Content</div>
      </Modal>
    );

    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      fireEvent.click(overlay);
    }

    expect(handleClose).toHaveBeenCalled();
  });

  test('does not call onClose when clicking inside modal content', () => {
    const handleClose = jest.fn();

    render(
      <Modal onClose={handleClose}>
        <div>Inside Modal</div>
      </Modal>
    );

    const content = document.querySelector('.modal-content');
    if (content) {
      fireEvent.click(content);
    }

    expect(handleClose).not.toHaveBeenCalled();
  });
});
