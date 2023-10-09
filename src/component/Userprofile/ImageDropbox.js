import React, { useState } from 'react';

const ImageDropbox = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]; 
    if (selectedFile) {
      setSelectedFile(selectedFile);
    }
  };

  const uploadImageToBackend = async () => {
    try {
      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', selectedFile);
  
      const response = await fetch('http://localhost:8000/api/product/product-upload', {
        method: 'POST',
        body: formData,
      });
      
    } catch (error) {
      console.error('Error while uploading image:', error);
    }
  };
  
  return (
    <div className="flex items-center mt-3 justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} className="hidden" />
      </label>
      <button onClick={uploadImageToBackend}>Send to backend</button>
    </div>
  );
};

export default ImageDropbox;
