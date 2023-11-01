import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImagesUploader from './ImagesUploader';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import { storage } from '../../config/config';
import { useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductDetails } from '../../redux/slices/productSlice';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { mainCartegories } from './categories';


function UploaderStepTwo({ setCurrentLevel }) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const token = getToken()
  const { data: userProfileData } = useGetUserProfileQuery({ token })
  const [details, setDetails] = useState({
    title: '',
    description: '',
    category: null,
    modalSetting: ''
  });


  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.product);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }],
        ['bold', 'italic', 'underline', 'list'],
      ],
    },
  };

  const formats = ['bold', 'italic', 'underline', 'list'];

  // const productDescriptionHandler = () => {
  //   dispatch(updateProductDetails({ ...productDetails, title: details.title, description: details.description, modalSetting: details.modalSetting }));
  // } 

  const uploadModalHanddler = async () => {
    try {
      const storageRef = ref(storage, `modals/${userProfileData && userProfileData.userProfile._id}/${productDetails.modalRawData.name}`);
      const uploadTask = uploadBytesResumable(storageRef, productDetails.modalRawData);
      console.log(storageRef, ":::download link:", uploadTask)
      const snapshot = await getDownloadURL(uploadTask.ref);
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const uploadImageHandler = async (e) => {
    e.preventDefault()
    // productDescriptionHandler()
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
        const imageRef = ref(storage, `images/${userProfileData && userProfileData.userProfile._id}/${file.name}`);
        try {
          const snapshot = await uploadBytes(imageRef, file);
          console.log(snapshot,' snapshot')
          const url = await getDownloadURL(snapshot.ref);
          return { downloadLink: url, refernceLink: imageRef.toString() };
        } catch (error) {
          console.error("Error uploading file:", error);
          throw error;
        }
      });
      const uploadedFiles = await Promise.all(uploadPromises);
      dispatch(updateProductDetails({ ...productDetails, title: details.title, description: details.description, category: details.category, modalSetting: details.modalSetting, images: [...productDetails.images, ...uploadedFiles] }));
      setIsUploadLoading(false)
      toast.success("Successfully uploaded all images.");
      if (details.title.length > 0 && details.description.length > 0) {
        setCurrentLevel(3);
      }
    } catch (error) {
      toast.error(error.message);
      setIsUploadLoading(false)
    }
    setIsUploadLoading(false)
  };

  return (
    <div>
      <div className='mb-5'>
        <ImagesUploader setSelectedFile={setSelectedFile} selectedFile={selectedFile} isUploadLoading={isUploadLoading} uploadImageHandler={uploadImageHandler} />
      </div>
      <div>
        <label className='text-[16px] font-semibold'>Title</label>
        <input
          type="text"
          placeholder="title"
          className="w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm"
          onChange={(e) => setDetails({ ...details, title: e.target.value })}
        />
      </div>
      <div className='mt-3'>
        <label className='text-[16px] font-semibold'>Description</label>
        <ReactQuill
          theme="snow"
          value={details.description}
          modules={modules}
          formats={formats}
          onChange={(value) => setDetails({ ...details, description: value })}
        />
      </div>
      <div className='mt-3'>
      <label className='text-[16px] font-semibold'>Categories</label>
        <select className='w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm' value={mainCartegories} onChange={(e) => setDetails({ ...details, category: e.target.value })}>
          <option value="">{details.category? details.category : "Select a Category"}</option>
          {mainCartegories.map((category, index) => (
            <option key={category._id} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-3'>
        <label className='text-[16px] font-semibold'>Modal Settings</label>
        <input type="text" className="w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm" onChange={(e) => setDetails({ ...details, modalSetting: e.target.value })} placeholder='Copy and paste your modal settings here.' />
      </div>
      <button
        disabled={isUploadLoading}
        onClick={uploadImageHandler}
        className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isUploadLoading ? 'Processing...' : 'Next'}
      </button>
    </div>
  );
}

export default UploaderStepTwo;
