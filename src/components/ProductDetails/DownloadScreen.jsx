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
  const [currentXhr, setCurrentXhr] = useState()
  const token = getToken()
  const downloadLink = productDetails?.product.modal[0].downloadLink;
  const downloadTitle = productDetails?.product.title;

  const allowedExtensionsDownloadHandler = () => {
    const extensionsAllowed = productDetails?.product?.modal?.map(item => {
      return item.downloadLink.split(/[#?]/)[0].split('.').pop().trim();
    })
    const uniqFiles = [...new Set(extensionsAllowed)]
    setFileTypes(uniqFiles);
  }

  const get_url_extension = (url) => {
    return downloadLink.split(/[#?]/)[0].split('.').pop().trim();
  }


  // const downloadImageHandler = () => {
  //   if(!fileTypeToDownload){
  //     return toast.error("First, Select a file type to download.")
  //   }
  //   setIsDownloading(true)
  //   for (let i = 0; i < fileTypeToDownload.length; i++) {
  //     const downloadLink = fileTypeToDownload[i].downloadLink;
  //     const fileExtension = downloadLink.split(/[#?]/)[0].split('.').pop().trim();
  //     console.log(fileExtension, 'downloadLink')
  //     let xhr = new XMLHttpRequest();
  //     setCurrentXhr(xhr)
  //     xhr.responseType = 'blob';
  //     xhr.onload = (event) => {
  //       if (xhr.status === 200) {
  //         let blob = xhr.response;
  //         let file = new File([blob], `Thangs modal${i + 1}.${fileExtension}`, { type: blob.type });
  //         let a1 = document.createElement('a');
  //         a1.href = URL.createObjectURL(file);
  //         a1.download = file.name;
  //         a1.click();
  //         URL.revokeObjectURL(a1.href);
  //         toast.success(`Thangs modal${i + 1} started`);
  //       } else {
  //         toast.error(`Failed to download file ${i + 1}. Status: ${xhr.status}`);
  //       }
  //     };
  //     xhr.open('GET', downloadLink);
  //     xhr.send();
  //   }
  //   setIsDownloading(false)
  // }

  const downloadImageHandler = async () => {
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
    console.log(productDetails?.product?.modal)
    if (e.target.value != null) {
      const links = productDetails?.product?.modal?.filter(item => {
        const extension = item.downloadLink.split(/[#?]/)[0].split('.').pop().trim();
        return e.target.value === extension;
      })
      if (!links) {
        return toast.error("No downloads for this extension found.")
      }
      setFileTypeToDownload(links)
    }
    else {
      setFileTypeToDownload(null)
    }
  }
  useEffect(() => {
    allowedExtensionsDownloadHandler()
  }, [productDetails])
  
  return (
    <div className='w-[300px] mt-5 xl:mt-0'>
      <div className='flex'>
          <button disabled={isDownloading} className='bg-[#2f85ff] rounded-r-0 hover:bg-[#5487ff] text-white text-[21px] h-[46px] w-[100%] rounded-l-md  w-full' onClick={downloadImageHandler}>{isDownloading? "Downloading" : "Download"}</button>
        <select onChange={fileToDownloadHandler}
          className='bg-[#2f85ff] border-l px-2 max-w-[90px] w-full text-white rounded-r-[1px] hover:bg-[#5487ff]'>
          <option value={null}>Select download type</option>
          {
            fileTypes.map(item => {
              return <option key={`Download options ${Math.random() * Date.now()}`} value={item}>{item}</option>
            })
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
