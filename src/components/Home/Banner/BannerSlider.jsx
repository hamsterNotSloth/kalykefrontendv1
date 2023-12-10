import React from 'react'
import BannerSlide from './BannerSlide'
import Slider from "react-slick";
import { useGetPromotedContentQuery, useGetPromotedUsersQuery } from '../../../redux/apiCalls/apiSlice';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

function BannerSlider() {
  const { data: promotionData, isLoading } = useGetPromotedContentQuery()
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  if (isLoading) return <div className='flex items-center justify-center h-[100vh] w-full'><ClimbingBoxLoader color={"#000"} size={20} aria-label="Loading Spinner" data-testid="loader" /></div>
  return (
    <div className='max-w-[1500px] pl-[30px] pr-[60px] mx-auto'>
      <Slider {...settings}>
        {promotionData?.map(item => {
          return <BannerSlide key={`Bannerslider promotions ${Math.random() * Date.now()}`} item={item} />
        })}
      </Slider>
    </div>
  )
}

export default BannerSlider
