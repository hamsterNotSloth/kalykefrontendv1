import React from "react";
import { faTimes, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputFields from "./InputFields";
function LoginModal() {
    return (
        <>
            <div className=" ">
                <span className="block  font-bold text-[15px] md:text-[20px] text-[#2C2C2E]  mt-[20px]  mb-[25px]  md:mt-[25px]  md:mb-[25px]">
                    Create Account
                </span>
                <form>
                    <InputFields label="Username*" type="text" />
                    <InputFields label="Email*" type="email" />
                    <InputFields label="Password*" type="password" />
                    <InputFields label=" Confirm Password*" type="password" />
                    <button
                        type="submit"
                        className="py-[8px] w-full bg-[#1DA1F2] mb-[15px] rounded-lg flex items-center justify-center text-[#fff] font-semibold text-[19px] hover:bg-[#5EC1FF] transition duration-300 ease-in-out"
                    >
                        Sign up
                    </button>
                </form>
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
            </div>
        </>
    );
}

export default LoginModal;