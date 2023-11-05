import React, { useEffect } from 'react'
import {Link, useParams} from "react-router-dom"
import { useGetMyProfileQuery, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'

function ProfileDropDown({signOutHandler}) {
  const token = getToken()
  const {user_id} = useParams()
  const {data: userProfileData} = useGetMyProfileQuery(token)

    const dropDownList = [
        {
            text: "View Profile",
            icon: "none",
            to: `/user/${userProfileData && userProfileData.myProfile && userProfileData.myProfile.u_id}`
        },
        {
            text: "settings",
            icon: "none",
            to: "none"
        },
    ]

  

  return (
    <div className='bg-white rounded-lg absolute z-10 w-[280px] right-0 py-4 px-4 shadow-md'>
      <button className='bg-[#e8e8e8] rounded-full py-2 px-4 w-[100%]'>View My Models</button>
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
