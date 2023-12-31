import React, { useEffect } from 'react'
import { useGetAllProductsQuery } from '../../../redux/apiCalls/apiSlice'
import ProductCard from '../../Common/ProductCard'
import { useSelector } from 'react-redux'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

function Products() {
  const { filter, category, isFree, fileType } = useSelector(state => state.filtersSlice)
  const { data: productsData, refetch: getAllProducts, isError, isFetching, isLoading } = useGetAllProductsQuery({filter, category, isFree, fileType})
  useEffect(() => {
    getAllProducts({filter,  category, isFree, fileType})
  }, [filter, category, isFree, fileType])
  if (isError) return <div className='w-full h-[100vh] flex justify-center items-center'><span>Something Went Wrong...</span></div>
  if (isLoading || isFetching) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  return (
    <div className='flex gap-4 flex-wrap pb-[80px] p-4 justify-center max-w-[1500px] mx-auto'>
      {productsData?.allProducts?.length <= 0? <span>No Available Products!</span> : null}
      {productsData?.allProducts?.map(item => {
        return <ProductCard item={item} key={`Products on homepage ${item} ${Math.random() * Date.now()}`} styling={"w-[200px] h-[200px]"} />
      })}
    </div>
  )
}

export default Products
