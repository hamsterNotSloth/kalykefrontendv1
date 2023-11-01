import React from 'react'
import HeaderLeft from './HeaderLeft'
import HeaderInputField from './HeaderInputField'
import HeaderRight from './HeaderRight'
import { useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import HeaderRightAuthenticate from './HeaderRightAuthenticate'
import { getToken } from '../../Token/token'

const Header = () => {
  const token = getToken()
  const { data: userProfileData } = useGetUserProfileQuery({ token })

  return (
    <>
      <div className='flex py-4 px-6 justify-between items-center'>
        <HeaderLeft />
        {/* {signUpModalStatus ? <Signup setSignUpModalStatus={setSignUpModalStatus} /> : null} */}
        <HeaderInputField />
         {userProfileData && userProfileData.userProfile? <HeaderRight  /> : <HeaderRightAuthenticate />} 
      </div>
    </>
  )
}

export default Header