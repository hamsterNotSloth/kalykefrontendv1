import { sendEmailVerification } from 'firebase/auth'
import React from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../config/config'

function NotVerified() {
    const sendVerification = async () => {
        try {
            await sendEmailVerification(auth.currentUser)
            toast.success("Check your inbox or spam")
        } catch(error) {
            toast.error(error.message || "Something went wrong while sending verification email. Please login again and resend email.")
        }
    }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 flex flex-col items-center justify-center bg-white rounded shadow-md">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            <p className="text-xl font-semibold text-red-500">Email not verified</p>
            <p className="text-gray-600">Please verify your email to view this content.</p>
            <button onClick={sendVerification} className='flex justify-center items-center mt-4 bg-[#2f85ff] hover:bg-[#5487ff] w-full text-white text-[16px] rounded-md w-[120px] h-[34px]'>Resend Verification Email</button>
      </div>
    </div>
  )
}

export default NotVerified
