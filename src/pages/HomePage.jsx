import React from 'react'
import HomeComponent from '../components/Home/HomeComponent'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { useGetAllProductsQuery } from '../redux/apiCalls/apiSlice'
import { useSelector } from 'react-redux'

function HomePage() {
  const {isLoading, isError} = useGetAllProductsQuery({filter: "null", category: "null"})
  if(isError) return <div className='flex items-center justify-center h-[100vh] w-full'><span>Oops, something went wrong! We're working to fix this please be back later.</span></div>
  if (isLoading ) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  return (
    <div>
      <HomeComponent />
    </div>
  )
}

export default HomePage
