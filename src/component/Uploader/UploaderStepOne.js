import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from '../../config/config';
import { useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { Token } from '../../customHooks/token';
import { toast } from 'react-toastify';
import DropZone from './DropZone';
import { useDispatch, useSelector } from 'react-redux';
import {  updateProductDetails } from '../../redux/slices/productSlice';
import ImagesList from './ImagesList';

const UploaderStepOne = ({ setSelectedFile, selectedFile,setCurrentLevel }) => {
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product);

  const token = Token()
  const { data: userProfileData } = useGetUserProfileQuery({ token })

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      return setSelectedFile([...selectedFile, file]);
    }
  }

  // const deleteImageHandler = async () => {
  //   try {
  //     const storage = getStorage();
  //     const fileRef = ref(storage, 'user/65297f524d0dcd274cc04da6/images/My Pic.jpg');
  //     console.log(fileRef)
  //     deleteObject(fileRef).then(() => {
  //       toast.success("Successfully deleted Image.")
  //     }).catch((error) => {
  //       console.log("Image deletion unsucessfull.", error)
  //     });
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const uploadImageHandler = async (e) => {
    e.preventDefault()
    if (token) {
      if (!userProfileData.userProfile && !userProfileData.userProfile._id) {
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
      if (!selectedFile || selectedFile.length === 0) {
        toast.error("No files selected.");
        setIsUploadLoading(false)
        return;
      }
      const uploadPromises = selectedFile.map(async (file) => {
        const imageRef = ref(storage, `user/${userProfileData && userProfileData.userProfile._id}/images/${file.name}`);
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
      await dispatch(updateProductDetails({ ...productDetails, images: [...productDetails.images, ...uploadedFiles] }));
      setIsUploadLoading(false)
      setCurrentLevel("2")
      toast.success("Successfully uploaded all images.");
    } catch (error) {
      toast.error(error);
      setIsUploadLoading(false)
    }
    setIsUploadLoading(false)
  };
  
  const removeImageHandler = (id) => {
    const imageExist = selectedFile.filter((item,index) => index !== id) 
    setSelectedFile(imageExist)
  }
 
  return (
    <>
      <DropZone uploadImageHandler={uploadImageHandler} isUploadLoading={isUploadLoading} handleFileChange={handleFileChange} />
      {selectedFile.length > 0? <ImagesList removeImageHandler={removeImageHandler} selectedFile = {selectedFile}/> : null }
    </>
  );
};

export default UploaderStepOne;