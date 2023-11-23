import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFollowMutation, useGetMyProfileQuery } from '../../redux/apiCalls/apiSlice';
import { getToken } from '../../Token/token';
import { toast } from 'react-toastify';
import Followbtn from '../Common/FollowBtn';
import JSZip from 'jszip';

function DownloadScreen({ productDetails }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [fileTypes, setFileTypes] = useState([])
  const [fileTypeToDownload, setFileTypeToDownload] = useState(null)
  const [fileExtension, setFileExtension] = useState(setFileTypes[0])
  const [currentXhr, setCurrentXhr] = useState()
  const token = getToken()

  const allowedExtensionsDownloadHandler = () => {
    const extensionsAllowed = productDetails?.product?.modal?.map(item => {
      return item.downloadLink.split(/[#?]/)[0].split('.').pop().trim();
    })
    const uniqFiles = [...new Set(extensionsAllowed)]
    setFileTypes(uniqFiles);
  }

  const downloadImageHandler = async () => {
    if(!token) return toast.error("Please login to continue")
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

  const fileToDownloadHandler = (e) => {
    if (e.target.value != null) {
      const links = productDetails?.product?.modal?.filter(item => {
        const extension = item.downloadLink.split(/[#?]/)[0].split('.').pop().trim();
        return e.target.value === extension;
      })
      if (!links) {
        return toast.error("No downloads for this extension found.")
      }
      setFileExtension(e.target.value)
      setFileTypeToDownload(links)
    }
    else {
      setFileTypeToDownload(null)
    }
  }

  const extractDate = (inputString) => {
    const dateObject = new Date(inputString);

    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    allowedExtensionsDownloadHandler()
  }, [productDetails])

  return (
    <div className='w-[300px] mt-5 xl:mt-0'>
      <div className='flex flex-col pb-3'>
        <span>Created At: {extractDate(productDetails?.product?.createdAt)}</span>
        <span>Last Updated: {extractDate(productDetails?.product?.updatedAt)}</span>
      </div>
      <div className='flex'>
        <button disabled={isDownloading} className='bg-[#2f85ff] rounded-r-0 hover:bg-[#5487ff] text-white text-[21px] h-[46px] w-[100%] rounded-l-md  w-full' onClick={downloadImageHandler}>{isDownloading ? "Downloading" : "Download"}</button>
        <select onChange={fileToDownloadHandler} value={fileExtension}
          className='bg-[#2f85ff] border-l px-2 max-w-[90px] w-full text-white rounded-r-[1px] hover:bg-[#5487ff]'>
          <option value={fileTypes[0]}>{fileTypes[0]}</option>
          {
            fileTypes.map((item, index) => (
              index !== 0 ? (
                <option key={`Download options ${Math.random() * Date.now()}`} value={item}>
                  {item}
                </option>
              ) : null
            ))
          }
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
        <Link className='h-[40px] w-full rounded-sm bg-[#c1c0c0] hover:bg-[#b2b2b2] flex justify-center items-center mt-2' to={`/user/${productDetails?.user?.u_id}`}>Visit UserProfile</Link>
        {token ? <Followbtn productDetails={productDetails} style={`bg-[#8d8d8d] mt-3 hover:bg-[#444444] text-white text-[21px] h-[46px] w-[100%] rounded-md  w-full`} /> : null}
      </div>
    </div>
  );
}

export default DownloadScreen;
