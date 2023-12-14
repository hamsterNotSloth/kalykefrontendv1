import React from "react";
import { Link } from "react-router-dom";
function Policy() {
  return (
    <>
      <span className=" text-center text-[#999999] text-[10px] md:text-[13px] font-[500]">
        Click “Sign up” to agree to Kalyke
        <Link href="/T&C" className="text-[#007BC7]  px-[4px]">
          terms and conditions
        </Link>
        and <br /> acknowledge that Kalyke'{" "}
        <Link to="/privacypolicy" className="text-[#007BC7] ">
          Privacy Policy
        </Link>{" "}
        applies to you.
      </span>
      <div className="flex gap-2 mt-[15px]">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-600 rounded-xl"
        />
        <span className=" text-center text-[#999999] text-[9px] md:text-[13px] font-[500]">
          Get updates & product news from Kalyke
        </span>
      </div>
    </>
  );
}

export default Policy;
