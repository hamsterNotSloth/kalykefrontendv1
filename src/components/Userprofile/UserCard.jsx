import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGlobe, faPenToSquare, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import UserUpdateCom from './UserUpdateCom';
import { useCreateStripeUserMutation, useGetUserProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { useParams } from 'react-router-dom';
import ProfileUpdatePopup from './ProfileUpdatePopup';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import ShareProfile from './ShareProfile';
import Followbtn from '../Common/FollowBtn';

function UserCard() {
    const [profileImage, setProfileImage] = useState()
    const [isShareBtnOpen, setIsShareBtnOpen] = useState(false)
    const token = getToken()
    const { user_id } = useParams()
    const { data: userProfile, isLoading, refetch: userProfileRefetch } = useGetUserProfileQuery({ user_id, token })
    const initializeSocialMedia = () => {
        const socialMediaArray = [
            { socialMediaName: 'Website', link: null },
            { socialMediaName: 'Instagram', link: null },
            { socialMediaName: 'Facebook', link: null },
            { socialMediaName: 'Youtube', link: null },
            { socialMediaName: 'Linkedin', link: null },
        ];

        userProfile?.profile?.socialMedia.forEach((item) => {
            const index = socialMediaArray.findIndex(
                (socialMedia) => socialMedia.socialMediaName === item.socialMediaName
            );
            if (index !== -1) {
                socialMediaArray[index].link = item.link;
            }
        });
        setNewUserInfo({ newUserInfo, socialMedia: socialMediaArray })
    };
    const [newUserInfo, setNewUserInfo] = useState({
        userName: userProfile?.profile?.userName,
        description: userProfile?.profile?.description,
        profilePicture: userProfile?.profile?.profilePicture,
        socialMedia: [
            { socialMediaName: 'Website', link: '' },
            { socialMediaName: 'Instagram', link: '' },
            { socialMediaName: 'Facebook', link: '' },
            { socialMediaName: 'Youtube', link: '' },
            { socialMediaName: 'Linkedin', link: '' },
        ]
    })
    const [createStripeUser] = useCreateStripeUserMutation()
    const [updateComponentToggler, setUpdateComponentToggler] = useState(false)
    const [updateImageToggler, setUpdateImageToggler] = useState(false)
    useEffect(() => {
        userProfileRefetch({ user_id, token })
    }, [user_id])
    useEffect(() => {
        initializeSocialMedia()
    }, [userProfile])
    const updateProfileDetails = () => {
        setUpdateComponentToggler(!updateComponentToggler)
    }

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);

        const formattedDate = dateObject.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          });
      

        return `${formattedDate}`;
    }

    const handleCreateStripeUser = async () => {
        try {
            const response = await createStripeUser({ token })
            const { accountLinkUrl } = response.data;

            window.location.href = accountLinkUrl;
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const iconMapping = {
        Website: faGlobe,
        Instagram: faInstagram,
        Facebook: faFacebook,
        Youtube: faYoutube,
        Linkedin: faLinkedin,
    };
    const dropUserSharedownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropUserSharedownRef.current && !dropUserSharedownRef.current.contains(event.target)) {
                setIsShareBtnOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropUserSharedownRef]);

    if (isLoading) return <div><span>Loading!</span></div>
    return (
        <div className='bg-white w-[375px] relative min-h-[250px] h-[100%] flex flex-col items-center shadow-md p-5 rounded-md'>
            {updateComponentToggler && <button onClick={updateProfileDetails} type="button" className=" absolute right-[7px] top-[6px] rounded-md p-2 inline-flex items-center justify-center text-gray-400 ">
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path d="M6 18L18 6M6 6l12 12" />
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
                <span>Member since {formatDate(userProfile?.profile?.createdAt)}</span>
                <div dangerouslySetInnerHTML={{ __html: userProfile?.profile?.description }} />
            </div>
            <div className='flex gap-4 items-start justify-center w-full'>
                <ul className='flex justify-center items-center gap-3 pb-1'>
                    {userProfile?.profile?.socialMedia?.filter(link => link.link && link.link.trim() !== '') 
                        .map(link => (
                            <li key={link.socialMediaName}>
                                <a href={link.link} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={iconMapping[link.socialMediaName]} />
                                </a>
                            </li>
                        ))}
                </ul>

                <div className='relative flex justify-center' ref={dropUserSharedownRef}>
                    <button className='text-[16px]' onClick={() => setIsShareBtnOpen(!isShareBtnOpen)}><FontAwesomeIcon icon={faShareNodes} /></button>
                    {isShareBtnOpen && <ShareProfile setIsShareBtnOpen={setIsShareBtnOpen} />}
                </div>
            </div>
            <Followbtn style={`px-1 py-1 w-[108px] mt-2 rounded-full mb-2`} productDetails={userProfile?.profile} />
            {userProfile && userProfile.permissionGranter && (
                <>
                    {!updateComponentToggler && (
                        <button onClick={updateProfileDetails} className='bg-[#1da1f2] rounded-2xl text-white px-7 py-1'>
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                        </button>
                    )}

                    {updateComponentToggler && <UserUpdateCom newUserInfo={newUserInfo} userProfile={userProfile} setNewUserInfo={setNewUserInfo} token={token} updateProfileDetails={updateProfileDetails} />}

                    <div>
                        {/* <span className='text-[14px]'>{userProfile?.profile?.paymentAccountLink ? "Linked Payment method:" : "Link Payment method"} </span> */}
                        <button className={`text-white mt-4 py-2 px-2 rounded-md font-semibold ${userProfile?.profile?.paymentAccountLink ? "bg-[#17ff00]" : "bg-[#f00]"}`} onClick={() => handleCreateStripeUser()}>
                            {userProfile?.profile?.paymentAccountLink ? "Update Payment Method" : "Link Payment Method"}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserCard