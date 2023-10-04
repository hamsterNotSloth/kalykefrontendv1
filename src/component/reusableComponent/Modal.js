import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buttonItems } from "./ButtonItems";
import Button from "./Button";
function Modal() {
  return (
    <>
      <div
        id="authentication-modal"
        className=" flex items-center h-[100vh]  justify-center z-10 bg-black bg-opacity-30 overflow-auto py-4"
      >
        <div className=" w-[300px] md:w-[470px] py-[1.5rem] px-[2rem]  rounded-[1rem] bg-[#fff] ">
          <div className="flex justify-between items-center pb-[20px]">
            <div className="spacer"></div>
            <div className="flex gap-3">
              <svg
                width={73}
                height={24}
                viewBox="0 0 73 24"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                shapeRendering="geometricPrecision"
              >
                <defs>
                  <path id="a" d="M0 .541h46.39v23.065H0z" />
                  <path id="c" d="M.394.541h23.065v23.065H.394z" />
                </defs>
                <g fill="none" fillRule="evenodd">
                  <mask id="b" fill="#fff">
                    <use xlinkHref="#a" />
                  </mask>
                  <path
                    d="M34.793 17.816c-3.19 0-5.775-2.57-5.775-5.743 0-3.17 2.586-5.741 5.775-5.741 3.189 0 5.774 2.57 5.774 5.741 0 3.172-2.585 5.743-5.774 5.743m-23.195 0c-3.19 0-5.775-2.57-5.775-5.743 0-3.17 2.585-5.741 5.775-5.741 3.189 0 5.774 2.57 5.774 5.741 0 3.172-2.585 5.743-5.774 5.743m34.76-6.362c-.001-.032-.002-.065-.005-.097-.023-.378-.064-.749-.123-1.116-.004-.018-.005-.038-.009-.057-.063-.382-.145-.759-.246-1.128v-.002A11.582 11.582 0 0034.792.54H11.597C5.78.54.975 4.808.142 10.364l-.003.024c-.053.355-.088.714-.107 1.078-.001.02-.005.038-.006.058v.05c-.007.166-.025.33-.025.5 0 .209.02.413.032.62l.004.096c.024.377.065.75.124 1.117l.009.055c.908 5.469 5.672 9.644 11.429 9.644H46.39V12.074c0-.21-.02-.414-.031-.62"
                    fill="#7B7B82"
                    mask="url(#b)"
                  />
                  <g transform="translate(49)">
                    <mask id="d" fill="#fff">
                      <use xlinkHref="#c" />
                    </mask>
                    <path
                      d="M11.927 17.816a5.742 5.742 0 110-11.485 5.742 5.742 0 010 11.485m0-17.275C5.557.54.394 5.704.394 12.073v11.533h11.533c6.369 0 11.532-5.163 11.532-11.532C23.46 5.703 18.296.54 11.927.54"
                      fill="#1DA1F2"
                      mask="url(#d)"
                    />
                  </g>
                </g>
              </svg>
              <span className="uppercase font-bold tracking-wider text-[16px] md:text-[20px]">
                thangs
              </span>
            </div>
            <div>
              <button className="  uppercase   hover:transition-all  rounded text-[30px]">
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-[25px] md:text-[30px] "
                />
              </button>
            </div>
          </div>

          <span className="block text-center font-bold text-[18px] md:text-[25px] text-[#2C2C2E]  mt-[20px]  mb-[25px]  md:mt-[35px]  md:mb-[45px]">
            Join the fastest{" "}
            <span className="block text-center">growing 3D comunity</span>
          </span>
          <Button buttonItems={buttonItems} />
          <span className="block text-center py-[20px] md:py-[60px] text-[#000] font-bold text-[16px] md:text-[18px] md:text-[20px] pr-2">
            Already a member?
            <a href="/" className=" text-[#007BC7] font-semibold ">
              Sign in
            </a>
          </span>
          <p className=" text-center text-[#999999] text-[11px] md:text-[13px] font-[500]">
            Your privacy is most important to us.
            <br /> So here are our
            <a href="/" className="text-[#007BC7]">
              Privacy Policy
            </a>
            an
            <a href="/" className="text-[#007BC7]">
              Terms and <br /> Conditions
            </a>
            about how we protect your data.
          </p>
        </div>
      </div>
    </>
  );
}

export default Modal;
