import React, { useEffect } from 'react'
import { useGetSimilarProductsQuery } from '../../redux/apiCalls/apiSlice'
import ProductCard from '../Common/ProductCard';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';

function ProductDescription({ productDetails }) {
  const tagsString = productDetails && productDetails.product && productDetails.product.tags.join(',');
  const { data: similarProducts, refetch: getSimilarProducts } = useGetSimilarProductsQuery({ tags: tagsString, created_by: productDetails && productDetails.product && productDetails.product.created_by })
 
  useEffect(() => {
    getSimilarProducts({ tags: productDetails && productDetails.product && productDetails.product.tags, created_by: productDetails && productDetails.product && productDetails.product.created_by })
  }, [productDetails])
  
  return (
    <div className='max-w-[1135px]'>
      <div>
        <h4 className='text-[21px] font-semibold'>Description</h4>
        <div className='max-w-[900px] w-[100%]' dangerouslySetInnerHTML={{ __html: productDetails && productDetails.product?.description }} />
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Category</h4>
        <span>{productDetails && productDetails.product?.category ? productDetails.product?.category : "This model has no category selected"}</span>
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Tags</h4>
        <span>{productDetails && productDetails.product?.tags ? <span className='mt-3 flex gap-2'>{productDetails.product?.tags.map(item => <span key={`productDesc tags ${Math.random() * Date.now()}`} className='bg-[#e3e3e3] px-2 rounded-md'>{item}</span>)}</span> : "This model has no category selected"}</span>
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Model Settings</h4>
        <span>{productDetails && productDetails.product?.modalSetting ? productDetails.product?.modalSetting : "This model has no setting"}</span>
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Similar Products</h4>
        <div>{similarProducts && similarProducts?.similarProducts?.length > 1 ? (
          <div className='flex flex-wrap gap-5'>
            {similarProducts?.similarProducts?.map((product) => (
              product._id != productDetails?.product?._id ? (
                <ProductCard
                  key={`similarProducts at Description ${Math.random() * Math.random()}`}
                  item={product}
                  styling={"w-[130px] h-[150px]"}
                />
              ) : null
            ))}
          </div>
        ) : (
          <span>No Similar Products</span>
        )}
        </div>
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Products from the same designer</h4>
        <div>
          {similarProducts && similarProducts.productsFromSameUser ? (
            <div className='flex flex-wrap gap-5'>
              {similarProducts?.productsFromSameUser?.map((product) =>
                product._id != productDetails?.product?._id ? (
                  <ProductCard
                    key={`SameUserProducts at Description ${Math.random() * Math.random()}`}
                    item={product}
                    styling={"w-[130px] h-[150px]"}
                  />
                ) : null
              )}
            </div>
          ) : (
            <span>No more Products from this designer</span>
          )}
        </div>
      </div>
      <Comments productDetails={productDetails} />
    </div>
  )
}

export default ProductDescription
