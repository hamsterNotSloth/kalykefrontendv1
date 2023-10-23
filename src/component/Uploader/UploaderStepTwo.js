import React, { useEffect, useState } from 'react'
import { updateProductDetails } from '../../redux/slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';

function UploaderStepTwo({setCurrentLevel}) {
  const [details, setDetails] = useState({
    title: "",
    description: ""
  });
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product);

  const productDescriptionHandler = () => {
    dispatch(updateProductDetails({ ...productDetails, title: details.title, description: details.description}));
    if(details.title.length > 0 && details.description.length > 0){
      setCurrentLevel("3");
    }
  }

  return (
    <div>
      <div>
        <input type="text" placeholder='title' className='w-[100%] px-2 h-[40px] border-[2px] border-[#c1b9b9] rounded-sm' onChange={(e) => setDetails({ ...details, title: e.target.value })}/>
      </div>
      <div>
        <input type="text" placeholder='description' className='w-[100%] mt-2 h-[40px] px-2 border-[2px] border-[#c1b9b9] rounded-sm' onChange={(e) => setDetails({ ...details, description: e.target.value })}/>
      </div>
      <button onClick={productDescriptionHandler} className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
    </div>
  )
}

export default UploaderStepTwo
