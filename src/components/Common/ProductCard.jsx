import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useUserViewedProductMutation } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'

function ProductCard({ item, styling }) {
    return (
        <div className={styling}>
            <Link to={`/products/${item._id}`} > 
                <div className='h-[100%] w-[100%] rounded-md'>
                    <img src={item.images && item.images[0].downloadLink} className='h-[100%] object-cover rounded-md' alt="product image" />
                </div>
            </Link>
        </div>
    )
}

export default ProductCard
