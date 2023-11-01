import React from 'react';
import { Link } from 'react-router-dom';
const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL;

function DownloadScreen({ productDetails }) {
  const downloadLink = productDetails?.product.images[0].downloadLink;
  const downloadTitle = productDetails?.product.title;
  const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/divine-actor-401115.appspot.com/o/images%2F6540fea38e544a4f4151e6f5%2Flogo.png?alt=media&token=8b1c069f-3cef-4373-b912-ccda990ef276'
  const downloadImageHandler = async() => {
    try {
      const response = await fetch(`${backendBaseUrl}/api/product/download-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: imageUrl }),
      });

      if (response.ok) {
        console.log('Image download triggered.');
      } else {
        console.error('Failed to download image.');
      }
    } catch (error) {
      console.error('Failed to initiate image download:', error);
    }
  };
  return (
    <div>
      <button onClick={downloadImageHandler}>Download Image</button>
    </div>
  );
}

export default DownloadScreen;
