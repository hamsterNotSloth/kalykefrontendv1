import React, { useEffect } from 'react'
import Filter from '../components/Home/Filter/Filter'
import { useSelector } from 'react-redux';
import Products from '../components/Home/Products/Products';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { useGetAllProductsQuery } from '../redux/apiCalls/apiSlice';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/Common/ProductCard';
import Category from '../components/Category/Category';

function CategoryPage() {
  const { category } = useParams()
  return (
    <div className=' max-w-[1700px] mx-auto'>
      <span className='block px-4 text-[20px] font-semibold'>Category - {category}</span>
      {/* <Filter /> */}
      <Category />
    </div>
  )
}

export default CategoryPage
