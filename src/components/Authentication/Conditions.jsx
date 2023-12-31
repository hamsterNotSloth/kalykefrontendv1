import React from "react";
import { Link } from "react-router-dom";

function Conditions({ goToLoginHandler }) {
  return (
    <>
      <span className="flex gap-1 justify-center text-center py-[20px] md:py-[60px] text-[#000] font-bold text-[16px] md:text-[18px] md:text-[20px] pr-2">
        Already a member?
        <button
          onClick={goToLoginHandler}
          className=" text-[#007BC7] font-semibold "
        >
          Sign in
        </button>
      </span>
      <p className=" text-center pt-16 text-[#999999] text-[11px] md:text-[13px] font-[500]">
        Your privacy is most important to us.
        <br /> So here are our
        <Link to="/privacypolicy" className="text-[#007BC7]">
          Privacy Policy
        </Link>
        an
        <Link to="/T&C" className="text-[#007BC7]">
          Terms and <br /> Conditions
        </Link>
        about how we protect your data.
      </p>
    </>
  );
}

export default Conditions;
