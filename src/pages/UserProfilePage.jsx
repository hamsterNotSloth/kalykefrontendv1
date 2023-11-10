import React, { useEffect } from 'react'
import UserProfile from '../components/Userprofile/UserProfile'
import { useGetUserProfileQuery, useGetUserproductsQuery } from '../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'

function UserProfilePage() {
  
  const {user_id} = useParams()
  const {data: userProducts, isLoading} = useGetUserproductsQuery(user_id)
  return (
    <>
      {isLoading? <div className='w-full h-[100vh] flex justify-center items-center'><span>Loading...</span></div> : <UserProfile autherizationRequired={false} userProducts={userProducts}/>}
    </>
  )
}

export default UserProfilePage
