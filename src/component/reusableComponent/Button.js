import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Button({ buttonItems }) {
  return (
    <>
      {buttonItems.map((item, index) => (
        <button onClick={() => item.func()}
          key={index}
          className=" flex justify-center items-center py-[8px] w-full border border-[#000] mb-[20px] rounded-lg cursor-pointer"
        >
          <img
            src={item.icon}
            className="mr-[10px] text-[14px] md:text-[16px]"
          />
          <span className="text-[#2C2C2E]  text-[14px] md:text-[18px] font-semibold">
            {item.text}
          </span>
        </button>
      ))}
    </>
  );
}

export default Button;
