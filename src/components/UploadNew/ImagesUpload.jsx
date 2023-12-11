import React, { useState } from 'react'
import { useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/config';
import ImagesUploader from './ImagesUploader';
import { useNavigate } from 'react-router-dom';

function ImagesUpload({ details, setDetails, uploadFileHandler, productUploadHandler }) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  const token = getToken()
  const { data: userProfileData } = useGetMyProfileQuery(token)
  const uploadImageHandler = async (e) => {
    e.preventDefault()
    if (token) {
      if (userProfileData && userProfileData.myProfile ==null) {
        setIsUploadLoading(false)
        return toast.error("You are unauthorized to do that. Please login or Signup to continue.");
      }
    }
    if (!token) {
      setIsUploadLoading(false)
      return toast.error("You are unauthorized to do that. Please login or Signup to continue.");
    }
    try {
      setIsUploadLoading(true)
     const uploadedModel= await uploadFileHandler()
      if (!selectedFile || selectedFile.length === 0) {
        toast.error("No files selected.");
        setIsUploadLoading(false)
        return;
      }
      setFileUploadProgress(true)
      const uploadPromises = selectedFile.map(async (file) => {
        const imageRef = ref(storage, `images/${userProfileData && userProfileData.myProfile && userProfileData.myProfile._id}/${file.name}`);
        try {
          const snapshot = await uploadBytes(imageRef, file);
          const url = await getDownloadURL(snapshot.ref);
          return { downloadLink: url, refernceLink: imageRef.toString() };
        } catch (error) {
          console.error("Error uploading file:", error);
          throw error;
        }
      });
      const uploadedFiles = await Promise.all(uploadPromises);
      setFileUploadProgress(false)
      await productUploadHandler({...details, images: [...details.images, ...uploadedFiles], modal: uploadedModel})
      setIsUploadLoading(false)
    } catch (error) {
      toast.error(error.message);
      setIsUploadLoading(false)
    }
    setIsUploadLoading(false)
  };
  return (
    <>
      <ImagesUploader fileUploadProgress={fileUploadProgress} setSelectedFile={setSelectedFile} selectedFile={selectedFile} isUploadLoading={isUploadLoading} />
      <label className='block'> Accepted formats: jpg, jpeg, webp, png, gif. Upload in the sequence you prefer.</label>
      <button disabled={isUploadLoading} onClick={(e)=>uploadImageHandler(e)} className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isUploadLoading ? 'Processing...' : "Publish"}
        </button>
    </>
  )
}

export default ImagesUpload
