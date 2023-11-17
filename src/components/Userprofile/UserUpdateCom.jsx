import { faGlobe, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useUpdateUserInfoMutation } from '../../redux/apiCalls/apiSlice';
import { toast } from "react-toastify";
import Quill from '../Common/Quil';

function UserUpdateCom({ newUserInfo, setNewUserInfo,token,  updateProfileDetails, userProfile }) {
    

    const [updateUserInfo] = useUpdateUserInfoMutation()

    const updateUserInfoHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await updateUserInfo({ newUserInfo, token })
            if (response && response.data) {
                toast.success(response.data.message)
                updateProfileDetails()
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    const socialMedia = [faGlobe, faInstagram, faFacebook, faYoutube, faLinkedin]
    const descriptionHandler = (text) => {
        setNewUserInfo({ ...newUserInfo, description: text })
      }
    return (
        <form type='Submit' className='w-[100%]'>
            <div className='mb-3'>
                <label className='text-[16px] font-semibold'>Name</label>
                <input type="text" onChange={(e) => { setNewUserInfo({ ...newUserInfo, userName: e.target.value }) }} className='border-[1px] outline-none border-[#bbbbbb] focus:outline-none  border rounded-sm w-[100%] my-1 p-2' placeholder={userProfile?.profile?.userName} />
            </div>
            <div className='mt-2'>
                <label className='text-[16px] font-semibold'>Description</label>
                <Quill descriptionHandler={descriptionHandler} description={newUserInfo.description}/>
            </div>
            <div className='mt-6'>
                <label className='text-[16px] font-semibold'>Social media links.</label>
                {newUserInfo.socialMedia.map((item, index) => (
                    <div className='flex items-center' key={index}>
                        <span className='border-l-[1px] border-t border-b border-[#bbbbbb] rounded-sm pl-2 my-1 py-2'>
                            <FontAwesomeIcon icon={socialMedia[index]} />
                        </span>
                        <input
                            type="text"
                            value={item.link}
                            onChange={(e) => {
                                const updatedSocialMedia = [...newUserInfo.socialMedia];
                                updatedSocialMedia[index].link = e.target.value;
                                setNewUserInfo({ ...newUserInfo, socialMedia: updatedSocialMedia });
                            }}
                            className='border-r-[1px] outline-none border-[#bbbbbb] focus:outline-none border-t border-b rounded-sm w-[100%] my-1 p-2'
                            placeholder={item.source}
                        />
                    </div>
                ))}
            </div>
            <button onClick={updateUserInfoHandler} className='bg-[#1da1f2] w-[100%] border-[1px] border-[#b4b4b4] mt-5 rounded-2xl text-white px-7 py-1'><FontAwesomeIcon icon={faPenToSquare} /> Apply</button>
        </form>
    )
}

export default UserUpdateCom
