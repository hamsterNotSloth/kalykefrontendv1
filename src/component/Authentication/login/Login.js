import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import LoginButtons from "./LoginButtons";
import LoginFields from "./LoginFields";
import ForgotPassword from "../ForgotPassword";
function Login({ setShowMainContent, setShowSignUpContent }) {
  const [resetPassModal, setResetPassModal] = useState(false)
  const goToCreateAccountHandler = () => {
    setShowSignUpContent(false)
    setShowMainContent(true)
  }
  return (
    <>
      {resetPassModal ? <ForgotPassword setResetPassModal={setResetPassModal}/> : null}
      {resetPassModal == false ? <>
        <LoginButtons />
        <LoginFields />
        <span className="text-center block">Forgot Password? <button className="text-[#007BC7]" onClick={() => setResetPassModal(true)}>Reset Now</button> </span>
        <span className="block text-center text-[#999999] text-[10px] md:text-[13px] font-[500]">
          Click “Log in” to agree to Thangs
          <a href="/" className="text-[#007BC7]  px-[4px]">
            terms and conditions
          </a>
          and <br /> acknowledge that Thangs'{" "}
          <a href="/" className="text-[#007BC7] ">
            Privacy Policy
          </a>{" "}
          applies to you.
        </span>
        <span className="block text-center mt-[15px] text-[#999999] text-[10px] md:text-[13px] font-[500]">
          This site is protected by reCAPTCHA and the Google
          <a href="/" className="text-[#007BC7] ps-[4px] ">
            Privacy Policy
          </a>
          <br />
          and
          <a href="/" className="text-[#007BC7] px-[4px] ">
            Terms of Services
          </a>
          apply
        </span>
        <button
          onClick={goToCreateAccountHandler}
          className="py-[8px] w-full bg-[#E8E8E8] mt-[50px]  mb-[15px] rounded-lg flex items-center justify-center text-[#2C2C2E] font-semibold text-[19px]  "
        >
          Create account
        </button></> : null}
    </>
  );
}

export default Login;
