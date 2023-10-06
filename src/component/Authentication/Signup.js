import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainModal from "./MainModal";
import Logo from "./Logo";
import SignupModal from "./SignupModal";
function Signup() {
  const [showMainContent, setShowMainContent] = useState(true);
  const [showSignUpContent, setShowSignUpContent] = useState(false);
  const loginContentHandler = () => {
    setShowMainContent(false);
    setShowSignUpContent(true);
  };
  const signContentHandler = () => {
    setShowMainContent(true);
    setShowSignUpContent(false);
  };
  const buttonItems = [
    {
      icon: "images/facebook.png",
      text: "Sign up with Facebook",
      func: loginContentHandler,
    },
    {
      icon: "images/apple-logo.png",
      text: "Sign up with Apple",
      func: loginContentHandler,
    },
    {
      icon: "images/mail.png",
      text: "sign up with Email",
      func: loginContentHandler,
    },
  ];
  return (
    <>
      <div
        id="authentication-modal"
        className=" flex items-center h-[100vh]  justify-center z-10 bg-black bg-opacity-30 overflow-auto py-4"
      >
        <div className=" w-[400px] md:w-[470px] py-[1.5rem] px-[2rem]  rounded-[1rem] bg-[#fff] ">
          <Logo
            showSignUpContent={showSignUpContent}
            signContentHandler={signContentHandler}
          />
          {showSignUpContent ? <SignupModal /> : null}
          <GoogleOAuthProvider clientId="839029334431-0nuefo6olelm3b4ej6vuci248uej5eq3.apps.googleusercontent.com">
            {showMainContent ? <MainModal loginContentHandler={loginContentHandler} buttonItems={buttonItems} /> : null}
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
}

export default Signup;
