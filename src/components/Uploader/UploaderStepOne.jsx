import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { storage } from '../../config/config';
import { useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { toast } from 'react-toastify';
import DropZone from './DropZone';
import { useDispatch, useSelector } from 'react-redux';
import {  updateProductDetails } from '../../redux/slices/productSlice';
import ImagesList from './ImagesList';
import { getToken } from '../../Token/token';

const UploaderStepOne = ({ setCurrentLevel }) => {
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if ( file.type === 'application/x-zip-compressed') {
         dispatch(updateProductDetails({...productDetails, modalRawData: file}));
        return setCurrentLevel(2)
      } else {
        toast.error("Only application/x-zip-compressed type files are supported.")
      }
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

  // const removeImageHandler = (id) => {
  //   const imageExist = selectedFile.filter((item,index) => index !== id) 
  //   setSelectedFile(imageExist)
  // }
 
  return (
    <>
      <DropZone handleFileChange={handleFileChange} />
      {/* {!productDetails.modal? <ImagesList removeImageHandler={removeImageHandler} selectedFile = {selectedFile}/> : null } */}

      <div>
      <button className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">
          {isUploadLoading? 'Processing...' : "Next"}
        </button>
      </div>
    </>
  );
};

export default UploaderStepOne;