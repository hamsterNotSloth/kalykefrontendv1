import React, { useEffect } from 'react'
import { useGetPromotedContentQuery, useGetPromotedUsersQuery } from '../../../redux/apiCalls/apiSlice';
import Followbtn from "../../Common/FollowBtn"
import { Link } from "react-router-dom"

function BannerSlide({ item }) {
  return (
    <div className={`bg-[#fff]  flex-row h-[400px] justify-between rounded-lg md:pl-[80px] overflow-x-hideen flex `} >
      <div className='max-w-[700px] flex  flex-col justify-center'>
        <div className='mb-6'>
          <h1 className='text-[34px] font-bold'>Kalyke - The best marketplace for designers, by designers</h1>
          <span className='text-[20px] text-[#848484] font-bold pb-10'>Get the best deals</span>
        </div>
        <div>
          {
            item?.promo == 'model' ?
              <div className='max-w-[324px]'>
                <Link to={`/user/${item?.u_id}`} className='flex gap-2 items-center'>
                  <div className='w-[60px] h-[60px]'>
                    <img src={item.userPicture} className='rounded-full' alt="Profile image" />
                  </div>
                  <h4 to={`/user/${item?.u_id}`} className='text-[18px] text-[#0026ff] font-semibold'>{item?.userName}</h4>
                </Link>
                <div className='max-w-[900px] w-[100%] mt-3' dangerouslySetInnerHTML={{ __html: item?.description }} />
                <div className='py-3'>
                  <Followbtn productDetails={item} style={'rounded-xl hover:bg-[#e8e8e8] shadow px-4 py-1'} />
                </div>
              </div>
              :
              <div className='max-w-[324px]'>
                <Link to={`/user/${item?.u_id}`} className='flex gap-2 items-center'>
                  <div className='w-[60px] h-[60px]'>
                    <img src={item.userPicture} className='rounded-full' alt="Profile image" />
                  </div>
                  <h4 to={`/user/${item?.u_id}`} className='text-[18px] text-[#0026ff] font-semibold'>{item?.userName}</h4>
                </Link>
                <div className='max-w-[900px] w-[100%] mt-3' dangerouslySetInnerHTML={{ __html: item?.description }} />
                <div className='py-3'>
                  <Followbtn productDetails={item} style={'rounded-xl hover:bg-[#e8e8e8] shadow px-4 py-1'} />
                </div>
              </div>
          }
        </div>
      </div>
      <div className='max-w-[565px] w-full'>
        <img className='w-[100%] h-[100%] rounded-r-md' src={item?.modelPic} alt="" />
      </div>
    </div>
  )
}

export default BannerSlide
