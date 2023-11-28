import React from 'react'
import { getToken } from '../../Token/token'
import { useGetWishListItemsQuery } from '../../redux/apiCalls/apiSlice'
import ProductCard from '../Common/ProductCard'

const WishList = () => {
  const token = getToken()
  const {data: wishListItems} = useGetWishListItemsQuery(token)
  return (
    <div className='flex h-[100vh] gap-4 flex-wrap p-4 max-w-[1700px] mx-auto'>
      {wishListItems?.products?.map(item => {
        return <ProductCard item={item} />
      })}
    </div>
  )
}

export default WishList
