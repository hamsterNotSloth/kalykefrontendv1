import React from 'react'

function ProductDescription({ productDetails }) {
  return (
    <div className='p-3 pl-[80px]'>
      <div>
        <h4 className='text-[21px] font-semibold'>Description</h4>
        <div className='max-w-[900px] w-[100%]' dangerouslySetInnerHTML={{ __html: productDetails && productDetails.product.description }} />
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Category</h4>
        <span>{productDetails && productDetails.product.category ? productDetails.product.category : "This modal has no category selected"}</span>
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Modal Settings</h4>
        <span>{productDetails && productDetails.product.setting ? productDetails.product.setting : "This modal has no setting"}</span>
      </div>
    </div>
  )
}

export default ProductDescription
