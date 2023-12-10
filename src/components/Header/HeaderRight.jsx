import React, { useEffect, useRef, useState } from 'react'
import { faBullhorn, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetMyProfileQuery } from "../../redux/apiCalls/apiSlice"
import ProfileDropDown from './ProfileDropDown'
import UploaderPopUp from '../Uploader/UploaderPopUp'
import { getToken } from '../../Token/token'
import { Link } from 'react-router-dom'
import { auth } from '../../config/config'

const HeaderRight = () => {
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false)
  const token = getToken()
  const {data: userProfileData, refetch: profileRefetch} = useGetMyProfileQuery(token)
  const profileDropdownRef = useRef(null)
  const profileDropDownHandler = () => {
    setIsProfileDropDownOpen(!isProfileDropDownOpen)
  }

  const signOutHandler = async () => {
    await auth.signOut();
    localStorage.removeItem("userToken")
    profileRefetch()
    window.location.reload();

  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropDownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [profileDropdownRef]);
  return (
    <>
    <div className='flex justify-between items-center gap-[20px]'>
      <div>
        <Link to="/model/upload" className='text-white px-3 py-[5px] bg-[#8d8d91] text-[18px] justify-center rounded-md border  hover:bg-[#393232] flex items-center'>
          Upload
        </Link>
      </div>
      <div className='relative' ref={profileDropdownRef}>
        <div>
          <button onClick={profileDropDownHandler} className='w-[41px]'>
            <img src={userProfileData.myProfile.profilePicture} referrerpolicy="no-referrer" alt="profile Picture" className='rounded-full w-[100%]' />
          </button>
          {isProfileDropDownOpen && <ProfileDropDown profileDropDownHandler={profileDropDownHandler} signOutHandler={signOutHandler} />}
        </div>
      </div>
    </div></>
  )
}

export default HeaderRight