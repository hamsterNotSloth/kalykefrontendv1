import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function ProductCard({ item }) {
    return (
        <div className={'w-[250px] h-[300px]'}>
            <Link to={`/products/${item._id}`} > 
                <div className='h-[100%] w-[100%] rounded-md'>
                    <img src={item.images && item.images[0].downloadLink} className='h-[100%] object-cover rounded-md' alt="product image" />
                </div>
            </Link>
        </div>
    )
}

export default ProductCard
