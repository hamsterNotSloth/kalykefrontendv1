import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFollowMutation, useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import Followbtn from '../ReUsableComponent/FollowBtn';

function DownloadScreen({ productDetails }) {

  const token = getToken()
  const downloadLink = productDetails?.product.modal[0].downloadLink;
  const downloadTitle = productDetails?.product.title;

  const get_url_extension = (url) => {
    return downloadLink.split(/[#?]/)[0].split('.').pop().trim();
  }

  const downloadImageHandler = () => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      if (xhr.status === 200) {
        let blob = xhr.response;
        let file = new File([blob], `${downloadTitle}.${get_url_extension()}`, { type: blob.type });
        let a1 = document.createElement('a');
        a1.href = URL.createObjectURL(file);
        a1.download = file.name;
        a1.click();
        URL.revokeObjectURL(a1.href);
      } else {
        console.error('Failed to download the image. Status:', xhr.status);
      }
    };
    xhr.open('GET', downloadLink);
    xhr.send();
  };
  
  return (
    <div className='w-[300px] mt-5 xl:mt-0'>
      <button className='bg-[#2f85ff] hover:bg-[#5487ff] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full' onClick={downloadImageHandler}>Download</button>
      <div className='w-full bg-[#a4a4a4] p-3 rounded-md mt-3 text-white'>
        <div className='flex flex-col border-b-[1px] pb-1 text-center justify-center gap-4 '>
          <span>Details:</span>
          <div dangerouslySetInnerHTML={{ __html: productDetails?.user?.description }} />
        </div>
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Designs Created:</span>
          <span>{productDetails ? productDetails?.totalProducts : "Error while fetching data"}</span>
        </div>
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Followers:</span>
          <span>{productDetails ? productDetails?.user?.followers?.length : "Error while fetching data"}</span>
        </div>
        <div className='flex justify-center gap-4 '>
          <span>Following:</span>
          <span>{productDetails ? productDetails?.user?.following?.length : "Error while fetching data"}</span>
        </div>
        <Link className='h-[40px] w-full rounded-sm bg-[#c1c0c0] hover:bg-[#b2b2b2] flex justify-center items-center mt-2' to={`/user/${productDetails?.user?.u_id}`}>Visit UserProfile</Link>
        {token ? <Followbtn productDetails={productDetails} style={`bg-[#8d8d8d] mt-3 hover:bg-[#444444] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full`} /> : null}
      </div>
    </div>
  );
}

export default DownloadScreen;
