import { faFile, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../../config/config';
import { toast } from 'react-toastify';

function ProfileUpdatePopup({ newUserInfo, userProfile, setNewUserInfo, userData, setUpdateImageToggler,profileImage, setProfileImage }) {
  const [isImageUploading, setIsImageUploading] = useState(false)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
        setProfileImage(file);
    }
}

const handleFileUpload = async (e) => {
  if(profileImage?.name == null) return toast.error("No Image selected, cancel if you don't want to replace current image.")
  setIsImageUploading(true)  
  const imageRef = ref(storage, `profilePic/${userData?.profile?._id}/${profileImage.name}`);
    try {
        const snapshot = await uploadBytes(imageRef, profileImage);
        const url = await getDownloadURL(snapshot.ref);
        await setNewUserInfo({ ...newUserInfo, profilePicture: url })
        setUpdateImageToggler(false)
        return { downloadLink: url, refernceLink: imageRef.toString() };
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
    setIsImageUploading(false)
};
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='fixed inset-0 bg-black opacity-50'></div>
      <div className="bg-white max-w-[400px] w-[100%] z-[9] min-h-[500px] max-h-[700px] overflow-y-auto p-8 rounded-lg shadow-lg relative'">
        <div className='flex justify-end'>
        <button onClick={() => setUpdateImageToggler(false)}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="flex items-center mt-3 justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Click to upload </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
        <div>
        {profileImage?.name && <><FontAwesomeIcon icon={faFile} /> {profileImage?.name}</>} {isImageUploading && "loading"}
        </div>
        <div className='flex justify-end pt-4 gap-3'>
          <button className='border border-[#d4cfcf] rounded text-[18px]' onClick={handleFileUpload}>Confirm</button>
          <button className='border border-[#d4cfcf] rounded text-[18px]' onClick={()=>{setUpdateImageToggler(false); setProfileImage()}}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdatePopup
