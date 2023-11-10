import React, { useEffect } from 'react'
import UserProfile from '../components/Userprofile/UserProfile'
import { useGetMyProductsQuery, useGetMyProfileQuery, useGetUserproductsQuery } from '../redux/apiCalls/apiSlice'
import { getToken } from '../Token/token'
import { useParams } from 'react-router-dom'

function MyProfilePage() {
  const token = getToken()
  const { user_id } = useParams()
  const { data: userProducts, isLoading } = useGetMyProductsQuery(token)

  return (
    <>
      {isLoading ? <div className='w-full h-[100vh] flex justify-center items-center'><span>Loading...</span></div> : <UserProfile autherizationRequired={true} userProducts={userProducts} />}
    </>
  )
}

export default MyProfilePage
