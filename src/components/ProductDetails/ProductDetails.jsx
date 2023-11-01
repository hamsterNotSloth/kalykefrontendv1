import React, { useEffect } from 'react'
import { useGetproductQuery } from '../../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'
import ProductSlider from './ProductSlider'
import ProductDescription from './ProductDescription'
import ProductDetailsHeader from './ProductDetailsHeader'
import DownloadScreen from './DownloadScreen'

function ProductDetails() {
  const { id } = useParams()
  const { data: productDetails, refetch } = useGetproductQuery(id)

  useEffect(() => {
    refetch(id)
  }, [id])

  return (
    <div className='px-6 mx-30 mt-[30px] max-w-[1800px] mx-auto'>
      <ProductDetailsHeader productDetails={productDetails} />
      <ProductSlider productDetails={productDetails} />
      <div className='flex justify-between mt-5'>
        <ProductDescription productDetails={productDetails} />
        <DownloadScreen productDetails={productDetails} />
      </div>
    </div>
  )
}

export default ProductDetails
