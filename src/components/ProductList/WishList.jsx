import React from 'react'
import { getToken } from '../../Token/token'
import { useGetWishListItemsQuery } from '../../redux/apiCalls/apiSlice'
import ProductCard from '../Common/ProductCard'

const WishList = () => {
  const token = getToken()
  const { data: wishListItems } = useGetWishListItemsQuery(token)
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
