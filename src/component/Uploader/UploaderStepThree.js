import React from 'react'
import { Token } from '../../customHooks/token';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useUploadProductMutation } from '../../redux/apiCalls/apiSlice';

function UploaderStepThree() {
  const [uploadProduct, {isLoading}] = useUploadProductMutation()
  const token = Token()
  const productDetails = useSelector((state) => state.product);
  const productUploadHandler = async () => {
    try {
      const response = await uploadProduct({productDetails, token})
      if(response) {
        toast.success(response.data.message)
      }
    } catch(err) {
      toast.error(err)
    }
  };
  return (
    <div className='flex justify-center'>
      <button disabled={isLoading} onClick={productUploadHandler} className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">{isLoading? "Processing..." : "Upload Product"} </button>
    </div>
  )
}

export default UploaderStepThree
