import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UserUpdateCom from './UserUpdateCom';
import { useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { Token } from '../../customHooks/token';

function UserCard() {
    const [updateComponentToggler, setUpdateComponentToggler] = useState(false)
    const token = Token()
    const { data: userProfileData } = useGetUserProfileQuery({ token })
   
    const updateProfileDetails = () => {
        setUpdateComponentToggler(!updateComponentToggler)
    }
    return (
        <div className='bg-white w-[375px] min-h-[250px] h-[100%] flex flex-col items-center shadow-md p-5 rounded-md'>
            <div className='h-[150px] w-[150px] rounded-full mb-7'>
                <img
                    src={userProfileData && userProfileData.userProfile.profilePicture}
                    className="rounded-full w-[100%] h-[100%]"
                    alt="user Pic"
                />

            </div>
            <div className='text-center pb-2'>
                <span className='text-[21px] font-semibold'>{userProfileData && userProfileData.userProfile.userName}</span>
            </div>
            {updateComponentToggler == false ? <button onClick={updateProfileDetails} className='bg-[#1da1f2] rounded-2xl text-white px-7 py-1'><FontAwesomeIcon icon={faPenToSquare} /> Edit Profile</button> : null}
            {updateComponentToggler ? <UserUpdateCom token={token} updateProfileDetails={updateProfileDetails} /> : null}
        </div>
    )
}

export default UserCard