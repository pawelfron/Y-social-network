import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageUploader, { uploadedFile } from '../../src/components/ImageUploader/ImageUploader';

describe('ImageUploader', () => {
  it('calls onImageSelect with base64 string and file when an image is selected', async () => {
    const mockCallback = jest.fn();

    const { getByLabelText } = render(
      <label htmlFor="file-input">
        Upload
        <ImageUploader onImageSelect={mockCallback} />
      </label>
    );

    const input = getByLabelText('Upload') as HTMLInputElement;

    // Create a mock image file
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    // Mock FileReader
    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onloadend: jest.fn(),
      result: 'data:image/png;base64,dummybase64string'
    };
    // @ts-ignore
    window.FileReader = jest.fn(() => fileReaderMock);

    // Fire change event
    fireEvent.change(input, {
      target: { files: [file] }
    });

    // Trigger onloadend manually
    await waitFor(() => {
      expect(fileReaderMock.readAsDataURL).toHaveBeenCalledWith(file);
      fileReaderMock.onloadend(); // manually call
    });

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith({
      fileStr: 'data:image/png;base64,dummybase64string',
      file: file
    });
  });
});
