import React, { useEffect, useState } from 'react'
import HeaderLeft from './HeaderLeft'
import HeaderInputField from './HeaderInputField'
import HeaderRight from './HeaderRight'
import { useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice'
import HeaderRightAuthenticate from './HeaderRightAuthenticate'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'

const Header = () => {
  const token = getToken()
  const {data: userProfileData, error, isError} = useGetMyProfileQuery(token)
 
  return (
    <>
      <div className='flex py-4 px-6 justify-between items-center'>
        <HeaderLeft />
        {/* {signUpModalStatus ? <Signup setSignUpModalStatus={setSignUpModalStatus} /> : null} */}
        <HeaderInputField />
         {userProfileData && userProfileData.status == true? <HeaderRight /> : <HeaderRightAuthenticate />} 
      </div>
    </>
  )
}

export default Header