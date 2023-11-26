import React from 'react'
import { useGetSearchedProductsQuery } from '../redux/apiCalls/apiSlice'
import ProductCard from '../components/Common/ProductCard'
import { useSelector } from 'react-redux';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { useParams } from 'react-router-dom';

function SearchResultsPage() {
  const currentFilter = useSelector((state) => state.filtersSlice.searchBar);
  const {search} = useParams()

  const { data: searchedProducts, isLoading, isFetching, isError } = useGetSearchedProductsQuery(search)
  
  if (isError) return <div className='flex items-center justify-center h-[100vh] w-full'>Something went wrong</div>
  if (isLoading || isFetching) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  return (
    <>
      <div className='p-4 max-w-[1700px] mx-auto gap-3'>
        {searchedProducts?.products?.length > 0 && <span>Search - {search}</span>}
        {searchedProducts?.products?.length == 0 && <span>No models found!</span>}
        {searchedProducts?.products == null && <span>Search products by title!</span>}
        <div className='flex gap-4 flex-wrap'>
          {searchedProducts?.products?.map((item, index) => {
            return <ProductCard key={`SearchedProducts ${index} ${Math.random() * Date.now()}`} item={item} styling={`w-[200px] h-[200px]`} />
          })}
        </div>
      </div>
    </>
  )
}

export default SearchResultsPage
