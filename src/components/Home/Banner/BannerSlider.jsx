import React from 'react'
import BannerSlide from './BannerSlide'
import Slider from "react-slick";
import { useGetPromotedUsersQuery } from '../../../redux/apiCalls/apiSlice';

function BannerSlider() {
  const {data: promotedUsers, isLoading} = useGetPromotedUsersQuery()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      if(isLoading) return <div className='h-full min-h-[400px]'>Loading!!!</div>

  return (
      <div className='max-w-[2040px] pl-[30px] pr-[60px] mx-auto'>
        <Slider {...settings}>
       {promotedUsers?.promotedUsers?.map(item => {
        return <BannerSlide key={`Bannerslider promotions ${Math.random() * Date.now()}`} item={item}/>
       })}
        </Slider>
      </div>
  )
}

export default BannerSlider
