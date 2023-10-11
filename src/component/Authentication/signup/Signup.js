import React, {  useState } from "react";

import MainModal from "../MainModal";
import Logo from "./Logo";
import SignupModal from "./SignupModal";
import { auth, provider } from "../../../config/config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import Login from "../login/Login";

function Signup({setSignUpModalStatus}) {
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

  const GoogleSignUpHandler = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user, ':user')
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  const faceBookSignInHandler = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider).then((res) => {
      console.log(res, "facebOOk login Success")
      
    }).catch(err => {
      console.log(err, "Facebook login failed")
    })
  }
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
      icon: "images/apple-logo.png",
      text: "Sign in with Apple",
      func: loginContentHandler,
    },
    {
      icon: "images/mail.png",
      text: "sign in with Email",
      func: loginContentHandler,
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
            {showSignUpContent ? <SignupModal goToLoginHandler={goToLoginHandler}/> : null}
            {showMainContent ? (
              <MainModal
                loginContentHandler={loginContentHandler}
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
