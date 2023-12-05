import React, {  useState } from 'react';
import { useForgetPasswordMutation } from '../../redux/apiCalls/apiSlice';
import { toast } from 'react-toastify';

const ForgotPassword = ({setResetPassModal}) => {
    const [email, setEmail] = useState('');
    const [forgetPassword, {isLoading}] = useForgetPasswordMutation()
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
     const response = await forgetPassword(email)
       if(response.data && response.data.status == true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.error.data.message);
      }
      } catch(err) {
        console.log("failed", err)
      }
    };
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative bg-white p-6 rounded shadow-lg">
          <div className="flex justify-end">
            <button onClick={() => setResetPassModal(false)} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
          <p className="mb-4">Enter your email to reset your password:</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Email"
          />
          <button disabled={isLoading} onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
            {isLoading? "Processing..." : "Reset Password"} 
          </button>
        </div>
      </div>
    );
  
};

export default ForgotPassword;