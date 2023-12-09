import { deleteObject, getDownloadURL, uploadBytesResumable, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../../config/config';
import { useGetMyProfileQuery, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { toast } from 'react-toastify';
import DropZone from './DropZone';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductDetails } from '../../redux/slices/productSlice';
import ImagesList from './ImagesList';
import { getToken } from '../../Token/token';

const ModalUploadStage = ({ setCurrentLevel }) => {
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [selectedFiles, setSelectedFile] = useState([])
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  const dispatch = useDispatch();
  const token = getToken()
  const productDetails = useSelector((state) => state.product);
  const { data: userProfileData } = useGetMyProfileQuery(token)

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
        setSelectedFile([...selectedFiles, file]);
    } else {
      toast.error("No File selected.")
    }
  }

  const uploadFileHandler = async (e) => {
    e.preventDefault()
    if (token) {
      if (!userProfileData && !userProfileData.myProfile && !userProfileData.myProfile._id) {
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
      if (!selectedFiles || selectedFiles.length === 0) {
        toast.error("No files selected.");
        setIsUploadLoading(false)
        return;
      }
      setFileUploadProgress(true)
      const uploadPromises = selectedFiles.map(async (file) => {
        const imageRef = ref(storage, `modal/${userProfileData && userProfileData.myProfile._id}/${file.name}`);
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
      dispatch(updateProductDetails({ ...productDetails, modal: [...productDetails.modal, ...uploadedFiles] }));
      setIsUploadLoading(false)
      toast.success("Almost there! Add details for your model.");
      setCurrentLevel(2);
    } catch (error) {
      toast.error(error.message);
      setIsUploadLoading(false)
    }
    setIsUploadLoading(false)
  };



  // const removeImageHandler = (id) => {
  //   const imageExist = selectedFile.filter((item,index) => index !== id) 
  //   setSelectedFile(imageExist)
  // }

  const removeImageHandler = (id) => {
    const imageExist = selectedFiles.filter((item, index) => index !== id)
    setSelectedFile(imageExist)
  }

  return (
    <>
    <label>Upload model files</label>
      <DropZone handleFileChange={handleFileChange} />
      {selectedFiles.length > 0 ? <ImagesList fileUploadProgress={fileUploadProgress} removeImageHandler={removeImageHandler} selectedFile={selectedFiles} /> : "Upload a Zip file containing your model. You can only upload a single zip file. Happy Designing"}
      <div>
        <button disabled={selectedFiles.length > 4} onClick={uploadFileHandler} className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isUploadLoading ? 'Processing...' : "Next"}
        </button>
      </div>
    </>
  );
};

export default ModalUploadStage;