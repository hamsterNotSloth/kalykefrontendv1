import { faArrowDown, faArrowRight, faEye, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import WishlistBtn from './WishlistBtn'
import { getToken } from '../../Token/token'

function ProductCard({ item, deletePermission, productDeleteHandler }) {
    const token = getToken()
    return (
        <div className="w-[250px] bg-white block h-[325px] rounded overflow-hidden shadow-lg">
            <Link to={`/products/${item?._id}`} className='h-[240px] block'>
                <img className="w-full object-cover h-full" src={item?.images[0]?.downloadLink} alt="model" />
            </Link>
            <div className='px-6 pt-2 pb-1 flex justify-between items-center'>
            <div>
                <Link to={`http://localhost:3000/user/${item?.u_id}`} as="div" className="inline-block w-[30px] h-[30px] flex items-center gap-1"><img src={item?.profileImg} className='rounded-full' alt="profile" /> <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div>
                <span className="font-bold block text-[18px]">{item?.free ? "Free" : `$${item?.price}`}</span>
            </div>
            </div>
            <div className='flex justify-between px-6 items-center'>
                {deletePermission && <button onClick={(e) => { e.preventDefault();productDeleteHandler(item?._id) }}><FontAwesomeIcon icon={faTrashCan} /></button>}
                <span className='flex gap-1 items-center'><FontAwesomeIcon icon={faArrowDown} /> {item?.purchaseHistory?.length || 0}</span>
                <span className='flex gap-1 items-center'><FontAwesomeIcon icon={faEye} />{item?.userViews?.length || 0}</span>
                <span className='flex items-center'><WishlistBtn descriptionWishListHandler={false} token={token} product={item} /></span>
                <span className='text-[#4d8802] text-[16px]'><FontAwesomeIcon icon={faStar} />{item?.avgRating || 0}</span>
            </div>
        </div>
    )
}

export default ProductCard
