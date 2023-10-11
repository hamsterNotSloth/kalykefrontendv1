import React from "react";
import { auth, provider } from "../../../config/config";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "../../reusableComponent/Button";
function LoginButtons() {
  
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
      func: faceBookSignInHandler,
    }
  ];
  
  return (
    <>
      <Button buttonItems={buttonItems} />
    </>
  );
}

export default LoginButtons;
