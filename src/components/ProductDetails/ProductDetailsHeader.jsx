import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

function ProductDetailsHeader({ productDetails }) {
   
    return (
        <div className='flex mb-10 h-[46px] gap-2'>
            <div>
                <img className='h-full rounded-full object-contain' src={productDetails && productDetails.user.profilePicture} alt={productDetails && productDetails.product.title} />
            </div>
            <div className='flex flex-col '>
                <h1 className='text-[24px] leading-6 font-semibold'>{productDetails && productDetails.product.title}</h1>
                <span>By <Link to={`/user/${productDetails && productDetails.user && productDetails.user.u_id}`} className='text-[#0067ff] font-semibold'>{productDetails && productDetails.user.userName}</Link></span>
            </div>
        </div>
    )
}

export default ProductDetailsHeader
