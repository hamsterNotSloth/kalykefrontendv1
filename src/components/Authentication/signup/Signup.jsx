import React, { useState } from "react";

import MainModal from "../MainModal";
import Logo from "./Logo";
import SignupModal from "./SignupModal";
import { auth, provider } from "../../../config/config";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Login from "../login/Login";
import { useSignInUserMutation } from "../../../redux/apiCalls/apiSlice";
import { toast } from "react-toastify";

function Signup({ setSignUpModalStatus }) {
  const [showMainContent, setShowMainContent] = useState(true);
  const [showSignUpContent, setShowSignUpContent] = useState(false);
  const [signInUser] = useSignInUserMutation();

  const signUpContentHandler = () => {
    setShowMainContent(false);
    setShowSignUpContent(true);
  };

  const signContentHandler = () => {
    setShowMainContent(true);
    setShowSignUpContent(false);
  };

  const GoogleSignUpHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const response = await signInUser({ credential: result.user, source: "Google" });

      if (response.data && response.data.userData.status == true) {
        toast.success(response.data.userData.message);
      } else {
        toast.error(response.error.data.message);
      }
      localStorage.setItem('userToken', response?.data?.userData?.token)
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error(error);
    }
  };


  const faceBookSignInHandler = async () => {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const response = await signInUser({ credential: result.user, source: "Facebook" });
      if (response.data && response.data.userData.status == true) {
        toast.success(response.data.userData.message);
      } else {
        toast.error(response.error.data.message);
      }
      localStorage.setItem('userToken', response.data.userData.token)
    } catch (err) {
      toast.error(err.message);
    }
  };


  const goToLoginHandler = () => {
    setShowSignUpContent(false)
    setShowMainContent(false)
  }
  const buttonItems = [
    {
      icon: "images/google.png",
      text: "Sign in with Google",
      func: GoogleSignUpHandler,
    },
    {
      icon: "images/facebook.png",
      text: "Sign in with Facebook",
      func: faceBookSignInHandler,
    },
    {
      icon: "images/mail.png",
      text: "sign in with Email",
      func: signUpContentHandler,
    },
  ];

  return (
    <>
      <div className="relative my-4">
        <div
          id="authentication-modal"
          className="fixed inset-0 flex items-center justify-center z-50  bg-black bg-opacity-30 overflow-auto py-2"
        >
          <div className=" w-[400px] md:w-[470px] py-[1.5rem] px-[2rem]  rounded-[1rem] bg-[#fff] ">
            <Logo setSignUpModalStatus={setSignUpModalStatus}
              showSignUpContent={showSignUpContent}
              signContentHandler={signContentHandler}
            />
            {showSignUpContent ? <SignupModal goToLoginHandler={goToLoginHandler} /> : null}
            {showMainContent ? (
              <MainModal
                goToLoginHandler={goToLoginHandler}
                buttonItems={buttonItems}
              />
            ) : null}
            {showMainContent == false && showSignUpContent == false ? <Login setShowMainContent={setShowMainContent} setShowSignUpContent={setShowSignUpContent} /> : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
