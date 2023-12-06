import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useGetMyProfileQuery, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'
import { toast } from 'react-toastify'

function ProfileDropDown({ signOutHandler, profileDropDownHandler }) {
  const token = getToken()
  const { data: userProfileData, isLoading } = useGetMyProfileQuery(token)

  const dropDownList = [
    {
      text: "View Profile",
      icon: "none",
      to: `/user/${userProfileData?.myProfile?.u_id}`
    },
    {
      text: "Wishlist",
      icon: "none",
      to: "/products/Wishlist"
    },
    {
      text: "Downloaded products",
      icon: "none",
      to: "/products/downloaded-products"
    }
  ]


  if (isLoading) return <div className='w-full h-[100vh] flex justify-center items-center'><span>Loading...</span></div>
  return (
    <div className='bg-white rounded-lg absolute z-10 w-[280px] right-0 py-4 shadow-md'>
      <div className='flex  px-4'>
        <Link to={`/user/${userProfileData?.myProfile?.u_id}`} onClick={profileDropDownHandler} className='bg-[#e8e8e8] hover:bg-[#585858] hover:text-[white] flex justify-center rounded-full py-2 px-4 w-[100%]'>View My Models</Link>
      </div>
      <ul className='mt-2'>
        {dropDownList.map((item, index) => {
          return <Link className='block hover:text-[#3c3c3c] border-b border-b-[#ebe0e0] px-4 py-2' to={item.to} key={`profileDropdown ${index + Math.random() * Date.now()}`} onClick={profileDropDownHandler}>{item.text}</Link>
        })}
      </ul>
      <Link to="/" onClick={() => { profileDropDownHandler(); signOutHandler() }} className='text-dark pt-2 w-full flex px-4 hover:text-[#ea4754] rounded-full transition-colors duration-100'>Sign out</Link>
    </div>
  )
}

export default ProfileDropDown
