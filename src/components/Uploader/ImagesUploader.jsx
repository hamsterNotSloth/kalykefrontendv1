import React from 'react';


import { toast } from 'react-toastify';
import DropZone from './DropZone';

import ImagesList from './ImagesList';

const ImagesUploader = ({fileUploadProgress, uploadImageHandler, isUploadLoading, selectedFile, setSelectedFile}) => {

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
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
    <span>Upload Images for model</span>
      <DropZone uploadImageHandler={uploadImageHandler} isUploadLoading={isUploadLoading} handleFileChange={handleFileChange} />
      {selectedFile.length > 0? <ImagesList fileUploadProgress={fileUploadProgress} removeImageHandler={removeImageHandler} selectedFile = {selectedFile}/> : "No files uploaded" }
    </>
  );
};

export default ImagesUploader;