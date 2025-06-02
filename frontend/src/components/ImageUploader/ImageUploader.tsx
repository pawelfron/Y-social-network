import React, { useState } from "react";

export interface uploadedFile{
  fileStr: string;
  file: File;
}

const ImageUploader: React.FC<{ onImageSelect: (data: uploadedFile) => void }> = ({ onImageSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      onImageSelect({
        fileStr: base64String,
        file: file
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <input type="file" accept="image/*" onChange={handleFileChange} />
  );
};

export default ImageUploader;
