import React, { useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import { useGetMyProfileQuery, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'

function ProfileDropDown({signOutHandler}) {
  const token = getToken()
  const {data: userProfileData, isLoading} = useGetMyProfileQuery(token)
  
    const dropDownList = [
        {
            text: "View Profile",
            icon: "none",
            to: `/user/${userProfileData?.myProfile?.u_id}`
        }
    ]

  
    if(isLoading) return <div className='w-full h-[100vh] flex justify-center items-center'><span>Loading...</span></div>
  return (
    <div className='bg-white rounded-lg absolute z-10 w-[280px] right-0 py-4 px-4 shadow-md'>
      <div className='flex'>
      <Link to={`/user/${userProfileData?.myProfile?.u_id}`} className='bg-[#e8e8e8] flex justify-center rounded-full py-2 px-4 w-[100%]'>View My Models</Link>
      </div>
      <ul>
        {dropDownList.map((item, index) => {
            return <Link className='block' to={item.to} key={`profileDropdown ${index + Math.random() * Date.now()}`}>{item.text}</Link>
        })}
      </ul>
      <Link to="/" onClick={() => signOutHandler()} className='text-dark hover:text-[#ea4754] rounded-full transition-colors duration-100'>Sign out</Link>
    </div>
  )
}

export default ProfileDropDown
