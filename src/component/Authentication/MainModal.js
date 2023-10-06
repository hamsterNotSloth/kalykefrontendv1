import React from "react";
import Button from "../reusableComponent/Button";
import Conditions from "./Conditions";
import { GoogleLogin } from '@react-oauth/google';

function MainModal({ buttonItems, loginContentHandler }) {
  const googleSignup = async(data) => {
    try {
      const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify( data ),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json(); 
      return responseData; 
    } catch (error) {
      console.error('Error:', error);
      
    }
  }
  return (
    <div>
      <span className="block text-center font-bold text-[18px] md:text-[25px] text-[#2C2C2E]  mt-[20px]  mb-[25px]  md:mt-[35px]  md:mb-[45px]">
        Join the fastest{" "}
        <span className="block text-center">growing 3D comunity</span>
      </span>
      <div className='flex justify-center items-center w-full border border-[#000] mb-[20px] rounded-lg cursor-pointer'>
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        googleSignup(credentialResponse)
                        // const details = jwt_decode(credentialResponse.credential);
                        // console.log(details, 'details')
                        // console.log(credentialResponse);
                    }}
                    auto_select={false}
                    height='48px'
                    width="100%"
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
      <Button buttonItems={buttonItems} />
      <Conditions loginContentHandler={loginContentHandler} />
    </div>
  );
}

export default MainModal;
