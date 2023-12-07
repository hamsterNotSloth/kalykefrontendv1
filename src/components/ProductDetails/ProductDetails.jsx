import React, { useEffect } from 'react'
import { useGetproductQuery, useUserViewedProductMutation } from '../../redux/apiCalls/apiSlice'
import { useParams } from 'react-router-dom'
import ProductSlider from './ProductSlider'
import ProductDescription from './ProductDescription'
import ProductDetailsHeader from './ProductDetailsHeader'
import DownloadScreen from './DownloadScreen'
import { getToken } from '../../Token/token'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import NotFoundPage from '../../pages/NotFoundPage'

function ProductDetails() {
  const { id } = useParams()
  const { data: productDetails, isLoading, error, refetch } = useGetproductQuery(id)
  const [userViewedProduct] = useUserViewedProductMutation()
  const token = getToken()
  const userViewedProductHandler = async () => {
    try {
      await userViewedProduct({ id, token })
    } catch (err) {
      console.log(err)
    }
  }
  const fetchData = async () => {
    try {
      await refetch(id);
      userViewedProductHandler();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [id])
  if(error) return <NotFoundPage />
  if (isLoading) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  return (
    <div className='px-6 mx-30 mt-[30px] max-w-[1500px] mx-auto'>
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
