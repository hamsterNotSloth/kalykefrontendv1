import React from "react";
import { auth, provider } from "../../../config/config";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Button from "../../ReUsableComponent/Button";
import { useLoginUserMutation } from "../../../redux/apiCalls/apiSlice";
import { toast } from "react-toastify";
function LoginButtons() {
  const [loginUser] = useLoginUserMutation();
  const GoogleSignUpHandler = async () => {

    try {
      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const response = await loginUser({ credential: result.user, source: "Google" });
      if(response.data && response.data.token.status == true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.error.data.message);
      }
      localStorage.setItem('userToken', response.data.token.token)
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };


  const faceBookSignInHandler = async () => {
    try {
      const provider = new FacebookAuthProvider();
      provider.addScope('email');
      const result = await signInWithPopup(auth, provider);
      const response = await loginUser({ credential: result.user, source: "Facebook" });
      if(response.data && response.data.token.status == true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.error.data.message);
      }
      localStorage.setItem('userToken', response.data.token.token)
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
