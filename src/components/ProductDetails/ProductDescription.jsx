import React, { useEffect, useState } from 'react'
import { useGetSimilarProductsQuery } from '../../redux/apiCalls/apiSlice'
import ProductCard from '../Common/ProductCard';
import Comments from './Comments';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import YouTube from 'react-youtube';

function ProductDescription({ productDetails }) {
  const tagsString = productDetails && productDetails.product && productDetails.product.tags.join(',');
  const { data: similarProducts, refetch: getSimilarProducts } = useGetSimilarProductsQuery({ tags: tagsString, created_by: productDetails && productDetails.product && productDetails.product.created_by })
  const [videoId, setVideoId] = useState(null);
  const getYoutubeVideoId = (url) => {
    if(url == null) {
      return
    }
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return setVideoId(match ? match[1] : null);
  };
  const removeHtmlTags = (htmlString) => {
    const regex = /(<([^>]+)>)/gi;
    return htmlString.replace(regex, '');
  };
  const hasSameId = (arr, propertyName) => {
    if (arr.length <= 1) {
      return false;
    }

    const referenceId = arr[0][propertyName];
    return arr.every((obj) => obj.hasOwnProperty(propertyName) && obj[propertyName] === referenceId);
  };
  const uniqueProductIds = new Set();

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };
  const cleanDescription = productDetails?.product?.description ? removeHtmlTags(productDetails?.product?.description) : '';
  useEffect(() => {
    getSimilarProducts({ tags: productDetails && productDetails.product && productDetails.product.tags, created_by: productDetails && productDetails.product && productDetails.product.created_by })
    getYoutubeVideoId(productDetails?.product?.youtubeURL)
  }, [productDetails])
  return (
    <div className='max-w-[1135px] w-full pr-[63px]'>
      <Helmet>
        <title>{`Kalyke - ${productDetails?.product?.title}`}</title>
        <meta name="description" content={cleanDescription} />
        <meta property="og:title" content={productDetails?.product?.title} />
        <meta property="og:description" content={cleanDescription} />
      </Helmet>
      <div>
        <h4 className='text-[21px] font-semibold'>Description</h4>
        <div className='max-w-[900px] w-[100%]' dangerouslySetInnerHTML={{ __html: productDetails && productDetails.product?.description }} />
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Model Settings</h4>
        <div className='max-w-[900px] w-[100%]' dangerouslySetInnerHTML={{ __html: productDetails?.product?.modalSetting }} />
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Category</h4>
        <span>{productDetails && productDetails.product?.category ? productDetails.product?.category : "This model has no category selected"}</span>
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>Tags</h4>
        <span>{productDetails && productDetails.product?.tags ?
          <span className='mt-3 flex gap-2'>{productDetails.product?.tags.map(item => <span key={`productDesc tags ${Math.random() * Date.now()}`} className='bg-[#e3e3e3] px-2 rounded-md'>{item}</span>
          )}</span>
          : "This model has no category selected"}</span>
      </div>
      <div className='mt-5'>
        <h4 className='text-[21px] font-semibold'>License</h4>
        <Link className='block text-[18px] text-[#0707ff] mt-2' to='/licencepolicy' target='_blank'>{productDetails?.product?.license}</Link>
      </div>
      {productDetails?.product?.youtubeURL?.length > 0 &&
        <div className="mt-5">
        <h4 className='text-[21px] font-semibold'>Video</h4>
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={(event) => {
              event.target.pauseVideo();
            }}
          />
        </div>
      }
      {similarProducts?.similarProducts.length > 1 && !hasSameId(similarProducts?.similarProducts, '_id') &&
        <div className='mt-5'>
          <h4 className='text-[21px] font-semibold'>Similar Products</h4>
          <div>
            {similarProducts && similarProducts?.similarProducts ? (
              <div className='flex flex-wrap gap-5'>
                {similarProducts?.similarProducts?.map((product) => {
                  if (product._id !== productDetails?.product?._id && !uniqueProductIds.has(product._id)) {
                    uniqueProductIds.add(product._id);
                    return (
                      <ProductCard
                        key={`similarProducts at Description ${Math.random() * Math.random()}`}
                        item={product}
                        styling={"w-[130px] h-[150px]"}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            ) : (
              <span>No Similar Products</span>
            )}
          </div>
        </div>
      }
      {similarProducts?.productsFromSameUser?.length > 1 &&
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
      }
      <Comments productDetails={productDetails} />
    </div>
  )
}

export default ProductDescription
