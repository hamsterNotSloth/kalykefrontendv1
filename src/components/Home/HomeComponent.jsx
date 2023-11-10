import React from 'react'
import { useGetAllProductsQuery } from '../../redux/apiCalls/apiSlice'
import ProductCard from '../ReUsableComponent/ProductCard'
import Products from './Products/Products'
import Banner from './Banner/Banner'
import Filter from './Filter/Filter'

function HomeComponent() {
  const {isLoading} = useGetAllProductsQuery()
  if(isLoading) return <div className='w-full h-[100vh] flex justify-center items-center'><span>Loading...</span></div>
  return (
    <>
    <Banner />
    <Filter />
    <Products />
    </>
  )
}

export default HomeComponent
