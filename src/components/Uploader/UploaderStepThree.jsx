import React from 'react'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadProductMutation } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { resetProductDetails, updateProductDetails } from '../../redux/slices/productSlice';

function UploaderStepThree({ setCurrentLevel }) {
  const [uploadProduct, { isLoading }] = useUploadProductMutation()
  const token = getToken()
  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.product);
  const productUploadHandler = async () => {
    try {
      const response = await uploadProduct({ productDetails, token })
      if (response) {
        toast.success(response.data.message)
         dispatch(resetProductDetails())
      }
    } catch (err) {
      toast.error(err)
    }
  };
  return (
    <div className='flex justify-center'>
      <button disabled={isLoading} onClick={productUploadHandler} className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">{isLoading ? "Processing..." : "Upload Product"} </button>
    </div>
  )
}

export default UploaderStepThree
