import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UserUpdateCom from './UserUpdateCom';
import { useCreateStripeUserMutation, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { useParams } from 'react-router-dom';
import ProfileUpdatePopup from './ProfileUpdatePopup';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons';
import CreateStripeUser from './Stripe/createStripeUser';

function UserCard() {
    const [profileImage, setProfileImage] = useState()
    const token = getToken()
    const { user_id } = useParams()
    const { data: userProfile, isLoading, refetch: userProfileRefetch } = useGetUserProfileQuery({ user_id, token })
    const [newUserInfo, setNewUserInfo] = useState({
        userName: userProfile?.profile?.userName,
        description: userProfile?.profile?.description,
        profilePicture: userProfile?.profile?.profilePicture,
        socialMedia: [
            {
                socialMediaName: "Website",
                link: null
            },
            {
                socialMediaName: "Instagram",
                link: null
            },
            {
                socialMediaName: "Facebook",
                link: null
            },
            {
                socialMediaName: "Youtube",
                link: null
            },
            {
                socialMediaName: "Linkedin",
                link: null
            }
        ]
    })

    const [createStripeUser] = useCreateStripeUserMutation()

    const [updateComponentToggler, setUpdateComponentToggler] = useState(false)
    const [updateImageToggler, setUpdateImageToggler] = useState(false)

    useEffect(() => {
        userProfileRefetch({ user_id, token })
    }, [user_id])
    const updateProfileDetails = () => {
        setUpdateComponentToggler(!updateComponentToggler)
    }

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);

        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');

        return `${day}-${month}-${year}`;
    }

    const handleCreateStripeUser = async () => {
        try {
            const response = await createStripeUser({ token })
            const { accountLinkUrl } = response.data;

            // Redirect the user to the Stripe onboarding flow
            window.location.href = accountLinkUrl;
            console.log('Stripe User ID:', response);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    if (isLoading) return <div><span>Loading!</span></div>
    return (
        <div className='bg-white w-[375px] relative min-h-[250px] h-[100%] flex flex-col items-center shadow-md p-5 rounded-md'>
            {updateComponentToggler && <button onClick={updateProfileDetails} type="button" className=" absolute right-[7px] top-[6px] rounded-md p-2 inline-flex items-center justify-center text-gray-400 ">
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>}
            <div className='h-[150px] w-[150px] relative rounded-full mb-7'>
                {updateComponentToggler && <button className='absolute right-0' onClick={() => setUpdateImageToggler(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>}
                {updateImageToggler && <ProfileUpdatePopup userProfile={userProfile} newUserInfo={newUserInfo} setNewUserInfo={setNewUserInfo} profileImage={profileImage} setProfileImage={setProfileImage} setUpdateImageToggler={setUpdateImageToggler} />}
                <div className='w-full h-full'>
                    {!newUserInfo.profilePicture ? <img
                        src={userProfile && userProfile.profile && userProfile.profile.profilePicture ? userProfile.profile.profilePicture : 'No image'}
                        className="rounded-full w-[100%] h-[100%]"
                        alt="user Pic"
                    /> :
                        <img src={newUserInfo.profilePicture} className="rounded-full w-[100%] h-[100%]" alt="user Pic" />}
                </div>
            </div>
            <div className='text-center flex flex-col items-center pb-2'>
                <span className='text-[21px] font-semibold'>{userProfile && userProfile.profile && userProfile.profile.userName ? userProfile.profile.userName : "No username"}</span>
                <span>Since, {formatDate(userProfile?.profile?.createdAt)}</span>
                <div dangerouslySetInnerHTML={{ __html: userProfile?.profile?.description }} />
            </div>
            {userProfile && userProfile.permissionGranter && (
                <>
                    {!updateComponentToggler && (
                        <button onClick={updateProfileDetails} className='bg-[#1da1f2] rounded-2xl text-white px-7 py-1'>
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                        </button>
                    )}

                    {updateComponentToggler && <UserUpdateCom newUserInfo={newUserInfo} userProfile={userProfile} setNewUserInfo={setNewUserInfo} token={token} updateProfileDetails={updateProfileDetails} />}

                    <div>
                        <span className='text-[14px]'>Payment method: </span><button onClick={() => handleCreateStripeUser()} className='mt-4'>
                            <FontAwesomeIcon icon={faCcStripe} />
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserCard