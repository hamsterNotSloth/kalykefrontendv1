import React, { useEffect, useState } from 'react'
import { useGetMyProfileQuery, useWishlistMutation } from '../../redux/apiCalls/apiSlice'
import { toast } from 'react-toastify'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faBookmark as faBookmarked} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WishlistBtn = ({ product, token, descriptionWishListHandler }) => {
  const [wishlist, { isLoading }] = useWishlistMutation()
  const { data: myProfileData } = useGetMyProfileQuery(token)
  const [isWishListToggle, setIsWishListToggle] = useState(product?.wishlist?.includes(myProfileData?.myProfile?.email || false))
  const wishlistHandler = async (e) => {
    e.preventDefault()
    if(myProfileData?.myProfile) {
      setIsWishListToggle(!isWishListToggle)
    }
    else {
      toast.error("Please login to wishlist")
    }
    const productId = product?._id
    try {
      const response = await wishlist({ productId, token })
      toast.success(response?.data?.message)
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    }
  }
  useEffect(() => {
    setIsWishListToggle(product?.wishlist?.includes(myProfileData?.myProfile?.email || false))
  }, [])
  return (
    <>
    {descriptionWishListHandler == false? 
    <button onClick={(e)=>{wishlistHandler(e)}} disabled={isLoading}  >{ isWishListToggle? <span className='flex gap-1'><FontAwesomeIcon icon={faBookmark} /></span>: <span className='flex gap-1'><FontAwesomeIcon className='stroke-[#000]  stroke-[1px]' icon={faBookmarked} /></span> } </button> : 
    <button onClick={(e)=>{wishlistHandler(e)}} disabled={isLoading} className='bg-[#2f85ff] mb-3 hover:bg-[#809ee2] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full' >{!isWishListToggle? <><FontAwesomeIcon className='text-white' icon={faBookmarked} /> Add to wishlist</> : <><FontAwesomeIcon className='text-[#white]' icon={faBookmark} /> Remove from wishlist</> } </button>
    }      
    </>
  )
}

export default WishlistBtn
