import React from 'react'
import NotVerified from '../components/messages/NotVerified'
import { useGetMyProfileQuery } from '../redux/apiCalls/apiSlice';
import { getToken } from '../Token/token';
import Uploader from '../components/UploadNew/Uploader';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function NotVerifiedProtectRoute() {
    const token = getToken()
    const navigate = useNavigate()
    const {data: myProfile, isLoading, error} = useGetMyProfileQuery(token)
    if (isLoading ) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
    if(error) {
       navigate("/")
       return toast.error("Please Signup/login to continue to upload page.")
    } 
    if(myProfile?.myProfile?.emailVerified == false) return <NotVerified />
  return (
    <>
      <Uploader />
    </>
  )
}

export default NotVerifiedProtectRoute
