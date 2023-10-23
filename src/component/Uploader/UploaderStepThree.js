import React from 'react'
import { Token } from '../../customHooks/token';
import { useUploadProductMutation } from '../../redux/apiCalls/productApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function UploaderStepThree() {
  const [uploadProduct] = useUploadProductMutation()
  const token = Token()
  const productDetails = useSelector((state) => state.product);
  const productUploadHandler = async () => {
    try {
      const response = await uploadProduct({productDetails, token})
      if(response) {
        toast.success(response.data.message)
      }
      console.log(response)
    } catch(err) {
      console.log(err)
      toast.error(err)
    }
  };
  return (
    <div className='flex justify-center'>
      <button onClick={productUploadHandler} className="bg-blue-500 mt-3 text-white px-4 py-2 rounded hover:bg-blue-600">Upload Product</button>
    </div>
  )
}

export default UploaderStepThree
