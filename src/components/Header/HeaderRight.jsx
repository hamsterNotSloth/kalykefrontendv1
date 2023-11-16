import React, { useEffect, useState } from 'react'
import { faBullhorn, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetMyProfileQuery } from "../../redux/apiCalls/apiSlice"
import ProfileDropDown from './ProfileDropDown'
import UploaderPopUp from '../Uploader/UploaderPopUp'
import { getToken } from '../../Token/token'

const HeaderRight = () => {
  const [signUpModalStatus, setSignUpModalStatus] = useState(false)
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false)
  const token = getToken()
  const {data: userProfileData, refetch: profileRefetch} = useGetMyProfileQuery(token)
  const profileDropDownHandler = () => {
    setIsProfileDropDownOpen(!isProfileDropDownOpen)
  }

  const signOutHandler = async () => {
    localStorage.removeItem("userToken")
    profileRefetch()
    window.location.reload();

  }

  return (
    <>
    {signUpModalStatus ? <UploaderPopUp setSignUpModalStatus={setSignUpModalStatus} /> : null}
    <div className='flex justify-between items-center gap-[20px]'>
      <div className='w-[40px] h-[40px] bg-[#8d8d91] justify-center rounded-[90px] flex items-center'>
        <button onClick={() => setSignUpModalStatus(true)}>
          <FontAwesomeIcon icon={faUpLong} className='text-[#ffff] text-[21px]' />
        </button>
      </div>
      <div className='relative'>
        <div>
          <button onClick={profileDropDownHandler} className='w-[41px]'>
            <img src={userProfileData && userProfileData.myProfile.profilePicture} referrerpolicy="no-referrer" alt="profile Picture" className='rounded-full w-[100%]' />
          </button>
          {isProfileDropDownOpen && <ProfileDropDown signOutHandler={signOutHandler} />}
        </div>
      </div>
    </div></>
  )
}

export default HeaderRight