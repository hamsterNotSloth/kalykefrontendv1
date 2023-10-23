import React, { useEffect, useState } from 'react'
import { faBullhorn, faUpLong } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetUserProfileQuery } from "../../redux/apiCalls/apiSlice"
import { Token } from '../../customHooks/token'
import ProfileDropDown from './ProfileDropDown'
import UploaderPopUp from '../Uploader/UploaderPopUp'

const HeaderRight = () => {
  const [signUpModalStatus, setSignUpModalStatus] = useState(false)
  const token = Token()
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false)
  const { data: userProfileData, refetch: profileRefetch } = useGetUserProfileQuery({ token })

  const profileDropDownHandler = () => {
    setIsProfileDropDownOpen(!isProfileDropDownOpen)
  }

  const signOutHandler = async () => {
    localStorage.removeItem("userToken")
    profileRefetch()
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
      <div className='w-[40px] h-[40px] bg-[#8d8d91] justify-center rounded-[90px] flex items-center'>
        <FontAwesomeIcon icon={faBullhorn} className='text-[#ffff] text-[21px]' />
      </div>
      <div className='relative'>
        <div>
          <button onClick={profileDropDownHandler} className='w-[41px]'>
            <img src={userProfileData && userProfileData.userProfile.profilePicture} referrerpolicy="no-referrer" alt="profile Picture" className='rounded-full w-[100%]' />
          </button>
          {isProfileDropDownOpen && <ProfileDropDown signOutHandler={signOutHandler} />}
        </div>
      </div>
    </div></>
  )
}

export default HeaderRight