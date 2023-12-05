import { faArrowDown, faArrowRight, faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import WishlistBtn from './WishlistBtn'
import { getToken } from '../../Token/token'

function ProductCard({ item, deletePermission, productDeleteHandler }) {
    const token = getToken()
    return (
        <Link to={`/products/${item?._id}`} className="w-[250px] bg-white block h-[370px] rounded overflow-hidden shadow-lg">
            <div className='h-[240px]'>
                <img className="w-full object-cover h-full" src={item?.images[0]?.downloadLink} alt="Sunset in the mountains" />
            </div>
            <div className="px-6 pt-2">
                <span className="font-bold block text-xl">{item?.free ? "Free" : `$${item?.price}`}</span>
            </div>
            <div className="px-6 pt-2 pb-2">
                <Link to={`http://localhost:3000/user/${item?.u_id}`} as="div" className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">User profile <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className='flex gap-6 px-6 items-center'>
                {deletePermission && <button onClick={(e) => { e.preventDefault();productDeleteHandler(item?._id) }}><FontAwesomeIcon icon={faTrashCan} /></button>}
                <span className='flex gap-1 items-center'><FontAwesomeIcon icon={faArrowDown} /> {item?.purchaseHistory?.length || 0}</span>
                <span className='flex gap-1 items-center'><FontAwesomeIcon icon={faEye} />{item?.userViews?.length || 0}</span>
                <span><WishlistBtn descriptionWishListHandler={false} token={token} product={item} /></span>
            </div>
        </Link>
    )
}

export default ProductCard
