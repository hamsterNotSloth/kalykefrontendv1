import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImagesUploader from './ImagesUploader';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import { storage } from '../../config/config';
import { useGetMyProfileQuery, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductDetails } from '../../redux/slices/productSlice';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { mainCartegories } from './categories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


function UploaderStepTwo({ setCurrentLevel }) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [hashTagValue, setHashTagValue] = useState('');
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  const token = getToken()
  const { data: userProfileData } = useGetMyProfileQuery(token)
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
        ['bold', 'italic', 'underline', 'list'],
      ],
    },
  };

  const formats = ['bold', 'italic', 'underline', 'list'];

  // const productDescriptionHandler = () => {
  //   dispatch(updateProductDetails({ ...productDetails, title: details.title, description: details.description, modalSetting: details.modalSetting }));
  // } 

  const uploadImageHandler = async (e) => {
    e.preventDefault()
    // productDescriptionHandler()
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
      dispatch(updateProductDetails({ ...productDetails, tags: hashtags, title: details.title, description: details.description, category: details.category, modalSetting: details.modalSetting, images: [...productDetails.images, ...uploadedFiles] }));
      setIsUploadLoading(false)
      toast.success("Final step. Click upload to upload your modal.");
      if (details.title.length > 0 && details.description.length > 0) {
        setCurrentLevel(3);
      }
    } catch (error) {
      toast.error(error.message);
      setIsUploadLoading(false)
    }
    setIsUploadLoading(false)
  };

  const handleAddHashtag = () => {
    const hashtag = hashTagValue.trim();

    if (hashtag.startsWith('#') && hashtag.length > 1) {
      if (hashtags.length < 5 && !hashtags.includes(hashtag)) {
        setHashtags([...hashtags, hashtag]);
        setHashTagValue('');
      }
    }
  };

  const deleteHashTagHandler = (id) => {
    const updatedHashtags = hashtags.filter((item, index) => index != id)
    setHashtags(updatedHashtags)
  }
  return (
    <div>
      <div className='mb-5'>
        <ImagesUploader fileUploadProgress={fileUploadProgress} setSelectedFile={setSelectedFile} selectedFile={selectedFile} isUploadLoading={isUploadLoading} uploadImageHandler={uploadImageHandler} />
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
        <label className='text-[16px] font-semibold'>Tags(Tag should start with #)</label>
        <input
          type="text"
          value={hashTagValue}
          className='w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm'
          placeholder="Add #hashtags..."
          onChange={e => { setHashTagValue(e.target.value) }}
        />
        <button onClick={handleAddHashtag} className='p-2 bg-[#afafaf] text-white rounded-md mt-3'>Add Hashtag</button>
        <div className='flex gap-5 flex-wrap'>
          {hashtags.length == 0? null :
          hashtags.map((tag, index) => {
            return (
              <div className='flex justify-between'>
                <span key={index}>{tag} </span>
                <button onClick={() => deleteHashTagHandler(index)} ><FontAwesomeIcon icon={faTrashCan} /></button>
              </div>
            )
          })
          }
          
        </div>
      </div>
      <div className='mt-3'>
        <label className='text-[16px] font-semibold'>Categories</label>
        <select className='w-full px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm' value={mainCartegories} onChange={(e) => setDetails({ ...details, category: e.target.value })}>
          <option value="">{details.category ? details.category : "Select a Category"}</option>
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
        disabled={isUploadLoading || selectedFile.length > 4}
        onClick={uploadImageHandler}
        className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isUploadLoading ? 'Processing...' : 'Next'}
      </button>
    </div>
  );
}

export default UploaderStepTwo;
