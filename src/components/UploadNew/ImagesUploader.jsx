import React from 'react';


import { toast } from 'react-toastify';
import DropZone from './DropZone';

import ImagesList from './ImagesList';

const ImagesUploader = ({fileUploadProgress, isUploadLoading, selectedFile, setSelectedFile}) => {

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log(file,'file')
    if(selectedFile.length > 6) {
      return toast.error("maximum 8 images could be uploaded at a time")
    }
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp' || file.type === 'image/jpg' || file.type === 'image/gif') {
        return setSelectedFile([...selectedFile, file]);
      } else {
        toast.error("Only jpeg, png, webp, gif,jpg are supported.")
      }
    }
  }

  const removeImageHandler = (id) => {
    const imageExist = selectedFile.filter((item,index) => index !== id) 
    setSelectedFile(imageExist)
  }
 
  return (
    <>
    <span className='font-medium text-[18px] block mt-8'>Upload Images for model</span>
      <DropZone isUploadLoading={isUploadLoading} handleFileChange={handleFileChange} />
      {selectedFile.length > 0? <ImagesList fileUploadProgress={fileUploadProgress} removeImageHandler={removeImageHandler} selectedFile = {selectedFile}/> : "No files uploaded" }
    </>
  );
};

export default ImagesUploader;