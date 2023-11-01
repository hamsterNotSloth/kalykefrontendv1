import React from 'react'
import {Link} from "react-router-dom"

function ProfileDropDown({signOutHandler}) {
    const dropDownList = [
        {
            text: "View Profile",
            icon: "none",
            to: "/user-profile"
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
            return <Link className='block' to={item.to} key={Math.random() * Date.now().toString(36)}>{item.text}</Link>
        })}
      </ul>
      <Link to="/" onClick={() => signOutHandler()} className='text-dark hover:text-[#ea4754] rounded-full transition-colors duration-100'>Sign out</Link>
    </div>
  )
}

export default ProfileDropDown
