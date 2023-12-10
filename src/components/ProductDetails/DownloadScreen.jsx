import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAddRatingMutation, useFollowMutation, useGetMyProductsQuery, useGetMyProfileQuery, useProductPurchaseMutation, useWishlistMutation } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import Followbtn from '../Common/FollowBtn';
import JSZip from 'jszip';
import { socialMedia } from './socialMedia';
import SocialMediaRow from '../Common/SocialMediaRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faStar } from '@fortawesome/free-solid-svg-icons'
import WishlistBtn from '../Common/WishlistBtn';
import DesignUpload from './SaleProduct';

const backendBaseUrl = process.env.REACT_APP_FRONTEND_URL;

function DownloadScreen({ productDetails }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [fileTypes, setFileTypes] = useState([])
  const [fileTypeToDownload, setFileTypeToDownload] = useState(null)
  const [fileExtension, setFileExtension] = useState(fileTypes[0])
  const [rating, setRating] = useState(0)
  const [currentXhr, setCurrentXhr] = useState()
  const [AddRating, { isLoading: addingRating }] = useAddRatingMutation()
  const token = getToken()
  const { id } = useParams()
  const textAreaRef = useRef(id);
  const { data: myProfile } = useGetMyProfileQuery(token)
  const [productPurchase] = useProductPurchaseMutation()

  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `${backendBaseUrl}/products/${id}`;
      textAreaRef.current.select();
      document.execCommand('copy');
      toast.success('Copied to clipboard');
      textAreaRef.current.value = '';
    }
  };

  const addRatingHandler = async () => {
    try {
      await AddRating({ _id: productDetails?.product?._id, token, rating })
    } catch (err) {
      console.log(err)
    }
  }

  const allowedExtensionsDownloadHandler = () => {
    const extensionsAllowed = productDetails?.product?.modal?.map(item => {
      return item.downloadLink.split(/[#?]/)[0].split('.').pop().trim();
    })
    const uniqFiles = [...new Set(extensionsAllowed)]
    setFileTypes(uniqFiles);
  }

  const downloadImageHandler = async () => {
    if (!myProfile?.myProfile?._id || myProfile?.status == false) return toast.error("Please login to continue")
    if (!fileTypeToDownload) {
      toast.error("First, Select a file type to download.");
      return;
    }

    setIsDownloading(true);

    const zip = new JSZip();

    try {
      await Promise.all(fileTypeToDownload.map(async (fileData, i) => {
        const downloadLink = fileData.downloadLink;
        const fileExtension = downloadLink.split(/[#?]/)[0].split('.').pop().trim();

        const response = await fetch(downloadLink);
        const blob = await response.blob();
        const fileName = `Thangs modal${i + 1}.${fileExtension}`;
        zip.file(fileName, blob);
      }));

      const content = await zip.generateAsync({ type: 'blob' });
      const zipFileName = 'ThangsModalFiles.zip';
      const zipFile = new File([content], zipFileName, { type: 'application/zip' });

      const a = document.createElement('a');
      a.href = URL.createObjectURL(zipFile);
      a.download = zipFileName;
      a.click();

      URL.revokeObjectURL(a.href);
      toast.success('Zip file download started');
      await productPurchase({ productId: productDetails?.product?._id, token })
    } catch (error) {
      toast.error('Error during download');
    } finally {
      setIsDownloading(false);
    }
  };

  const fileToDownloadHandler = (fileExtension) => {
    if (fileExtension == 'Select a file to download') return toast.error("Please choose a file to download.")
    if (fileExtension != null) {

      const links = productDetails?.product?.modal?.filter(item => {
        const extension = item.downloadLink.split(/[#?]/)[0].split('.').pop().trim();
        return fileExtension === extension;
      })
      if (!links) {
        return toast.error("No downloads for this extension found.")
      }
      setFileExtension(fileExtension)
      setFileTypeToDownload(links)
    }
    else {
      setFileTypeToDownload(null)
    }
  }

  const extractDate = (inputString) => {
    const dateObject = new Date(inputString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }
  const isEmailIncluded = productDetails?.product?.purchaseHistory?.some(
    (purchase) => purchase.email === myProfile?.myProfile?.email
  );
  useEffect(() => {
    fileToDownloadHandler(fileExtension)
  }, [fileExtension])

  useEffect(() => {
    allowedExtensionsDownloadHandler()
    setFileExtension(fileTypes[0])
  }, [productDetails])



  return (
    <div className='w-[300px] mt-5 xl:mt-0'>
      <div>
        <span className='text-[#4d8802] text-[16px]'><FontAwesomeIcon icon={faStar} />{productDetails?.product?.avgRating || 0}</span>
        <div className="w-full">
          {productDetails?.product?.purchaseHistory?.some(item => item.email === myProfile?.myProfile?.email) && !productDetails?.product?.ratings?.some(item => item.email === myProfile?.myProfile?.email) &&
            <div>
              <span className='block'>Rate Product</span>
              <div className='flex my-2 justify-between'>
                <div className='flex gap-1 bg-white rounded-sm px-3'>
                {[1, 2, 3, 4, 5].map((star, index) => (
                  <button
                    key={`star-${Math.random * Date.now()}-rating`}
                    className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => { setRating(star) }}
                  >
                    ★
                  </button>
                ))}
                </div>
                <button disabled={addingRating} className='bg-[#2f85ff] w-[130px] hover:bg-[#809ee2] text-white text-[16px] px-3 h-[36px] rounded-md' onClick={() => addRatingHandler()}>Add Rating</button>
              </div>
            </div>}
        </div>
      </div>
      <div className='flex flex-col pb-3'>
        <span>Created At: {extractDate(productDetails?.product?.createdAt)}</span>
      </div>
      <WishlistBtn product={productDetails?.product} token={token} />
      {productDetails?.product?.free == true || isEmailIncluded ? <div className='flex'>
        <button disabled={isDownloading} className='bg-[#2f85ff] rounded-r-0 hover:bg-[#5487ff] text-white text-[21px] h-[46px] w-[100%] rounded-l-md  w-full' onClick={downloadImageHandler}>{isDownloading ? "Downloading" : "Download"}</button>
        <select onChange={(e) => { setFileExtension(e.target.value) }} value={fileExtension}
          className='bg-[#2f85ff] border-l px-2 max-w-[90px] w-full text-white rounded-r-[1px] hover:bg-[#5487ff]'>
          <option>Select a file to download</option>
          {
            fileTypes.map((item, index) => {
              return (
                <option key={`Download options ${Math.random() * Date.now()}`} value={item}>
                  {item}
                </option>
              )
            }
            )}
        </select>
      </div> : <DesignUpload product={productDetails?.product} />}

      <div className='w-full bg-[#2f85ff] p-3 rounded-md mt-3 text-white'>
        <div className='flex flex-col border-b-[1px] pb-1 text-center justify-center gap-4 '>
          <span>Details:</span>
          <div dangerouslySetInnerHTML={{ __html: productDetails?.user?.description }} />
        </div>
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Designs Created:</span>
          <span>{productDetails?.totalProducts || 0}</span>
        </div>
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Followers:</span>
          <span>{productDetails?.user?.followers?.length || 0}</span>
        </div>
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Views:</span>
          <span>{productDetails?.product?.userViews?.length || 0}</span>
        </div>
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Total Downloads:</span>
          <span>{productDetails?.product?.purchaseHistory?.length || 0}</span>
        </div>
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Wishlisted:</span>
          <span>{productDetails?.product?.wishlist?.length || 0}</span>
        </div>
        <Link className='h-[40px] w-full rounded-sm bg-[#fff] hover:bg-[#ebebeb] text-[#000] flex justify-center items-center mt-2' to={`/user/${productDetails?.user?.u_id}`}>Visit {productDetails?.user?.userName}</Link>
        {token ? <Followbtn productDetails={productDetails} style={`bg-[#fff] mt-3 hover:bg-[#ebebeb] text-[#000] text-[21px] h-[46px] w-[100%] rounded-md  w-full`} /> : null}
        <textarea
          ref={textAreaRef}
          readOnly
          style={{ position: 'absolute', left: '-9999px' }}
        />
        {/* <FontAwesomeIcon icon={faTwitter} /> */}
        <div className='flex gap-2 items-end justify-center'>
          <span className='text-[12px]'>Share on</span>
          <ul className='flex gap-3 mt-3 justify-center items-center'>
            {socialMedia.map(item => {
              return (
                <SocialMediaRow copyToClipboard={copyToClipboard} item={item} key={`social-media-product ${item.link} ${Math.random() * Date.now()}`} />
              )
            })}
            <li ><button onClick={copyToClipboard}>
              <FontAwesomeIcon icon={faClipboard} />
            </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DownloadScreen;
