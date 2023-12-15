import React, {  useRef } from 'react'
import Followbtn from "../../Common/FollowBtn"
import { Link } from "react-router-dom"
import SocialMediaRow from '../../Common/SocialMediaRow';
import { socialMedia } from './socialMedia';
import { toast } from 'react-toastify';

const frontendUrl = process.env.REACT_APP_FRONTEND_URL;

function BannerSlide({ item }) {
  const profileShareRef = useRef(item?.u_id);
  const copyToClipboard = () => {
    if (profileShareRef.current) {
      profileShareRef.current.value = `${frontendUrl}/user/${item?.u_id}`;
      profileShareRef.current.select();
      document.execCommand('copy');
      toast.success('Copied to clipboard');
      profileShareRef.current.value = '';
    }
  };
  return (
    <div className={`bg-[#fff]  flex-row h-[400px] justify-between rounded-lg md:pl-[80px] overflow-x-hideen flex `} >
      <div className='max-w-[760px] flex  flex-col justify-center'>
        <div>
          {
            item?.promo == 'model' ?
              <div className='pr-5'>
                <span className='block text-[16px] font-semibold'>Featured Product</span>
                <Link to={`/products/${item?.productId}`} className='flex flex-col'>
                  <h4 className='text-[#000] text-[30px] w-[100%] font-bold'>{item?.productName}</h4>
                  <h4 className='text-[18px] text-[#000] font-semibold'>{'$' + item?.price || "free"}</h4>
                </Link>
                <div className='max-w-[900px] w-[100%] mt-3' dangerouslySetInnerHTML={{ __html: item?.description }} />
                <ul className='flex items-end gap-2'>
                  <textarea
                    ref={profileShareRef}
                    readOnly
                    style={{ position: 'absolute', left: '-9999px' }}
                  />
                  <span className='text-[12px]'>Share on</span>
                  {socialMedia.map(item => {
                    return <SocialMediaRow key={`social-media-share-banner-${Math.random()}-${Date.now()}`} item={item} copyToClipboard={copyToClipboard} />
                  })}
                </ul>
                <Link className='flex justify-center items-center mt-4 bg-[#2f85ff] hover:bg-[#5487ff] text-white text-[16px] rounded-md w-[120px] h-[30px]' to={`/products/${item?.productId}`}>View model</Link>
              </div>
              :
              <div className='max-w-[324px]'>
                <span className='block text-[16px] font-semibold'>Featured Designer</span>
                <Link to={`/user/${item?.u_id}`} className='flex gap-2 mb-3 items-center'>
                  <div className='w-[60px] h-[60px]'>
                    <img src={item.userImage} className='rounded-full h-full' alt="Profile image" />
                  </div>
                  <h4 to={`/user/${item?.u_id}`} className='text-[18px] text-[#0026ff] font-semibold'>{item?.displayName}</h4>
                </Link>
                
                {item?.createdAt && <span className='block mb-2'>Member Since {item?.createdAt}</span>} 
                <div className='max-w-[900px] w-[100%]' dangerouslySetInnerHTML={{ __html: item?.description }} />
                <ul className='flex items-end gap-2'>
                  <textarea
                    ref={profileShareRef}
                    readOnly
                    style={{ position: 'absolute', left: '-9999px' }}
                  />
                  <span className='text-[12px]'>Share on</span>
                  {socialMedia.map(item => {
                    return <SocialMediaRow key={`social-media-share-banner-${Math.random()}-${Date.now()}`} item={item} copyToClipboard={copyToClipboard} />
                  })}
                </ul>
                <div className='py-3'>
                  <Followbtn productDetails={item} style={'rounded-xl bg-[#2f85ff] hover:bg-[#5487ff] rounded-md text-white shadow px-4 py-1'} />
                </div>
              </div>
          }
        </div>
      </div>
      <div className='max-w-[700px] w-full'>
        <img className='w-[100%] h-[100%] rounded-r-md' src={item?.bannerImage} alt="" />
      </div>
    </div>
  )
}

export default BannerSlide
