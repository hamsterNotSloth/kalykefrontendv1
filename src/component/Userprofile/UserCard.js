import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UserUpdateCom from './UserUpdateCom';

function UserCard() {
    const [updateComponentToggler, setUpdateComponentToggler] = useState(false)
    const updateProfileDetails = () => {
        setUpdateComponentToggler(!updateComponentToggler)
    }

    return (
        <div className='bg-white w-[375px] min-h-[250px] h-[100%] flex flex-col items-center shadow-md p-5 rounded-md'>
            <div className='h-[150px] w-[150px] rounded-full mb-7'>
                <img src="/images/userPic.jpg" className='rounded-full' alt="user Pic" />
            </div>
            <div className='text-center pb-2'>
                <span className='text-[21px] font-semibold'>Abdul Haadi</span>
            </div>
            {updateComponentToggler == false ? <button onClick={updateProfileDetails} className='bg-[#1da1f2] rounded-2xl text-white px-7 py-1'><FontAwesomeIcon icon={faPenToSquare} /> Edit Profile</button> : null}
            {updateComponentToggler ? <UserUpdateCom updateProfileDetails={updateProfileDetails} /> : null}
        </div>
    )
}

export default UserCard