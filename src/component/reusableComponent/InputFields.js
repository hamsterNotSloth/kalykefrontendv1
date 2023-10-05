import React from "react";

function InputFields(props) {
  return (
    <>
      <div>
        <label className="pb-[5px] font-semibold text-[18px] block">
          {props.label}
        </label>
        <input
          className="py-[8px] w-full border border-[rgba(83, 83, 110, 0.25)] mb-[17px] rounded-lg focus:outline-none focus:border-blue-500 px-[10px]  "
          {...props}
        />
      </div>
    </>
  );
}

export default InputFields;