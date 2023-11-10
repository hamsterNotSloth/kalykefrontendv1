import React from 'react'
import { useGetAllProductsQuery } from '../../../redux/apiCalls/apiSlice'
import ProductCard from '../../ReUsableComponent/ProductCard'
import { useSelector } from 'react-redux'

function Products() {
  const currentFilter = useSelector(state => state.filtersSlice)
    const {data: productsData, isError, isFetching} = useGetAllProductsQuery(currentFilter)
    if(isError) return <div className='w-full h-[100vh] flex justify-center items-center'><span>Something Went Wrong...</span></div>
    if(isFetching) return <div className='w-full h-[100vh] flex justify-center items-center'><span>Fetching...</span></div>
    return (
      <div className='flex gap-4 flex-wrap p-4 max-w-[1700px] mx-auto'>
        {productsData?.allProducts?.map(item => {
          return <ProductCard item={item} styling={"w-[200px] h-[200px]"}/>
        })}
      </div>
    )
}

export default Products
