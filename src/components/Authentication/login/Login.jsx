import React, { useState } from "react";
import LoginButtons from "./LoginButtons";
import LoginFields from "./LoginFields";
import ForgotPassword from "../ForgotPassword";
import { Link } from "react-router-dom";
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
          Click “Log in” to agree to Kalyke
          <Link to="/T&C" className="text-[#007BC7]  px-[4px]">
            terms and conditions
          </Link>
        </span>
        <span className="block text-center mt-[15px] text-[#999999] text-[10px] md:text-[13px] font-[500]">
          <Link to="/privacypolicy" className="text-[#007BC7] ps-[4px] ">
            Privacy Policy
          </Link>
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
