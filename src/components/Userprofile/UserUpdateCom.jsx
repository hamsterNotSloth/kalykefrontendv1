import { faGlobe, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useUpdateUserInfoMutation } from '../../redux/apiCalls/apiSlice';
import { toast } from "react-toastify";

function UserUpdateCom({ token, updateProfileDetails }) {
    const [newUserInfo, setNewUserInfo] = useState({
        userName: null,
        description: null
    })
    const [updateUserInfo] = useUpdateUserInfoMutation()

    const updateUserInfoHandler = async () => {
        try {
            const response = await updateUserInfo({newUserInfo, token })
            console.log(response, "response user updated")
            if(response && response.data) {
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    const socialMedia = [
        {
            icon: faGlobe,
            source: "Website address",
            link: "This is a link"
        },
        {
            icon: faInstagram,
            source: "Instagram username",
            link: "This is a link"
        },
        {
            icon: faFacebook,
            source: "Facebook",
            link: "This is a link"
        },
        {
            icon: faYoutube,
            source: "Youtube Channel",
            link: "This is a link"
        },
        {
            icon: faLinkedin,
            source: "Linkedin profile",
            link: "This is a link"
        }

    ]
    
    return (
        <div className='w-[100%]'>
            <div className='mb-3'>
                <input type="text" onChange={(e) => {setNewUserInfo({...newUserInfo, userName: e.target.value})}} className='border-[1px] outline-none border-[#bbbbbb] focus:outline-none  border rounded-sm w-[100%] my-1 p-2' placeholder={"Enter new name"} />
            </div>
            <ReactQuill
                value={newUserInfo.description}
                onChange={(text) => {setNewUserInfo({...newUserInfo, description: text})}}
                modules={{
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        ['link'],
                        ['clean']
                    ]
                }}
            />
            <div className='mt-6'>
                {socialMedia.map(item => {
                    return (
                        <div className='flex items-center'>
                            <span className='border-l-[1px] border-t border-b border-[#bbbbbb] rounded-sm pl-2 my-1 py-2'><FontAwesomeIcon icon={item.icon} /></span>
                            <input type="text" className='border-r-[1px] outline-none border-[#bbbbbb] focus:outline-none border-t border-b rounded-sm w-[100%] my-1 p-2' placeholder={item.source} />
                        </div>
                    )
                })}
            </div>
            <button onClick={updateUserInfoHandler} className='bg-[#1da1f2] w-[100%] border-[1px] border-[#b4b4b4] mt-5 rounded-2xl text-white px-7 py-1'><FontAwesomeIcon icon={faPenToSquare} /> Apply</button>
        </div>
    )
}

export default UserUpdateCom
