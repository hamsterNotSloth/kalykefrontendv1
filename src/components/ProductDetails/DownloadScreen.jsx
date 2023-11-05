import React from 'react';
import { Link } from 'react-router-dom';
const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function DownloadScreen({ productDetails }) {
 
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
    <button className='bg-[#2f85ff] hover:bg-[#5487ff] text-white text-[21px] h-[46px] rounded-md max-w-[300px] w-full' onClick={downloadImageHandler}>Download</button>
  );
}

export default DownloadScreen;
