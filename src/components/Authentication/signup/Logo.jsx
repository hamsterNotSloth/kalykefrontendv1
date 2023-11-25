import React from "react";
import { faTimes, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CompanyLogo from "../../Common/Logo";
function Logo({ showSignUpContent, signContentHandler, setSignUpModalStatus }) {
  return (
    <>
      <div className="flex justify-between items-center pb-[20px]">
        {showSignUpContent ? (
          <button className="  uppercase   hover:transition-all  rounded text-[30px]">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-[20px] md:text-[20px] "
              onClick={(signContentHandler)}
            />
          </button>
        ) : (
          <div className="spacer"></div>
        )}
        <div className="flex gap-3 pt-3">
          <CompanyLogo />
        </div>
        <div>
          <button onClick={() => {setSignUpModalStatus(false)}} className="  uppercase   hover:transition-all  rounded text-[30px]">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-[25px] md:text-[25px] "
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Logo;
