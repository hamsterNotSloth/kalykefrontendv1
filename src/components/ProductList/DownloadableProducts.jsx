import React, { useEffect } from 'react'
import { useGetDownloadableProductsListQuery } from '../../redux/apiCalls/apiSlice'
import { getToken } from '../../Token/token'
import ProductCard from '../Common/ProductCard'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import UnAuthorized from '../messages/UnAuthorized'

const DownloadableProducts = () => {
  const token = getToken()
  const { data: products, isLoading, isFetching } = useGetDownloadableProductsListQuery(token)
  if (isLoading || isFetching) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  if(!products) return <UnAuthorized />
  return (
    <div>
      <div className=' h-[100vh]  p-4 max-w-[1500px] mx-auto'>
        <span className="block pb-2 font-semibold text-[20px]">Download Products</span>
        {products?.products?.length > 0? <div className='flex gap-4 flex-wrap'>
          {products?.products?.map(item => {
            return <ProductCard key={`downloaded-products-${item._id}-${Math.random()} `} item={item} />
          })}
        </div> : "No downloaded Products"}
      </div>
    </div>
  )
}

export default DownloadableProducts