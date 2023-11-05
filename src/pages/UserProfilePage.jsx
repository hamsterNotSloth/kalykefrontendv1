import React, { useEffect } from 'react'
import UserProfile from '../components/Userprofile/UserProfile'
import { useGetUserProfileQuery, useGetUserproductsQuery } from '../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'

function UserProfilePage() {
  
  const {user_id} = useParams()
  const {data: userProducts} = useGetUserproductsQuery(user_id)
  return (
    <>
      <UserProfile autherizationRequired={false} userProducts={userProducts}/>
    </>
  )
}

export default UserProfilePage
