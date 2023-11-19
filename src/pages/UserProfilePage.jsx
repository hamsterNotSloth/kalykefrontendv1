import React, { useEffect } from 'react'
import UserProfile from '../components/UserProfile/UserProfile'
import { useGetUserproductsQuery } from '../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

function UserProfilePage() {
  
  const {user_id} = useParams()
  const {data: userProducts, isLoading} = useGetUserproductsQuery(user_id)
  if (isLoading ) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  return (
    <>
      <UserProfile />
      test
    </>
  )
}

export default UserProfilePage
