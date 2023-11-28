import React from 'react'
import { useGetMyProfileQuery, useWishlistMutation } from '../../redux/apiCalls/apiSlice'
import { toast } from 'react-toastify'

const WishlistBtn = ({ product, token }) => {
  const [wishlist, { isLoading }] = useWishlistMutation()
  const { data: myProfileData } = useGetMyProfileQuery(token)
  
  const wishlistHandler = async () => {
    const productId = product?._id
    try {
      const response = await wishlist({ productId, token })
      console.log(response)
      toast.success(response?.data?.message)
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Something went wrong")
    }
  }
  return (
    <>
      <button onClick={wishlistHandler} disabled={isLoading} className='bg-[#2f85ff] mb-3 hover:bg-[#809ee2] text-white text-[21px] h-[46px] w-[100%] rounded-l-md  w-full' >{product?.wishlist?.includes(myProfileData?.myProfile?.email)? "Remove from wishlist": "Add to wishlist"} </button>
    </>
  )
}

export default WishlistBtn
