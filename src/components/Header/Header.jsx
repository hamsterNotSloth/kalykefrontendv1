import React, { useEffect } from 'react'
import HeaderLeft from './HeaderLeft'
import HeaderInputField from './HeaderInputField'
import HeaderRight from './HeaderRight'
import { useGetMyProfileQuery, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import HeaderRightAuthenticate from './HeaderRightAuthenticate'
import { getToken } from '../../Token/token'

const Header = () => {
  const token = getToken()
  const {data: userProfileData} = useGetMyProfileQuery(token)
 
  return (
    <>
      <div className='flex py-4 px-6 justify-between items-center'>
        <HeaderLeft />
        {/* {signUpModalStatus ? <Signup setSignUpModalStatus={setSignUpModalStatus} /> : null} */}
        <HeaderInputField />
         {userProfileData && userProfileData.status == true? <HeaderRight  /> : <HeaderRightAuthenticate />} 
      </div>
    </>
  )
}

export default Header