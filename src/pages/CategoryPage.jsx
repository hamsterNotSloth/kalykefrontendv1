import React from 'react'
import { useParams } from 'react-router-dom';
import Category from '../components/Category/Category';

function CategoryPage() {
  const { category } = useParams()
  return (
    <div className=' max-w-[1700px] mx-auto'>
      <span className='block px-4 text-[20px] font-semibold'>Category - {category}</span>
      <Category />
    </div>
  )
}

export default CategoryPage
