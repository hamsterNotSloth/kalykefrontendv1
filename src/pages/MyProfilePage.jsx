import React, { useEffect } from 'react'
import UserProfile from '../components/UserProfile/UserProfile'
import { useGetMyProductsQuery, useGetMyProfileQuery, useGetUserproductsQuery } from '../redux/apiCalls/apiSlice'
import { getToken } from '../Token/token'
import { useParams } from 'react-router-dom'
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

// This is a test component, it has no real use in the application
function MyProfilePage() {
  const token = getToken()
  const { user_id } = useParams()
  const { data: userProducts, isLoading,error,  isFetching, isError } = useGetMyProductsQuery(token)
  if(isError) return <div className='flex items-center justify-center h-[100vh] w-full'>Something went wrong</div>
  if (isLoading || isFetching) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  return (
    <>
      {/* <UserProfile autherizationRequired={true} userProducts={userProducts} /> */}
    </>
  )
}

export default MyProfilePage
