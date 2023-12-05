import React from 'react'
import { useGetMyProfileQuery, useWishlistMutation } from '../../redux/apiCalls/apiSlice'
import { toast } from 'react-toastify'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const WishlistBtn = ({ product, token, descriptionWishListHandler }) => {
  const [wishlist, { isLoading }] = useWishlistMutation()
  const { data: myProfileData } = useGetMyProfileQuery(token)
  
  const wishlistHandler = async (e) => {
    e.preventDefault()
    const productId = product?._id
    try {
      const response = await wishlist({ productId, token })
      toast.success(response?.data?.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Something went wrong")
    }
  }
  return (
    <>
    {descriptionWishListHandler == false? 
    <button onClick={(e)=>{wishlistHandler(e)}} disabled={isLoading}  >{product?.wishlist?.includes(myProfileData?.myProfile?.email)? <span className='flex gap-1'><FontAwesomeIcon icon={faBookmark} /><span className='text-[10px]'>unbookmark</span></span>: <span className='flex gap-1'><FontAwesomeIcon icon={faBookmark} /><span className='text-[10px]'>Bookmark</span></span> } </button> : 
    <button onClick={(e)=>{wishlistHandler(e)}} disabled={isLoading} className='bg-[#2f85ff] mb-3 hover:bg-[#809ee2] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full' >{product?.wishlist?.includes(myProfileData?.myProfile?.email)? <><FontAwesomeIcon className='text-[#000] pb-2' icon={faBookmark} /> Remove from wishlist</>: <><FontAwesomeIcon icon={faBookmark} /> Add to wishlist</>} </button>
    }      
    </>
  )
}

export default WishlistBtn
