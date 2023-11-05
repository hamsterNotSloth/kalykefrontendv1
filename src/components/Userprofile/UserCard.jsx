import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UserUpdateCom from './UserUpdateCom';
import { useGetMyProfileQuery, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { useParams } from 'react-router-dom';

function UserCard({  autherizationRequired }) {
  const [updateComponentToggler, setUpdateComponentToggler] = useState(false)
  const token = getToken()
  const {user_id} = useParams()
  const {data: userProfile, refetch: userProfileRefetch} = useGetUserProfileQuery({user_id, token})
  
  useEffect(() => {
    userProfileRefetch({user_id, token})
}, [user_id])
    const updateProfileDetails = () => {
        setUpdateComponentToggler(!updateComponentToggler)
    }

    return (
        <div className='bg-white w-[375px] relative min-h-[250px] h-[100%] flex flex-col items-center shadow-md p-5 rounded-md'>
            {updateComponentToggler ? <button onClick={updateProfileDetails} type="button" class=" absolute right-[7px] top-[6px] rounded-md p-2 inline-flex items-center justify-center text-gray-400 ">
                <span class="sr-only">Close menu</span>
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button> : null}
            <div className='h-[150px] w-[150px] rounded-full mb-7'>
                <img
                    src={userProfile && userProfile.profile && userProfile.profile.profilePicture ? userProfile.profile.profilePicture : 'No image'}
                    className="rounded-full w-[100%] h-[100%]"
                    alt="user Pic"
                />

            </div>
            <div className='text-center pb-2'>
                <span className='text-[21px] font-semibold'>{userProfile && userProfile.profile && userProfile.profile.userName ? userProfile.profile.userName : "No username"}</span>
            </div>
            {userProfile && userProfile.permissionGranter && (
                <>
                    {!updateComponentToggler ? (
                        <button onClick={updateProfileDetails} className='bg-[#1da1f2] rounded-2xl text-white px-7 py-1'>
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                        </button>
                    ) : null}

                    {updateComponentToggler && <UserUpdateCom userData={userProfile} token={token} updateProfileDetails={updateProfileDetails} />}
                </>
            )}

        </div>
    )
}

export default UserCard