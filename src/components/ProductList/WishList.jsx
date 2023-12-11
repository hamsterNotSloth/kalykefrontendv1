import React from 'react'
import { getToken } from '../../Token/token'
import { useGetWishListItemsQuery } from '../../redux/apiCalls/apiSlice'
import ProductCard from '../Common/ProductCard'
import UnAuthorized from '../messages/UnAuthorized'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

const WishList = () => {
  const token = getToken()
  const { data: wishListItems, isLoading } = useGetWishListItemsQuery(token)
  if (isLoading ) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  if(!wishListItems) return <UnAuthorized />
  return (
    <div className=' h-[100vh]  p-4 max-w-[1500px] mx-auto'>
      <span className="block pb-2 font-semibold text-[20px]">Wishlisted Items</span>
      {wishListItems?.products?.length > 0 ? <div className='flex gap-4 flex-wrap'>
        {wishListItems?.products?.map(item => {
          return <ProductCard key={`productCardWishList-${Math.random() * 0.212 + Date.now()}-`} item={item} />
        })}
      </div> : "No wishlisted Items"}
    </div>
  )
}

export default WishList
