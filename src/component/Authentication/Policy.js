import React from "react";

function Policy() {
  return (
    <>
      <span className=" text-center text-[#999999] text-[10px] md:text-[13px] font-[500]">
        Click “Sign up” to agree to Thangs
        <a href="/" className="text-[#007BC7]  px-[4px]">
          terms and conditions
        </a>
        and <br /> acknowledge that Thangs'{" "}
        <a href="/" className="text-[#007BC7] ">
          Privacy Policy
        </a>{" "}
        applies to you.
      </span>
      <div className="flex gap-2 mt-[15px]">
        <input
          type="checkbox"
          class="form-checkbox h-4 w-4 text-blue-600 rounded-xl"
        />
        <span className=" text-center text-[#999999] text-[9px] md:text-[13px] font-[500]">
          Get updates & product news from Thangs
        </span>
      </div>
    </>
  );
}

export default Policy;
