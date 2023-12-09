import React from 'react';


import { toast } from 'react-toastify';
import DropZone from './DropZone';

import ImagesList from './ImagesList';

const ImagesUploader = ({fileUploadProgress, isUploadLoading, selectedFile, setSelectedFile}) => {

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/webpack') {
        return setSelectedFile([...selectedFile, file]);
      } else {
        toast.error("Only JPEG, PNG are supported.")
      }
    }
  }

  const removeImageHandler = (id) => {
    const imageExist = selectedFile.filter((item,index) => index !== id) 
    setSelectedFile(imageExist)
  }
 
  return (
    <>
    <span className='font-medium text-[18px] block mt-3'>Upload Images for model</span>
      <DropZone isUploadLoading={isUploadLoading} handleFileChange={handleFileChange} />
      {selectedFile.length > 0? <ImagesList fileUploadProgress={fileUploadProgress} removeImageHandler={removeImageHandler} selectedFile = {selectedFile}/> : "No files uploaded" }
    </>
  );
};

export default ImagesUploader;