import React from 'react'
import NotVerified from '../components/messages/NotVerified'
import { useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '../redux/apiCalls/apiSlice';
import { getToken } from '../Token/token';
import Uploader from '../components/UploadNew/Uploader';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

function NotVerifiedProtectRoute() {
    const token = getToken()
    const {data: myProfile, isLoading} = useGetMyProfileQuery(token)
    console.log(myProfile,'myProfile')
    if (isLoading ) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
    if(myProfile?.myProfile?.emailVerified == false) return <NotVerified />
  return (
    <>
      <Uploader />
    </>
  )
}

export default NotVerifiedProtectRoute
