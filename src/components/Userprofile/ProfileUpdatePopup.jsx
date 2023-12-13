import { faFile, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../../config/config';
import { toast } from 'react-toastify';
import DropZone from '../Common/DropZone';

function ProfileUpdatePopup({ newUserInfo, userProfile, setNewUserInfo, userData, setUpdateImageToggler, profileImage, setProfileImage }) {
  const [isImageUploading, setIsImageUploading] = useState(false)
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/jpg') {
        setProfileImage(file);
      } else {
        return toast.error("Only jpeg, jpg, png are allowed")
      }
    }
  }

  const handleFileUpload = async (e) => {
    if (profileImage?.name == null) return toast.error("No Image selected, cancel if you don't want to replace current image.")
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
        <DropZone handleFileChange={handleFileChange} />
        <div>
          {profileImage?.name && <><FontAwesomeIcon icon={faFile} /> {profileImage?.name}</>} {isImageUploading && "loading"}
        </div>
        <div className='flex justify-end pt-4 gap-3'>
          <button className='border border-[#d4cfcf] rounded text-[18px]' onClick={handleFileUpload}>Confirm</button>
          <button className='border border-[#d4cfcf] rounded text-[18px]' onClick={() => { setUpdateImageToggler(false); setProfileImage() }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdatePopup
