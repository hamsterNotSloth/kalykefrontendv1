import React, { useState } from 'react'
import Button from './Button'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { googleLogout } from '@react-oauth/google';


function MainModal({ buttonItems, loginContentHandler }) {
    const [user, setUser] = useState([]);
    const googleLogoutHandler = () => {
        console.log("googleLogout", googleLogout)
        googleLogout();
    
    }
    function googleLogouttest() {
        var _a, _b, _c;
        (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.accounts) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.disableAutoSelect();
    }
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
            <button onClick={googleLogouttest}>Logout from google</button>

            <Button buttonItems={buttonItems} />
            <span className="block text-center py-[20px] md:py-[60px] text-[#000] font-bold text-[16px] md:text-[18px] md:text-[20px] pr-2">
                Already a member?
                <button onClick={loginContentHandler} href="/" className=" text-[#007BC7] font-semibold ">
                    Sign in
                </button>
            </span>
            <p className=" text-center text-[#999999] text-[11px] md:text-[13px] font-[500]">
                Your privacy is most important to us.
                <br /> So here are our
                <a href="/" className="text-[#007BC7]">
                    Privacy Policy
                </a>
                an
                <a href="/" className="text-[#007BC7]">
                    Terms and <br /> Conditions
                </a>
                about how we protect your data.
            </p>
        </div>
    )
}

export default MainModal
