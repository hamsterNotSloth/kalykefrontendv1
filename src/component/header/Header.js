import React, { useEffect } from 'react'
import HeaderLeft from './HeaderLeft'
import HeaderInputField from './HeaderInputField'
import HeaderRight from './HeaderRight'
import { Token } from '../../customHooks/token'
import { useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import HeaderRightAuthenticate from './HeaderRightAuthenticate'

const Header = () => {
  const token = Token()
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