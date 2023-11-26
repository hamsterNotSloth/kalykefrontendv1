import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFollowMutation, useGetMyProductsQuery, useGetMyProfileQuery, useProductPurchaseMutation } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import Followbtn from '../Common/FollowBtn';
import JSZip from 'jszip';
import { socialMedia } from './socialMedia';
import SocialMediaRow from '../Common/SocialMediaRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

const backendBaseUrl = process.env.REACT_APP_FRONTEND_URL;

function DownloadScreen({ productDetails }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [fileTypes, setFileTypes] = useState([])
  const [fileTypeToDownload, setFileTypeToDownload] = useState(null)
  const [fileExtension, setFileExtension] = useState(fileTypes[0])
  const [currentXhr, setCurrentXhr] = useState()
  const token = getToken()
  const { id } = useParams()
  const textAreaRef = useRef(id);
  const [productPurchase] = useProductPurchaseMutation()
  const { data: myProfile } = useGetMyProfileQuery(token)
  const copyToClipboard = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `${backendBaseUrl}/products/${id}`;
      textAreaRef.current.select();
      document.execCommand('copy');
      toast.success('Copied to clipboard');
      textAreaRef.current.value = '';
    }
  };

  const allowedExtensionsDownloadHandler = () => {
    const extensionsAllowed = productDetails?.product?.modal?.map(item => {
      return item.downloadLink.split(/[#?]/)[0].split('.').pop().trim();
    })
    const uniqFiles = [...new Set(extensionsAllowed)]
    setFileTypes(uniqFiles);
  }

  const downloadImageHandler = async () => {
    if (!token || !myProfile?.myProfile?._id || myProfile?.status == false) return toast.error("Please login to continue")
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

  const cancelDownload = () => {
    if (currentXhr) {
      currentXhr.abort();
      toast.info('Download canceled');
    } else {
      toast.warn('No active downloads to cancel');
    }
    setCurrentXhr(null)
    setIsDownloading(false);
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
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    fileToDownloadHandler(fileExtension)
  }, [fileExtension])

  useEffect(() => {
    allowedExtensionsDownloadHandler()
    setFileExtension(fileTypes[0])
  }, [productDetails])

  return (
    <div className='w-[300px] mt-5 xl:mt-0'>
      <div className='flex flex-col pb-3'>
        <span>Created At: {extractDate(productDetails?.product?.createdAt)}</span>
        <span>Last Updated: {extractDate(productDetails?.product?.updatedAt)}</span>
        <span>Total Downloads: {productDetails?.product?.purchaseHistory?.length}</span>
      </div>
      <div className='flex'>
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
      </div>
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
        <div className='flex border-b-[1px] pb-1 justify-center gap-4 '>
          <span>Following:</span>
          <span>{productDetails ? productDetails?.user?.following?.length : "Error while fetching data"}</span>
        </div>
        <div className='flex justify-center gap-4 '>
          <span>Views:</span>
          <span>{productDetails ? productDetails?.product?.userViews?.length : 0}</span>
        </div>
        <Link className='h-[40px] w-full rounded-sm bg-[#c1c0c0] hover:bg-[#b2b2b2] flex justify-center items-center mt-2' to={`/user/${productDetails?.user?.u_id}`}>Visit {productDetails?.user?.userName}'s Profile</Link>
        {token ? <Followbtn productDetails={productDetails} style={`bg-[#8d8d8d] mt-3 hover:bg-[#444444] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full`} /> : null}
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
