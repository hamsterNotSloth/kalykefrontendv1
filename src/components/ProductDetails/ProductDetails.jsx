import React, { useEffect } from 'react'
import { useGetproductQuery } from '../../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'
import ProductSlider from './ProductSlider'
import ProductDescription from './ProductDescription'
import ProductDetailsHeader from './ProductDetailsHeader'
import DownloadScreen from './DownloadScreen'

function ProductDetails() {
  const { id } = useParams()
  const { data: productDetails, isLoading, refetch } = useGetproductQuery(id)

  useEffect(() => {
    refetch(id)
  }, [id])
  if(isLoading) return <div className='flex items-center justify-center w-full h-[100vh]'><span>Loading...</span></div>
  return (
    <div className='px-6 mx-30 mt-[30px] max-w-[1800px] mx-auto'>
      <ProductDetailsHeader productDetails={productDetails} />
      <ProductSlider productDetails={productDetails} />
      <div className='flex justify-center xl:justify-between flex-col xl:flex-row mt-5 p-3'>
        <ProductDescription productDetails={productDetails} />
        <DownloadScreen productDetails={productDetails} />
      </div>
    </div>
  )
}

export default ProductDetails
