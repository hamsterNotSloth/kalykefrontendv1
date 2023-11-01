import React from "react";
import { auth, provider } from "../../../config/config";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "../../ReUsableComponent/Button";
import { useSignInUserMutation } from "../../../redux/apiCalls/apiSlice";
import { toast } from "react-toastify";
function LoginButtons() {
  const [signInUser] = useSignInUserMutation();
  const GoogleSignUpHandler = async () => {

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const response = await signInUser({ credential: result.user, source: "Google" });
      if(response.data && response.data.userData.status == true) {
        toast.success(response.data.userData.message);
      } else {
        toast.error(response.error.data.message);
      }
      localStorage.setItem('userToken', response.data.userData.token)
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };


  const faceBookSignInHandler = async () => {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const response = await signInUser({ credential: result.user, source: "Facebook" });
      if(response.data && response.data.userData.status == true) {
        toast.success(response.data.userData.message);
      } else {
        toast.error(response.error.data.message);
      }
      localStorage.setItem('userToken', response.data.userData.token)
    } catch (err) {
      console.log(err, "Facebook login failed");
    }
  };
 
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
    }
  ];
  
  return (
    <>
      <Button buttonItems={buttonItems} />
    </>
  );
}

export default LoginButtons;
