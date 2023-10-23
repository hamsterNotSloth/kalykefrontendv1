import React from "react";
import Button from "../reusableComponent/Button";
import Conditions from "./Conditions";

function MainModal({ buttonItems, goToLoginHandler }) {
  return (
    <div>
      <span className="block text-center font-bold text-[18px] md:text-[25px] text-[#2C2C2E]  mt-[20px]  mb-[25px]  md:mt-[35px]  md:mb-[45px]">
        Join the fastest{" "}
        <span className="block text-center">growing 3D comunity</span>
      </span>
      <Button buttonItems={buttonItems} />
      <Conditions goToLoginHandler={goToLoginHandler} />
    </div>
  );
}

export default MainModal;